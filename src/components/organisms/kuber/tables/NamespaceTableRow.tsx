import { FC, Fragment, useState } from "react";
import { namespaceTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Chip, IconButton, Stack } from "@mui/material";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { Setting } from "src/components/atoms/svg/SettingSvg";
import { DeleteNamespaceDialog } from "../dialogs/DeleteNamespaceDialog";
import { useNavigate } from "react-router";
import { useLazyGetPortalKubeNamespaceGetLoginSessionByIdQuery } from "src/app/services/api";
import { MonitorSvg } from "src/components/atoms/svg/MonitorSvg";
import PageLoading from "src/components/atoms/PageLoading";

export const NamespaceTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/kube/" + row["id"]);

  const [getUrl, { isLoading: getUrlLoading }] =
    useLazyGetPortalKubeNamespaceGetLoginSessionByIdQuery();

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

  return (
    <Fragment>
      {getUrlLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {namespaceTableStruct.map((column) => {
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
                  {/* <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={goToOrderDetails}
                  >
                    <CreditCardIcon sx={{ color: "grey.700" }} />
                  </IconButton> */}
                  <IconButton
                    disabled={row.statusId !== 2}
                    sx={{
                      borderRadius: 1,
                    }}
                    onClick={monitorOnClick}
                  >
                    <MonitorSvg />
                    {row.statusId !== 2 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -40%)",
                          fontSize: "30px",
                          color: "red",
                        }}
                      >
                        &#10005;
                      </div>
                    )}
                  </IconButton>

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
                          ? "انتظار"
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
                  ) : (
                    text
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteNamespaceDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
