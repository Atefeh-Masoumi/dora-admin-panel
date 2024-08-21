import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteApiMyVmHostDeleteByIdMutation } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { vpcVmStruct } from "./struct";
import { vpcStatusIdentifier } from "src/constant/vpcStatus";
import { useNavigate } from "react-router";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VpcVmTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVm, setSelectedVm] = useState<any>(null);

  const navigate = useNavigate();

  const [deleteVmRecord, { isLoading: deleteVmRecordLoading }] =
    useDeleteApiMyVmHostDeleteByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVm(null);
  };

  const handleOpenDelete = (dns: any) => {
    setSelectedVm(dns);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteVmRecordHandler = () =>
    deleteVmRecord({ id: Number(selectedVm?.id) })
      .unwrap()
      .then(() => {
        toast.success("رکورد مورد نظر حذف شد", { icon: Success });
        closeDialogHandler();
      })
      .catch((err) => {});

  const settingOnClick = () => {
    navigate("/vm/" + row["id"]);
  };

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcVmStruct.map((column) => {
          const id = row["statusId"];
          const value = row[column.id];
          const text =
            column.format && typeof value === "number"
              ? column.format(value)
              : value;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  spacing={0.6}
                  maxWidth="fit-content"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
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
              ) : column.id === "statusId" ? (
                <Chip
                  clickable={false}
                  label={vpcStatusIdentifier(id).label}
                  color={vpcStatusIdentifier(id).chipColor as any}
                  sx={{
                    bgcolor: vpcStatusIdentifier(id).bgcolor,
                    color: vpcStatusIdentifier(id).textColor,
                    py: 2.2,
                    borderRadius: 1,
                    fontSize: "14px",
                  }}
                />
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="VM"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVm?.name || ""}
        onSubmit={deleteVmRecordHandler}
        submitLoading={deleteVmRecordLoading}
      />
    </Fragment>
  );
};
