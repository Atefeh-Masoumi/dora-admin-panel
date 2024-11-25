import { Button, Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLazyGetApiMyVmKmsGetByIdQuery } from "src/app/services/api";
import {
  GetRemoteConsoleResponse,
  GetVmResponse,
  useDeleteApiMyVmHostDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import PageLoading from "src/components/atoms/PageLoading";
import { MonitorSvg } from "src/components/atoms/svg-icons/MonitorSvg";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { VM_TYPE } from "src/constant/vmTypeEnum.constant";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { addVmTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const AddVmTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVm, setSelectedVm] = useState<GetVmResponse | null>(null);
  const navigate = useNavigate();

  const [getUrl, { isLoading: getUrlLoading }] =
    useLazyGetApiMyVmKmsGetByIdQuery();

  const [deleteItem, { isLoading: deleteVmRecordLoading }] =
    useDeleteApiMyVmHostDeleteByIdMutation();

  const isDeactivate = useMemo(() => row["statusId"] !== 2, [row]);

  const settingOnClick = () => {
    if (isDeactivate) return;
    navigate("/vm/" + row["id"]);
  };

  const sendUserToKmsConsole = (
    remoteConsoleObject: GetRemoteConsoleResponse
  ) => {
    let a = document.createElement("a");
    const url: string = remoteConsoleObject?.location || "";
    const vmTypeId = remoteConsoleObject?.vmTypeId || "";

    a.href =
      vmTypeId === VM_TYPE.VM_WARE ? "/console/wmks-sdk.html?url=" + url : url;
    a.target = "_blank";
    a.click();
  };

  const monitorOnClick = () => {
    if (isDeactivate) return;
    getUrl({
      id: row["id"],
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        sendUserToKmsConsole(res);
      })
      .catch((err) => {});
  };

  const handleOpenDelete = (vm: GetVmResponse) => {
    setSelectedVm(vm);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVm(null);
  };

  const deleteVmRecordHandler = () =>
    deleteItem({ id: Number(selectedVm?.id) })
      .unwrap()
      .then(() => {
        toast.success("سرور ابری با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      {getUrlLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {addVmTableStruct.map((column) => {
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
                <Stack
                  direction="row"
                  justifyContent="end"
                  spacing={0.6}
                  maxWidth="100%"
                >
                  {!isDeactivate && (
                    <IconButton
                      sx={{ borderRadius: 1 }}
                      onClick={settingOnClick}
                    >
                      <Setting
                        sx={{
                          "&> path": {
                            stroke: ({ palette }) => palette.grey[700],
                          },
                        }}
                      />
                    </IconButton>
                  )}
                  {!isDeactivate && (
                    <IconButton
                      sx={{ borderRadius: 1 }}
                      onClick={monitorOnClick}
                    >
                      <MonitorSvg />
                    </IconButton>
                  )}
                  <IconButton
                    sx={{ borderRadius: 1, ml: "auto" }}
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
                  ) : column.id === "ipv4" ? (
                    <Button
                      sx={{ py: 0, px: 0.5 }}
                      onClick={() => {
                        if (!text) return;
                        navigator.clipboard.writeText(text);
                        toast.success("IP کپی شد", { position: "bottom-left" });
                      }}
                    >
                      {text}
                    </Button>
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
        keyTitle="سرور ابری"
        subTitle="برای حذف سرور ابری, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVm?.name || ""}
        onSubmit={deleteVmRecordHandler}
        submitLoading={deleteVmRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(AddVmTableRow);
