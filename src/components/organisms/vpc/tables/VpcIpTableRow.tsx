import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  VpcIpListResponse,
  useDeleteApiMyVpcIpDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcIpTableStruct } from "./struct";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CloseIcon from "@mui/icons-material/Close";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VpcIpTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVpcIp, setSelectedVpcIp] = useState<VpcIpListResponse | null>(
    null
  );

  const [deleteVpcIpRecord, { isLoading: deleteVpcIpRecordLoading }] =
    useDeleteApiMyVpcIpDeleteByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVpcIp(null);
  };

  const handleOpenDelete = (vpcIp: VpcIpListResponse) => {
    setSelectedVpcIp(vpcIp);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteVpcIpRecordHandler = () =>
    deleteVpcIpRecord({ id: Number(selectedVpcIp?.id) })
      .unwrap()
      .then(() => {
        toast.success("Dns رکورد مورد نظر حذف شد", { icon: Success });
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcIpTableStruct.map((column) => {
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
                <Stack direction="row" justifyContent="center">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "isV4" ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  {row.isV4 ? (
                    <DownloadDoneIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <CloseIcon sx={{ fontSize: 18 }} />
                  )}
                </Stack>
              ) : column.id === "isPrimary" ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  {row.isPrimary ? (
                    <DownloadDoneIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <CloseIcon sx={{ fontSize: 18 }} />
                  )}
                </Stack>
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
        keyTitle="IP"
        subjectTitle="مقدار"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVpcIp?.ip || ""}
        onSubmit={deleteVpcIpRecordHandler}
        submitLoading={deleteVpcIpRecordLoading}
      />
    </Fragment>
  );
};
