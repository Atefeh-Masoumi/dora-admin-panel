import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
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
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  KuberCloudSecretListResponse,
  useDeleteApiMyKubernetesCloudSecretDeleteByIdMutation,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  kubernetesCloudSecretMapTableStruct,
  kubernetesSecretListTableStruct,
} from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { EditSecretMapDialog } from "../dialog/EditSecretMapDialog";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";
import { useParams } from "react-router";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesCloudSecretMapTableRow: FC<{
  row: any;
  rowBgColor: any;
}> = ({ row, rowBgColor }) => {
  const [openEditSecretDialog, setOpenEditSecretDialog] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const secretList = row.secrets! || [];

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [
    selectedKubernetesCloudSecretMap,
    setSelectedKubernetesCloudSecretMap,
  ] = useState<KuberCloudSecretListResponse | null>(null);

  const { kubernetesCloudId } = useParams();
  const { refetch } = useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery(
    { namespaceId: Number(kubernetesCloudId) || 0 },
    { skip: !kubernetesCloudId }
  );
  const [deleteSecretMap, { isLoading: deleteSecretMapLoading }] =
    useDeleteApiMyKubernetesCloudSecretDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteSecretMap({ id: Number(selectedKubernetesCloudSecretMap?.id) })
      .unwrap()
      .then(() => {
        toast.success("Secret با موفقیت حذف شد");
        closeDialogHandler();
        refetch();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetesCloudSecretMap(null);
  };

  const handleOpenDeleteModal = (secret: KuberCloudSecretListResponse) => {
    setSelectedKubernetesCloudSecretMap(secret);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  function handleOpenEditSecretDialog(secret: KuberCloudSecretListResponse) {
    setSelectedKubernetesCloudSecretMap(secret);
    setOpenEditSecretDialog(true);
  }

  function handleCloseEditSecretDialog() {
    setOpenEditSecretDialog(false);
  }

  return (
    <>
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
        {kubernetesCloudSecretMapTableStruct.map((column, index) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          // const id = row["statusId"];
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
                    onClick={() => handleOpenEditSecretDialog(row)}
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
                    {kubernetesSecretListTableStruct.map((item, index) => (
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
                  {secretList.length > 0
                    ? secretList?.map((item: any, index: any) => {
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
        keyTitle="Secret"
        subTitle="برای حذف Secret, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKubernetesCloudSecretMap?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteSecretMapLoading}
      />
      <EditSecretMapDialog
        openDialog={openEditSecretDialog}
        onClose={handleCloseEditSecretDialog}
        secretData={selectedKubernetesCloudSecretMap}
      />
    </>
  );
};
