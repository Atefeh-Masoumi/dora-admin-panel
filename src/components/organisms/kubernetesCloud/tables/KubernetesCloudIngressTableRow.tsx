import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Collapse,
  IconButton,
  Paper,
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
  KuberCloudIngressListResponse,
  RulesModel,
  useDeleteApiMyKubernetesCloudIngressDeleteByIngressIdMutation,
  useDeleteApiMyKubernetesCloudIngressRuleDeleteByIdMutation,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  kubernetesCloudIngressRuleTableStruct,
  kubernetesCloudIngressTableStruct,
} from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { EditSecretMapDialog } from "../dialog/EditSecretMapDialog";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

enum ITEM_TYPE_ENUM {
  INGRESS = "INGRESS",
  INGRESS_RULE = "INGRESS_RULE",
}

export const KubernetesCloudIngressTableRow: FC<{
  row: KuberCloudIngressListResponse;
  rowBgColor: any;
}> = ({ row, rowBgColor }) => {
  const [openEditIngressDialog, setOpenEditIngressDialog] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [keyTitle, setKeyTitle] = useState<"Ingress" | "Ingress Rule" | null>(
    null
  );
  const ingressRuleList = row.rules || [];

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKubernetesCloudIngress, setSelectedKubernetesCloudIngress] =
    useState<KuberCloudIngressListResponse | null>(null);
  const [selectedIngressRule, setSelectedIngressRule] =
    useState<RulesModel | null>(null);

  const [deleteIngress, { isLoading: deleteIngressLoading }] =
    useDeleteApiMyKubernetesCloudIngressDeleteByIngressIdMutation();

  const [deleteIngressRule, { isLoading: deleteIngressRuleLoading }] =
    useDeleteApiMyKubernetesCloudIngressRuleDeleteByIdMutation();

  const deleteHandler = (itemType: "Ingress" | "Ingress Rule" | null) =>
    itemType === "Ingress"
      ? deleteIngress({ ingressId: Number(selectedKubernetesCloudIngress?.id) })
          .unwrap()
          .then(() => {
            toast.success("ingress با موفقیت حذف شد");
            closeDialogHandler();
          })
          .catch((err) => {})
      : deleteIngressRule({ id: Number(selectedIngressRule?.id) });

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetesCloudIngress(null);
  };

  const handleOpenDeleteModal = (
    item: KuberCloudIngressListResponse | RulesModel,
    itemType: ITEM_TYPE_ENUM
  ) => {
    switch (itemType) {
      case "INGRESS":
        setSelectedKubernetesCloudIngress(
          item as KuberCloudIngressListResponse
        );
        setKeyTitle("Ingress");
        break;
      case "INGRESS_RULE":
        setSelectedIngressRule(item as RulesModel);
        setKeyTitle("Ingress Rule");

        break;
      default:
        break;
    }
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  function handleOpenEditIngressDialog(ingress: KuberCloudIngressListResponse) {
    setSelectedKubernetesCloudIngress(ingress);
    setOpenEditIngressDialog(true);
  }

  function handleCloseEditIngressRuleDialog() {
    setOpenEditIngressDialog(false);
  }

  console.log(selectedIngressRule);

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
        {kubernetesCloudIngressTableStruct.map((column, index) => {
          const value = row[column.id as keyof KuberCloudIngressListResponse];
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
                  {/* <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={() => handleOpenEditIngressDialog(row)}
                  >
                    <Edit />
                  </IconButton> */}
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() =>
                      handleOpenDeleteModal(row, ITEM_TYPE_ENUM.INGRESS)
                    }
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
                    ? ConvertToJalali(String(text))
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
            <Paper sx={{ boxShadow: "none" }}>
              <TableContainer
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Table
                  size="small"
                  sx={{
                    // "& tr": { bgcolor: "red" },
                    // "& th": { bgcolor: "blue" },
                    m: 3,
                    borderRadius: "15px",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {kubernetesCloudIngressRuleTableStruct.map(
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
                    {ingressRuleList.length > 0
                      ? ingressRuleList?.map((rule, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="center" sx={{ border: "none" }}>
                                {rule.id}
                              </TableCell>
                              <TableCell align="center" sx={{ border: "none" }}>
                                {rule.port}
                              </TableCell>
                              <TableCell align="center" sx={{ border: "none" }}>
                                {rule.path?.split("/").reverse().join("/")}
                              </TableCell>
                              <TableCell align="center" sx={{ border: "none" }}>
                                {rule.serviceName}
                              </TableCell>
                              <TableCell align="center" sx={{ border: "none" }}>
                                {ConvertToJalali(String(rule.createDate))}
                              </TableCell>
                              <TableCell align="center" sx={{ border: "none" }}>
                                {ConvertToJalali(String(rule.modifiyDate))}
                              </TableCell>
                              <TableCell align="center" sx={{ border: "none" }}>
                                <IconButton
                                  size="small"
                                  sx={{ borderRadius: 1 }}
                                  onClick={() =>
                                    handleOpenEditIngressDialog(row)
                                  }
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  sx={{ borderRadius: 1 }}
                                  color="error"
                                  onClick={() =>
                                    handleOpenDeleteModal(
                                      rule,
                                      ITEM_TYPE_ENUM.INGRESS_RULE
                                    )
                                  }
                                >
                                  <TrashSvg />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : ""}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle={keyTitle || ""}
        subTitle="برای حذف آیتم, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={
          keyTitle === "Ingress"
            ? selectedKubernetesCloudIngress?.name || ""
            : selectedIngressRule?.serviceName! + ":" + selectedIngressRule?.id
        }
        onSubmit={() => deleteHandler(keyTitle)}
        submitLoading={deleteIngressLoading}
      />
      <EditSecretMapDialog
        openDialog={openEditIngressDialog}
        onClose={handleCloseEditIngressRuleDialog}
        secretData={selectedKubernetesCloudIngress}
      />
    </>
  );
};
