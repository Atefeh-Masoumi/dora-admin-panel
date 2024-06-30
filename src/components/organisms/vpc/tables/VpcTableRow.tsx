import { Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  VpcListResponse,
  useDeleteApiMyVpcHostDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcTableStruct } from "./struct";
import { vpcStatusIdentifier } from "src/constant/vpcStatus";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VpcTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVpc, setSelectedVpc] = useState<VpcListResponse | null>(null);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/vpc/" + row["id"]);
  const [deleteVpc, { isLoading: deleteVpcLoading }] =
    useDeleteApiMyVpcHostDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteVpc({ id: Number(selectedVpc?.id) })
      .unwrap()
      .then(() => {
        toast.success("ابر اختصاصی شما با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVpc(null);
  };

  const handleOpenDelete = (vpc: VpcListResponse) => {
    setSelectedVpc(vpc);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {vpcTableStruct.map((column) => {
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
                    text || "__"
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
        keyTitle="ابر اختصاصی"
        subTitle="برای حذف ابر اختصاصی, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVpc?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteVpcLoading}
      />
    </>
  );
};
