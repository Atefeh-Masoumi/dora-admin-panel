import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetApiMyVmByProjectIdVolumeNodeGetQuery,
  usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { useNavigate, useParams } from "react-router";
import { attchVmTableStruct } from "./struct";


const nodeStatusList = (statusId: number) => {
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

export const AttachVmTableRow: FC<{ row: any }> = ({ row }) => {
  const { blockstorageId, projectId } = useParams();

  const [isDettachDialogOpen, setIsDettachDialogOpen] = useState(false);

  const { data: blockstorageSpecification,refetch } =
    useGetApiMyVmByProjectIdVolumeNodeGetQuery(
      { projectId: Number(projectId), vmVolumeHostId: Number(blockstorageId) },
      { skip: !blockstorageId }
    );
  const [dettachVm, { isLoading: dettachVmLoading }] =
    usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation();



  const DettachVmHandler = () => {
    if (!blockstorageId) return;
    dettachVm({
      projectId: Number(projectId),
      id: Number(blockstorageSpecification?.id),
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
  const gotoVm = (vmId: number | null | undefined) => () => {
    if (!vmId) return;
    navigate(`/vm/${projectId}/${vmId}/specification`);
  };
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {attchVmTableStruct.map((column) => {
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
                  <IconButton onClick={() => setIsDettachDialogOpen(true)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={nodeStatusList(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] =
                        nodeStatusList(statusId).bgcolor.split(".");
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] =
                        nodeStatusList(statusId).color.split(".");
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
                      onClick={gotoVm(blockstorageSpecification?.vmHostId)}
                    >
                      {blockstorageSpecification?.vmHost}
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
        securityPhrase={blockstorageSpecification?.vmHost || ""}
        onSubmit={DettachVmHandler}
        submitLoading={dettachVmLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(AttachVmTableRow);
