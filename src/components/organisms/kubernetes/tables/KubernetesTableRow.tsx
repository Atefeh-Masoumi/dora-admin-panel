import { FC, useState } from "react";
import { kubernetesTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Chip, IconButton, Stack } from "@mui/material";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteKubernetesDialog } from "../dialogs/DeleteKubernetesDialog";
import { useNavigate } from "react-router";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { kubernetesStatusIdentifier } from "src/constant/kubernetesStatus";

export const KubernetesTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/kubernetes/" + row["id"]);

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesTableStruct.map((column) => {
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
                      label={kubernetesStatusIdentifier(id).label}
                      color={kubernetesStatusIdentifier(id).chipColor as any}
                      sx={{
                        bgcolor: kubernetesStatusIdentifier(id).bgcolor,
                        color: kubernetesStatusIdentifier(id).textColor,
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : (
                    text || "__"
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteKubernetesDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};
