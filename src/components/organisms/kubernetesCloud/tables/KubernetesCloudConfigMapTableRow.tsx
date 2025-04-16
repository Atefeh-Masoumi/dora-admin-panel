import {
  IconButton,
  Stack,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  GetKuberCloudConfigResponse,
  useDeleteApiMyKubernetesCloudConfigmapDeleteByIdMutation,
  useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesCloudConfigMapTableStruct } from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { EditConfigMapDialog } from "../dialog/EditConfigMapDialog";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { useParams } from "react-router";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
  EDIT = "EDIT",
}

const configMapListTableStruct = [
  { id: "id", label: "شناسه" },
  { id: "key", label: "کلید" },
  { id: "value", label: "مقدار" },
];

export const KubernetesCloudConfigMapTableRow: FC<{
  row: any;
  rowBgColor: any;
}> = ({ row, rowBgColor }) => {
  const id = row.id!;
  const configList = row.configMaps! || [];
  const { kubernetesCloudId } = useParams();
  const { refetch } = useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery(
    { namespaceId: Number(kubernetesCloudId) || 0 },
    { skip: !kubernetesCloudId }
  );
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [openEditConfigMapDialog, setOpenEditConfigMapDialog] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [
    selectedKubernetesCloudConfigMap,
    setSelectedKubernetesCloudConfigMap,
  ] = useState<GetKuberCloudConfigResponse | null>(null);

  const [deleteConfigMap, { isLoading: deleteConfigMapLoading }] =
    useDeleteApiMyKubernetesCloudConfigmapDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteConfigMap({ id: Number(selectedKubernetesCloudConfigMap?.id) })
      .unwrap()
      .then(() => {
        toast.success("با موفقیت حذف شد");
        refetch();
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetesCloudConfigMap(null);
  };

  const handleOpenDeleteModal = (config: GetKuberCloudConfigResponse) => {
    setSelectedKubernetesCloudConfigMap(config);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  function handleOpenEditConfigMapDialog(config: GetKuberCloudConfigResponse) {
    setSelectedKubernetesCloudConfigMap(config);
    setOpenEditConfigMapDialog(true);
  }

  function handleCloseEditConfigMapDialog() {
    setOpenEditConfigMapDialog(false);
  }

  return (
    <Fragment key={id}>
      <DorsaTableRow
        tabIndex={-1}
        sx={{
          backgroundColor: "white !important",
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(4n+1)": {
            backgroundColor: "rgba(240, 247, 255, 1) !important",
          },
        }}
      >
        {kubernetesCloudConfigMapTableStruct.map((column, index) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
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
                    onClick={() => handleOpenEditConfigMapDialog(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDeleteModal(row)}
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
                  {column.id === "createDate"
                    ? ConvertToJalali(text)
                    : text || "__"}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6} sx={{ border: "none" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer sx={{ display: "flex" }}>
              <Table size="small" sx={{ m: 3, borderRadius: "15px" }}>
                <TableHead>
                  <TableRow>
                    {configMapListTableStruct.map((item, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{
                          bgcolor: "background.default",
                        }}
                      >
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {configList.length > 0
                    ? configList?.map((item: any, index: any) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center" sx={{ border: "none" }}>
                              {item.id}
                            </TableCell>
                            <TableCell align="center" sx={{ border: "none" }}>
                              {item.key}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ borderBottom: "none !important" }}
                            >
                              {item.value}
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
        onClose={closeDialogHandler}
        keyTitle="Configmap"
        subTitle="برای حذف Configmap, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKubernetesCloudConfigMap?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteConfigMapLoading}
      />
      <EditConfigMapDialog
        openDialog={openEditConfigMapDialog}
        onClose={handleCloseEditConfigMapDialog}
        configData={selectedKubernetesCloudConfigMap}
      />
    </Fragment>
  );
};
