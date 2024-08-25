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
  KuberCloudSecretListResponse,
  useDeleteApiMyKuberCloudSecretDeleteByIdMutation,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesSecretListTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesCloudSecretMapTableRow: FC<{
  row: any;
  rowBgColor: any;
}> = ({ row, rowBgColor }) => {
  const [open, setOpen] = useState(false);
  const id = row.id!;
  const name = row.name!;
  const createDate = row.createDate!;
  const secretList = row.secrets! || [];

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [
    selectedKubernetesCloudSecretMap,
    setSelectedKubernetesCloudSecretMap,
  ] = useState<KuberCloudSecretListResponse | null>(null);

  const [deleteSecretMap, { isLoading: deleteSecretMapLoading }] =
    useDeleteApiMyKuberCloudSecretDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteSecretMap({ id: Number(selectedKubernetesCloudSecretMap?.id) })
      .unwrap()
      .then(() => {
        toast.success("Secret با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetesCloudSecretMap(null);
  };

  const handleOpenDelete = (secret: KuberCloudSecretListResponse) => {
    setSelectedKubernetesCloudSecretMap(secret);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

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
        <TableCell align="center">{id}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{createDate}</TableCell>
        <TableCell align="center">
          <IconButton
            sx={{ borderRadius: 1 }}
            color="error"
            onClick={() => handleOpenDelete(row)}
          >
            <TrashSvg />
          </IconButton>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            borderTop: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
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
        <TableCell
          style={{ padding: 0 }}
          colSpan={6}
          sx={{ borderBottom: "none !important" }}
        >
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
                            <TableCell
                              align="center"
                              sx={{ borderBottom: "none !important" }}
                            >
                              {item.id}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ borderBottom: "none !important" }}
                            >
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
    </>
  );
};
