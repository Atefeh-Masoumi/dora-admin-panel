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
  Tooltip,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  KuberIngressListResponse,
  RulesModel,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdMutation,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdMutation,
} from "src/app/services/api.generated";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  kubernetesCloudIngressRuleTableStruct,
  kubernetesCloudIngressTableStruct,
} from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";
import { EditIngressRuleDialog } from "../dialog/EditIngressRuleDialog";
import { Add } from "@mui/icons-material";
import { AddRuleDialog } from "../dialog/AddRuleDialog";
import { useParams } from "react-router";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
  EDIT = "EDIT",
}

enum ITEM_TYPE_ENUM {
  INGRESS = "INGRESS",
  INGRESS_RULE = "INGRESS_RULE",
}

export const KubernetesCloudIngressTableRow: FC<{
  row: KuberIngressListResponse;
  rowBgColor: any;
}> = ({ row, rowBgColor }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKubernetesCloudIngress, setSelectedKubernetesCloudIngress] =
    useState<KuberIngressListResponse | null>(null);
  const [selectedIngressRule, setSelectedIngressRule] =
    useState<RulesModel | null>(null);
  const [keyTitle, setKeyTitle] = useState<ITEM_TYPE_ENUM | null>(null);

  const ingressRuleList = row.rules || [];

  const [deleteIngress, { isLoading: deleteIngressLoading }] =
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdMutation();

  const [deleteIngressRule, { isLoading: deleteIngressRuleLoading }] =
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdMutation();

  const isLoading = useMemo(() => {
    return deleteIngressLoading && deleteIngressRuleLoading;
  }, [deleteIngressLoading, deleteIngressRuleLoading]);

  const { kubernetesCloudId,projectId } = useParams();
  const handleDeleteItem = (itemType: ITEM_TYPE_ENUM | null) =>
    itemType === ITEM_TYPE_ENUM.INGRESS
      ? deleteIngress({ id: Number(selectedKubernetesCloudIngress?.id),
        projectId: Number(projectId), kuberHostId: Number(kubernetesCloudId)
       })
          .unwrap()
          .then(() => {
            toast.success("ingress با موفقیت حذف شد");
            handleCloseModal();
          })
          .catch((err) => {})
      : deleteIngressRule({ id: Number(selectedIngressRule?.id), projectId: Number(projectId),
         kuberHostId: Number(kubernetesCloudId),kuberIngressId: Number(selectedKubernetesCloudIngress?.id) });

  const handleCloseModal = () => {
    setDialogType(null);
    setKeyTitle(null);
    setSelectedKubernetesCloudIngress(null);
    setSelectedIngressRule(null);
  };

  const handleOpenModal = (
    item: KuberIngressListResponse | RulesModel,
    itemType: ITEM_TYPE_ENUM,
    dialogType: DIALOG_TYPE_ENUM
  ) => {
    switch (itemType) {
      case "INGRESS":
        setSelectedKubernetesCloudIngress(
          item as KuberIngressListResponse
        );
        setKeyTitle(ITEM_TYPE_ENUM.INGRESS);
        break;
      case "INGRESS_RULE":
        setSelectedIngressRule(item as RulesModel);
        setKeyTitle(ITEM_TYPE_ENUM.INGRESS_RULE);

        break;
      default:
        break;
    }
    setDialogType(dialogType);
  };

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
          const value = row[column.id as keyof KuberIngressListResponse];
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
                  <Tooltip
                    title="ایجاد رول جدید"
                    placement="top"
                    arrow
                    sx={{
                      backgroundColor: "gray.800",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    <IconButton
                      sx={{ borderRadius: 1 }}
                      onClick={() =>
                        handleOpenModal(
                          row,
                          ITEM_TYPE_ENUM.INGRESS_RULE,
                          DIALOG_TYPE_ENUM.CREATE
                        )
                      }
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() =>
                      handleOpenModal(
                        row,
                        ITEM_TYPE_ENUM.INGRESS,
                        DIALOG_TYPE_ENUM.DELETE
                      )
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
                  {column.id === "createDate" || column.id === "modifyDate"
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
                                <IconButton
                                  size="small"
                                  sx={{ borderRadius: 1 }}
                                  onClick={() =>
                                    handleOpenModal(
                                      rule,
                                      ITEM_TYPE_ENUM.INGRESS_RULE,
                                      DIALOG_TYPE_ENUM.EDIT
                                    )
                                  }
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  sx={{ borderRadius: 1 }}
                                  color="error"
                                  onClick={() =>
                                    handleOpenModal(
                                      rule,
                                      ITEM_TYPE_ENUM.INGRESS_RULE,
                                      DIALOG_TYPE_ENUM.DELETE
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
        onClose={handleCloseModal}
        keyTitle={keyTitle?.toLocaleLowerCase() || ""}
        subTitle="برای حذف آیتم, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={
          keyTitle === ITEM_TYPE_ENUM.INGRESS
            ? selectedKubernetesCloudIngress?.name || ""
            : selectedIngressRule?.serviceName! +
              ":" +
              selectedIngressRule?.port
        }
        onSubmit={() => handleDeleteItem(keyTitle)}
        submitLoading={isLoading}
      />
      <AddRuleDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={handleCloseModal}
        ingressId={row.id}
      />
      <EditIngressRuleDialog
        open={dialogType === DIALOG_TYPE_ENUM.EDIT}
        onClose={handleCloseModal}
        data={selectedIngressRule}
      />
    </>
  );
};
