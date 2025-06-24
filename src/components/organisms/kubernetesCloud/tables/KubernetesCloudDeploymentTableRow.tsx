import {
  Chip,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  KuberDeployListResponse,
  PortResponse,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  kubernetesCloudDeploymentInnerListTableStruct,
  kubernetesCloudDeploymentTableStruct,
} from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesCloudDeploymentTableRow: FC<{ row: any }> = ({
  row,
}) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedDeployment, setSelectedDeployment] =
    useState<KuberDeployListResponse | null>(null);

  const navigate = useNavigate();
  const { kubernetesCloudId,projectId } = useParams();
  const nodePortList: PortResponse[] = row.ports! || [];

  const [deleteDeployment, { isLoading: deleteDeploymentRecordLoading }] =
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdMutation();

  const handleSettingButtonOnClick = () =>
    navigate(
      "/kubernetes-cloud/" +
        projectId +
        kubernetesCloudId +
        "/deployment/" +
        row.id +
        "/overview"
    );

  const handleDeleteDeploymentRecord = () =>
    deleteDeployment({ id: Number(selectedDeployment?.id),kuberHostId : Number(kubernetesCloudId), projectId: Number(projectId),  })
      .unwrap()
      .then(() => {
        toast.success("سرویس deployment شما با موفقیت حذف شد");
        handleCloseDeleteDialog();
      })
      .catch((err) => {});

  const handleCloseDeleteDialog = () => {
    setDialogType(null);
    setSelectedDeployment(null);
  };

  const handleOpenDeleteDialog = (kubernetes: KuberDeployListResponse) => {
    setSelectedDeployment(kubernetes);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment key={row.value}>
      <DorsaTableRow
        sx={{
          backgroundColor: "white !important",
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(4n+1)": {
            backgroundColor: "rgba(240, 247, 255, 1) !important",
          },
        }}
        tabIndex={-1}
      >
        {kubernetesCloudDeploymentTableStruct.map((column, index) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];

          return (
            <DorsaTableCell
              key={index}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={0.6}
                  maxWidth="fit-content"
                >
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={handleSettingButtonOnClick}
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
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDeleteDialog(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Stack>
              ) : (
                <>
                  {column.id === "statusId" ? (
                    <Chip
                      clickable={false}
                      label={serviceStatusIdentifier(id).label}
                      sx={{
                        bgcolor: serviceStatusIdentifier(id).bgColor,
                        color: serviceStatusIdentifier(id).typographyColor,
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : column.id === "createDate" ? (
                    ConvertToJalali(text)
                  ) : (
                    text || "__"
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>

      <TableRow>
        <TableCell sx={{ border: "none", p: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer sx={{ display: "flex" }}>
              <Table size="small" sx={{ m: 3, borderRadius: "15px" }}>
                <TableHead>
                  <TableRow>
                    {kubernetesCloudDeploymentInnerListTableStruct.map(
                      (item, index) => (
                        <TableCell
                          key={index}
                          align="center"
                          sx={{
                            bgcolor: "background.default",
                          }}
                        >
                          {item.label}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nodePortList.length > 0
                    ? nodePortList?.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell sx={{ border: "none" }} align="center">
                              {item.nodePort}
                            </TableCell>
                            <TableCell sx={{ border: "none" }} align="center">
                              {item.targetPort}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>

      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={handleCloseDeleteDialog}
        keyTitle="سرویس Deployment"
        subTitle="برای حذف Deployment, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedDeployment?.name || ""}
        onSubmit={handleDeleteDeploymentRecord}
        submitLoading={deleteDeploymentRecordLoading}
      />
    </Fragment>
  );
};
