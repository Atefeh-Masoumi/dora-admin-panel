import { FC, Fragment, useState } from "react";
import { Button, Chip, IconButton, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import PageLoading from "src/components/atoms/PageLoading";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { MonitorSvg } from "src/components/atoms/svg/MonitorSvg";
import { Setting } from "src/components/atoms/svg/SettingSvg";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { addVmTableStruct } from "./struct";
import { DeleteVmDialog } from "../dialogs/DeleteVmDialog";
import { usePostApiMyVmKmsGetMutation } from "src/app/services/api.generated";

export const AddVmTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const navigate = useNavigate();
  const settingOnClick = () => navigate("/vm/" + row["id"]);

  const [getUrl, { isLoading: getUrlLoading }] = usePostApiMyVmKmsGetMutation();
  const monitorOnClick = (isVmPlayer?: boolean) => {
    getUrl({
      getKmsModel: {
        id: row["id"],
        typeId: isVmPlayer ? 1 : 2,
      },
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        if (isVmPlayer) {
          window.open(res, "_blank");
        } else {
          let a = document.createElement("a");
          a.href = "/console/wmks-sdk.html?url=" + res;
          a.target = "_blank";
          a.click();
        }
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
                    onClick={() => monitorOnClick(false)}
                  >
                    <MonitorSvg />
                  </IconButton>
                  <IconButton
                    sx={{ borderRadius: 1 }}
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
                          ? "در انتظار انجام عملیات"
                          : id === 7
                          ? "بازسازی"
                          : "ناموفق"
                      }
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          id === 6 || id === 7
                            ? "warning.light"
                            : id === 2
                            ? "success.light"
                            : "error.light",
                        color:
                          id === 6 || id === 7
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
                      sx={{ cursor: "pointer", py: 0, px: 0.5 }}
                      onClick={() => {
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
