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
  useDeleteApiMyKuberCloudConfigmapDeleteByIdMutation,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesConfigListTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
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
  const [
    selectedKubernetesCloudConfigMap,
    setSelectedKubernetesCloudConfigMap,
  ] = useState<GetKuberCloudConfigResponse | null>(null);

  const [deleteConfigMap, { isLoading: deleteConfigMapLoading }] =
    useDeleteApiMyKuberCloudConfigmapDeleteByIdMutation();

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

  const handleOpenDelete = (config: GetKuberCloudConfigResponse) => {
    setSelectedKubernetesCloudConfigMap(config);
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
        keyTitle="Config Map"
        subTitle="برای حذف Config Map, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKubernetesCloudConfigMap?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteConfigMapLoading}
      />
    </>
  );
};
