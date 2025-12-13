import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VmFirewallRuleListResponse,
  useDeleteApiMyVmByProjectIdFirewallAndVmFirewallIdRuleDeleteIdMutation,
  useGetApiMyVmByProjectIdFirewallAndVmFirewallIdRuleListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { firewallRuleTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  DELETE = "DELETE",
}

const FirewallRuleTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedRule, setSelectedRule] = useState<VmFirewallRuleListResponse | null>(null);
  const { projectId, firewallId } = useParams();
  const { refetch } = useGetApiMyVmByProjectIdFirewallAndVmFirewallIdRuleListQuery({
    projectId: Number(projectId),
    vmFirewallId: Number(firewallId),
  });

  const [deleteRule, { isLoading: deleteRuleLoading }] =
    useDeleteApiMyVmByProjectIdFirewallAndVmFirewallIdRuleDeleteIdMutation();

  const handleOpenDelete = (rule: VmFirewallRuleListResponse) => {
    setSelectedRule(rule);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedRule(null);
  };

  const deleteRuleHandler = () => {
    if (!selectedRule?.id) return;
    deleteRule({
      id: selectedRule.id,
      projectId: Number(projectId),
      vmFirewallId: Number(firewallId),
    })
      .unwrap()
      .then(() => {
        toast.success("قانون مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
        refetch();
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {firewallRuleTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  justifyContent="end"
                  spacing={0.6}
                  maxWidth="100%"
                >
                  <IconButton
                    sx={{ borderRadius: 1, ml: "auto" }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "isIngress" ? (
                <>{value ? "ورودی" : "خروجی"}</>
              ) : (
                <>
                  {text}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="قانون"
        subTitle="برای حذف قانون موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedRule?.id?.toString() || ""}
        onSubmit={deleteRuleHandler}
        submitLoading={deleteRuleLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(FirewallRuleTableRow);

