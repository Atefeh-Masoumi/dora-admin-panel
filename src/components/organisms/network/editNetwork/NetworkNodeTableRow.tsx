import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VmNetworkNodeListResponse,
  usePutApiMyVmByProjectIdNetworkNodeDetachAndIdMutation,
  useGetApiMyVmByProjectIdNetworkNodeListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { networkNodeTableStruct } from "./struct";
import { e2p } from "src/utils/e2p.utils";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";

enum DIALOG_TYPE_ENUM {
  DETACH = "DETACH",
}

const networkNodeStatusIdentifier = (networkNodeStatusId: number) => {
  switch (networkNodeStatusId) {
    case 1:
      return {
        id: 1,
        label: "متصل",
        bgcolor: "success.light",
        color: "success.main",
      };
    case 2:
      return {
        id: 2,
        label: "خطا در اتصال",
        bgcolor: "error.light",
        color: "error.main",
      };
    case 3:
      return {
        id: 3,
        label: "در حال انتظار",
        bgcolor: "warning.light",
        color: "warning.main",
      };
    case 4:
      return {
        id: 4,
        label: "حذف شده",
        bgcolor: "error.light",
        color: "error.main",
      };
    case 5:
      return {
        id: 5,
        label: "در حال قطع ارتباط",
        bgcolor: "warning.light",
        color: "warning.main",
      };
    default:
      return {
        id: 0,
        label: "نامشخص",
        bgcolor: "error.light",
        color: "error.main",
      };
  }
};

const NetworkNodeTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedNode, setSelectedNode] = useState<VmNetworkNodeListResponse | null>(null);
  const { projectId } = useParams();

  const [detachNode, { isLoading: detachLoading }] =
    usePutApiMyVmByProjectIdNetworkNodeDetachAndIdMutation();

  const { refetch } = useGetApiMyVmByProjectIdNetworkNodeListQuery({
    projectId: Number(projectId),
  });

  const handleOpenDetach = (node: VmNetworkNodeListResponse) => {
    setSelectedNode(node);
    setDialogType(DIALOG_TYPE_ENUM.DETACH);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedNode(null);
  };

  const detachNodeHandler = () => {
    if (!selectedNode?.id) return;
    detachNode({
      projectId: Number(projectId),
      id: selectedNode.id,
    })
      .unwrap()
      .then(() => {
        toast.success("نود با موفقیت جدا شد");
        closeDialogHandler();
        refetch();
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {networkNodeTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const statusId = row.statusId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => handleOpenDetach(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "status" ? (
                <Chip
                  label={networkNodeStatusIdentifier(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = networkNodeStatusIdentifier(statusId).bgcolor.split('.');
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = networkNodeStatusIdentifier(statusId).color.split('.');
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : column.id === "id" ? (
                e2p(text?.toString() || "")
              ) : column.id === "isV4" ? (
                <Chip size="small" label={text ? "IPv4" : "IPv6"} />
              ) : (
                text || "-"
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DETACH}
        onClose={closeDialogHandler}
        keyTitle="نود"
        subTitle="آیا از جدا کردن این نود از شبکه اطمینان دارید؟"
        securityPhrase={selectedNode?.vmHost || ""}
        onSubmit={detachNodeHandler}
        submitLoading={detachLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(NetworkNodeTableRow);
