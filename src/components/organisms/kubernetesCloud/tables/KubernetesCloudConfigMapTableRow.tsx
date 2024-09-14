import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  GetKuberCloudConfigResponse,
  useDeleteApiMyKubernetesCloudConfigmapDeleteByIdMutation,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesConfigListTableStruct } from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { EditConfigMapDialog } from "../dialog/EditConfigMapDialog";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
  EDIT = "EDIT",
}

export const KubernetesCloudConfigMapTableRow: FC<{
  row: any;
  rowBgColor: any;
}> = ({ row, rowBgColor }) => {
  const [open, setOpen] = useState(false);
  const id = row.id!;
  const name = row.name!;
  const createDate = row.createDate!;
  const configList = row.configMaps! || [];

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [openEditConfigMapDialog, setOpenEditConfigMapDialog] =
    useState<boolean>(false);
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
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(odd)": {
            backgroundColor: rowBgColor,
          },
        }}
      >
        <TableCell sx={{ border: "none" }} align="center">
          {id}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="center">
          {name}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="center">
          {ConvertToJalali(String(createDate))}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="center">
          <IconButton
            sx={{ borderRadius: 1 }}
            onClick={() => handleOpenEditConfigMapDialog(row)}
          >
            <EditIcon />
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
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer sx={{ display: "flex" }}>
              <Table size="small" sx={{ m: 3, borderRadius: "15px" }}>
                <TableHead>
                  <TableRow>
                    {kubernetesConfigListTableStruct.map((item, index) => (
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
                            <TableCell sx={{ border: "none" }} align="center">
                              {item.id}
                            </TableCell>
                            <TableCell sx={{ border: "none" }} align="center">
                              {item.key}
                            </TableCell>
                            <TableCell sx={{ border: "none" }} align="center">
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
    </>
  );
};
