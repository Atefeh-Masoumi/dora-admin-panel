import { FC, Fragment, useMemo, useState } from "react";
import { Button, Chip, IconButton, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import PageLoading from "src/components/atoms/PageLoading";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { MonitorSvg } from "src/components/atoms/svg-icons/MonitorSvg";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { addVmTableStruct } from "./struct";
import { DeleteVmDialog } from "../dialogs/DeleteVmDialog";
import { useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery } from "src/app/services/api";

export const AddVmTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const [getUrl, { isLoading: getUrlLoading }] =
    useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery();

  const isDeactivate = useMemo(() => row["statusId"] !== 2, [row]);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const settingOnClick = () => {
    if (isDeactivate) return;
    navigate("/vm/" + row["id"]);
  };

  const monitorOnClick = () => {
    if (isDeactivate) return;
    getUrl({
      id: row["id"],
      typeId: 2,
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        let a = document.createElement("a");
        a.href = "/console/wmks-sdk.html?url=" + res;
        a.target = "_blank";
        a.click();
      });
  };

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
                    onClick={handleOpenDelete}
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
                          ? "درانتظار انجام عملیات"
                          : id === 7
                          ? "بازسازی"
                          : id === 8
                          ? "خطا در زیرساخت"
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
      <DeleteVmDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
