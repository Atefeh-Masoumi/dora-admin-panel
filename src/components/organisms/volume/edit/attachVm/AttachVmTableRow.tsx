import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetApiMyVmByProjectIdVolumeNodeListQuery,
  usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation,
  VmVolumeNodeListResponse,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { useNavigate, useParams } from "react-router";
import { attchVmTableStruct } from "./struct";


const nodeStatusList = (statusId?: number | null) => {
  switch (statusId) {
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
        label: "ناموفق",
        bgcolor: "error.light",
        color: "error.main",
      };
    case 3:
      return {
        id: 3,
        label: "درصف انتظار",
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
        label: "درحال قطع ارتباط",
        bgcolor: "warning.light",
        color: "warning.main",
      };

    case 7:
      return {
        id: 7,
        label: "درحال اتصال",
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

export const AttachVmTableRow: FC<{ row: VmVolumeNodeListResponse }> = ({ row }) => {
  const { blockstorageId, projectId } = useParams();

  const [isDettachDialogOpen, setIsDettachDialogOpen] = useState(false);
 const {
    refetch,
  } = useGetApiMyVmByProjectIdVolumeNodeListQuery(
    {
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId),
    },
    { skip: !projectId }
  );
 
  const [dettachVm, { isLoading: dettachVmLoading }] =
    usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation();

  const DettachVmHandler = () => {
    if (!blockstorageId) return;
    dettachVm({
      projectId: Number(projectId),
      id: row?.id,
    })
      .unwrap()
      .then((res) => {
        setIsDettachDialogOpen(false);
        refetch();
        toast.success("تغییرات با موفقیت اعمال شد");
      })
      .catch((err) => {});
  };

  const closeDettachDialogs = () => {
    setIsDettachDialogOpen(false);
  };
  const navigate = useNavigate();
  const gotoVm = () => {
     if (!row.vmHostId) return;
     navigate(`/vm/${projectId}/${row.vmHostId}/specification`);
  };
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} >
        {attchVmTableStruct.map((column) => {
          const value = row[column.id as keyof VmVolumeNodeListResponse];
          const text = column.format ? column.format(value) : value;
          const status = nodeStatusList(row?.statusId);

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => setIsDettachDialogOpen(true)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={status.label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] =
                        status.bgcolor.split(".");
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] =
                        status.color.split(".");
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : column.id === "isConnected" ? (
                <Typography>
                  {row.isConnected ? (
                    <Chip
                      label={"متصل"}
                      sx={{
                        bgcolor: ({ palette }) => {
                          const [color, shade] =
                            nodeStatusList(1).bgcolor.split(".");
                          return (palette as any)[color][shade];
                        },
                        color: ({ palette }) => {
                          const [color, shade] =
                            nodeStatusList(1).color.split(".");
                          return (palette as any)[color][shade];
                        },
                        borderRadius: BORDER_RADIUS_1,
                      }}
                    />
                  ) : (
                    <Chip
                      label={"قطع شده"}
                      sx={{
                        bgcolor: ({ palette }) => {
                          const [color, shade] =
                            nodeStatusList(2).bgcolor.split(".");
                          return (palette as any)[color][shade];
                        },
                        color: ({ palette }) => {
                          const [color, shade] =
                            nodeStatusList(2).color.split(".");
                          return (palette as any)[color][shade];
                        },
                        borderRadius: BORDER_RADIUS_1,
                      }}
                    />
                  )}
                </Typography>
              ) : column.id === "vmHost" ? (
                <Typography>
                  {row.vmHost ? (
                    <Box
                      sx={{
                        display: "inline-block",
                        color: "primary.main",
                        mx: 0.5,
                        fontSize: 16,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={gotoVm}
                    >
                      {row.vmHost}
                    </Box>
                  ) : (
                    "----"
                  )}
                </Typography>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={!!isDettachDialogOpen}
        onClose={closeDettachDialogs}
        keyTitle=" ارتباط با سرور ابری "
        subTitle="برای قطع ارتباط با سرور موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={row?.vmHost || ""}
        onSubmit={DettachVmHandler}
        submitLoading={dettachVmLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(AttachVmTableRow);
