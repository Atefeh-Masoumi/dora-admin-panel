import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { VmnetworkTableTableStruct } from "./struct";
import PageLoading from "src/components/atoms/PageLoading";
import {
    VmNetworkNodeListResponse,
    useGetApiMyVmByProjectIdNetworkNodeListQuery,
    usePutApiMyVmByProjectIdNetworkNodeDetachAndIdMutation
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const networkNodeStatusIdentifier = (networkNodeStatusId: number) => {
  switch (networkNodeStatusId) {
    case 1:
      return {
        iconColor: "success",
        bgcolor: "success.light",
        typographyColor: "success.main",
        label: "متصل",
      };
    case 2:
      return {
        iconColor: "error",
        bgcolor: "error.light",
        typographyColor: "error.main",
        label: " خطا در اتصال",
      };
    case 3:
      return {
        iconColor: "warning",
        bgcolor: "warning.light",
        typographyColor: "warning.main",
        label: "در حال انتظار",
      };
    case 4:
      return {
        iconColor: "error",
        bgcolor: "error.light",
        typographyColor: "error.main",
        label: "حذف شده",
      };
    case 5:
      return {
        iconColor: "warning",
        bgcolor: "warning.light",
        typographyColor: "warning.main",
        label: "در حال قطع ارتباط",
      };
    default:
      return {
        iconColor: "disabled",
        bgcolor: undefined,
        typographyColor: undefined,
        label: "",
      };
  }
};

export const NetworkTableRow: FC<{ row: any }> = ({ row }) => {
  const {projectId,id } = useParams();

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedNetwork, setSelectedNetwork] =
    useState<VmNetworkNodeListResponse | null>(null);

  const [detachNode, { isLoading: detachNodeLoading }] =
  usePutApiMyVmByProjectIdNetworkNodeDetachAndIdMutation();

const { refetch} = useGetApiMyVmByProjectIdNetworkNodeListQuery(
      { projectId: Number(projectId),
        vmHostId: Number(id) },
      { skip: !id }
    );

  const deleteVolumeRecordHandler = () =>
    detachNode({ id: Number(selectedNetwork?.id) ,
       projectId: Number(projectId),})
      .unwrap()
      .then(() => {
        toast.success("نود با موفقیت جدا شد");
        refetch();
        closeDialogHandler();
      })
      .catch(() => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedNetwork(null);
  };

  const handleOpenDelete = (snapshot: VmNetworkNodeListResponse) => {
    setSelectedNetwork(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      {detachNodeLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {VmnetworkTableTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const statusId = row.statusId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={networkNodeStatusIdentifier(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = networkNodeStatusIdentifier(statusId).bgcolor?.split('.') || [];
                      return (palette as any)[color]?.[shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = networkNodeStatusIdentifier(statusId).typographyColor?.split('.') || [];
                      return (palette as any)[color]?.[shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : column.id === "isV4" ? (
                <Chip size="small" label={row.isV4 ? "IPv4" : "IPv6"} />
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
        keyTitle="نود شبکه"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedNetwork?.vmNetwork || ""}
        onSubmit={deleteVolumeRecordHandler}
        submitLoading={detachNodeLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(NetworkTableRow);
