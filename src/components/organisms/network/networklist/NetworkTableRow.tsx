import { Button, IconButton, Stack, Chip } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VmNetworkListResponse,
  useDeleteApiMyVmByProjectIdNetworkDeleteAndIdMutation,
  useGetApiMyVmByProjectIdNetworkListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { networkTableStruct } from "./struct";
import { BORDER_RADIUS_1 } from "src/configs/theme";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const NetworkTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<VmNetworkListResponse | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { refetch } = useGetApiMyVmByProjectIdNetworkListQuery({
    projectId: Number(projectId),
  });

  const [deleteNetwork, { isLoading: deleteNetworkLoading }] =
    useDeleteApiMyVmByProjectIdNetworkDeleteAndIdMutation();

  const editNetworkOnClick = () => {
    navigate(`/network/${projectId}/${row["id"]}/node-list`);
  };

  const handleOpenDelete = (network: VmNetworkListResponse) => {
    setSelectedNetwork(network);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedNetwork(null);
  };

  const deleteNetworkHandler = () => {
    if (!selectedNetwork?.id) return;
    deleteNetwork({
      id: selectedNetwork.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("شبکه مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
        refetch();
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {networkTableStruct.map((column) => {
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
                <Stack
                  direction="row"
                  justifyContent="end"
                  spacing={0.6}
                  maxWidth="100%"
                >
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={editNetworkOnClick}
                  >
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{ borderRadius: 1, ml: "auto" }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={VmNetworkStatusIdentifier(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = VmNetworkStatusIdentifier(statusId).bgColor.split('.');
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = VmNetworkStatusIdentifier(statusId).typographyColor.split('.');
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : (
                <>
                  {text}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="شبکه"
        subTitle="برای حذف شبکه موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedNetwork?.name || ""}
        onSubmit={deleteNetworkHandler}
        submitLoading={deleteNetworkLoading}
      />
    </Fragment>
  );
};

export const VmNetworkStatusIdentifier = (StatusId: number) => {
  switch (StatusId) {
    case 1:
      return {
        iconColor: "success",
        typographyColor: "success.main",
        bgColor: "success.light",
        label: "فعال",
      };
    case 2:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "ناموفق",
      };
    case 3:
      return {
        iconColor: "warning",
        typographyColor: "warning.main",
        bgColor: "warning.light",
        label: "در حال انتظار",
      };
    case 4:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "حذف شده",
      };
    case 5:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "در حال حذف",
      };
    default:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "نامشخص",
      };
  }
};

export default withTableRowWrapper(NetworkTableRow); 