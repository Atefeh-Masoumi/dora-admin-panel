import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router";
import {
  DnsCdnListResponse,
  useDeleteApiMyDnsCdnHostDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { cdnDnsTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const DnsCdnTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedDnsCdn, setSelectedDnsCdn] =
    useState<DnsCdnListResponse | null>(null);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/cdn/" + row["id"] + "/overview");

  const [deleteDnsCdn, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyDnsCdnHostDeleteByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedDnsCdn(null);
  };

  const handleOpenDelete = (dnsCdn: DnsCdnListResponse) => {
    setSelectedDnsCdn(dnsCdn);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteCdnHandler = () =>
    deleteDnsCdn({ id: Number(selectedDnsCdn?.id) })
      .unwrap()
      .then(() => {
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {cdnDnsTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];
          const isHsts = row["isHsts"];
          const isHttpsRedirect = row["isHttpsRedirect"];
          const isNonWwwRedirect = row["isNonWwwRedirect"];

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
                          ? "خطا در زیرساخت"
                          : id === 9
                          ? "در انتظار تغییر NS"
                          : id === 10
                          ? "خاموش"
                          : id === 11
                          ? "در صف انتظار"
                          : id === 12
                          ? "در صف حذف"
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
                  ) : column.id === "isHsts" ? (
                    <Chip
                      clickable={false}
                      label={isHsts ? "فعال" : "غیرفعال"}
                      sx={{
                        borderRadius: 1,
                        color: isHsts ? "success.main" : "error.main",
                        backgroundColor: isHsts
                          ? "success.light"
                          : "error.light",
                      }}
                    />
                  ) : column.id === "isHttpsRedirect" ? (
                    <Chip
                      clickable={false}
                      label={isHttpsRedirect ? "فعال" : "غیرفعال"}
                      sx={{
                        borderRadius: 1,
                        color: isHttpsRedirect ? "success.main" : "error.main",
                        backgroundColor: isHttpsRedirect
                          ? "success.light"
                          : "error.light",
                      }}
                    />
                  ) : column.id === "isNonWwwRedirect" ? (
                    <Chip
                      clickable={false}
                      label={isNonWwwRedirect ? "فعال" : "غیرفعال"}
                      sx={{
                        borderRadius: 1,
                        color: isNonWwwRedirect ? "success.main" : "error.main",
                        backgroundColor: isNonWwwRedirect
                          ? "success.light"
                          : "error.light",
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
        keyTitle="DNS ابری"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedDnsCdn?.zoneName || ""}
        onSubmit={deleteCdnHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(DnsCdnTableRow);
