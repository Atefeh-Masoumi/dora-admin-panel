import { FC, Fragment, useState } from "react";
import { Chip, IconButton, Stack } from "@mui/material";
import { webTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { MonitorSvg } from "src/components/atoms/svg/MonitorSvg";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import PageLoading from "src/components/atoms/PageLoading";
import { DeleteWebDialog } from "../dialogs/DeleteWebDialog";
import { useLazyGetApiV2WebWebHostGetLoginSessionByIdQuery } from "src/app/services/api";

export const WebTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [getUrl, { isLoading: getUrlLoading }] = useLazyGetApiV2WebWebHostGetLoginSessionByIdQuery();
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
                  {/* <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={goToOrderDetails}
                  >
                    <CreditCardIcon sx={{ color: "grey.700" }} />
                  </IconButton> */}
                  {/* <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton> */}
                  <IconButton sx={{ borderRadius: 1 }} onClick={monitorOnClick}>
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
      <DeleteWebDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
