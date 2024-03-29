import { FC, Fragment, useState } from "react";
import { storageTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Chip, IconButton, Stack } from "@mui/material";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { DeleteStorageDialog } from "../dialogs/DeleteStorageDialog";
import { useNavigate } from "react-router";

export const StorageTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/storage/" + row["id"]);

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {storageTableStruct.map((column) => {
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
      <DeleteStorageDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
