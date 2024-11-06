import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  GetVpcGatewayNatResponse,
  useDeleteApiMyVpcNatDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcNatTableStruct } from "./struct";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import CloseIcon from "@mui/icons-material/Close";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const VpcNatTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVpcNat, setSelectedVpcNat] =
    useState<GetVpcGatewayNatResponse | null>(null);

  const [deleteVpcNatRecord, { isLoading: deleteVpcNatRecordLoading }] =
    useDeleteApiMyVpcNatDeleteByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVpcNat(null);
  };

  const handleOpenDelete = (vpcNat: GetVpcGatewayNatResponse) => {
    setSelectedVpcNat(vpcNat);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteVpcNatRecordHandler = () =>
    deleteVpcNatRecord({ id: Number(selectedVpcNat?.id) })
      .unwrap()
      .then(() => {
        toast.success("Nat رکورد مورد نظر حذف شد", { icon: Success });
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcNatTableStruct.map((column) => {
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
              ) : column.id === "destinationPort" ||
                "sourcePort" ||
                "sourceIp" ? (
                text === 0 || !text ? (
                  "Any"
                ) : (
                  text
                )
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
        keyTitle="NAT"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVpcNat?.name || ""}
        onSubmit={deleteVpcNatRecordHandler}
        submitLoading={deleteVpcNatRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(VpcNatTableRow);
