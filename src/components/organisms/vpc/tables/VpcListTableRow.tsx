import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteApiMyVpcHostDeleteByIdMutation } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { vpcStruct } from "./struct";
import { vpcStatusIdentifier } from "src/constant/vpcStatus";
import { useNavigate } from "react-router";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VpcListListTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVpc, setSelectedVpc] = useState<any>(null);

  const [deleteVpcRecord, { isLoading: deleteVpcRecordLoading }] =
    useDeleteApiMyVpcHostDeleteByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVpc(null);
  };

  const handleOpenDelete = (dns: any) => {
    setSelectedVpc(dns);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteVpcRecordHandler = () =>
    deleteVpcRecord({ id: Number(selectedVpc?.id) })
      .unwrap()
      .then(() => {
        toast.success("Vpc رکورد مورد نظر حذف شد", { icon: Success });
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcStruct.map((column) => {
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
        securityPhrase={selectedVpc?.name || ""}
        onSubmit={deleteVpcRecordHandler}
        submitLoading={deleteVpcRecordLoading}
      />
    </Fragment>
  );
};
