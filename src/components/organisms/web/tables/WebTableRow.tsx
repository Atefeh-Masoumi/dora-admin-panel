import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLazyGetApiMyWebHostGetLoginSessionByIdQuery } from "src/app/services/api";
import {
  WebHostListResponse,
  useDeleteApiMyWebHostDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import PageLoading from "src/components/atoms/PageLoading";
import { MonitorSvg } from "src/components/atoms/svg-icons/MonitorSvg";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { webTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const WebTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedWebHost, setSelectedWebHost] =
    useState<WebHostListResponse | null>(null);

  const [deleteItem, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyWebHostDeleteByIdMutation();

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/web/" + row["id"]);

  const [getUrl, { isLoading: getUrlLoading }] =
    useLazyGetApiMyWebHostGetLoginSessionByIdQuery();
  const monitorOnClick = () =>
    getUrl({ id: row["id"] })
      .unwrap()
      .then((res) => {
        if (res.location) {
          let a = document.createElement("a");
          a.href = res.location.toString();
          a.target = "_blank";
          a.click();
        }
      });

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedWebHost(null);
  };

  const handleOpenDelete = (webHost: WebHostListResponse) => {
    setSelectedWebHost(webHost);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteDnsRecordHandler = () =>
    deleteItem({ id: Number(selectedWebHost?.id) })
      .unwrap()
      .then(() => {
        toast.success("سرویس هاست ابری با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      {getUrlLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {webTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>

                  <IconButton sx={{ borderRadius: 1 }} onClick={monitorOnClick}>
                    <MonitorSvg />
                  </IconButton>

                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  {column.id === "statusId" ? (
                    <Chip
                      clickable={false}
                      label={
                        id === 1
                          ? "پرداخت نشده"
                          : id === 2
                          ? "فعال"
                          : id === 3
                          ? "غیرفعال"
                          : id === 4
                          ? "منقضی شده"
                          : id === 5
                          ? "حذف شده"
                          : id === 6
                          ? "در حال انجام عملیات"
                          : id === 7
                          ? "بازسازی"
                          : id === 8
                          ? "خطا"
                          : id === 9
                          ? "بازسازی"
                          : id === 10
                          ? "خاموش"
                          : id === 11
                          ? "در صف انتظار"
                          : "ناموفق"
                      }
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          id === 6 ||
                          id === 7 ||
                          id === 8 ||
                          id === 9 ||
                          id === 10 ||
                          id === 11
                            ? "warning.light"
                            : id === 2
                            ? "success.light"
                            : "error.light",
                        color:
                          id === 6 ||
                          id === 7 ||
                          id === 8 ||
                          id === 9 ||
                          id === 10 ||
                          id === 11
                            ? "warning.main"
                            : id === 2
                            ? "success.main"
                            : "error.main",
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : (
                    text
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="هاست وب ابری"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedWebHost?.domainName || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(WebTableRow);
