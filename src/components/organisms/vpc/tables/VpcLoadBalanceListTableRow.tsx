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
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteApiMyVpcLoadBalancerDeleteVirtualServerByIdMutation } from "src/app/services/api.generated";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcLoadBalancerPollMembersTableStruct } from "./struct";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

type VpcLoadbalancerTableRowPropsType = {
  rowData: any;
  rowBgColor: string;
};

export const VpcLoadBalanceListTableRow: FC<
  VpcLoadbalancerTableRowPropsType
> = ({ rowData, rowBgColor }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedLoadBalance, setSelectedLoadBalance] = useState<any>(null);

  const [
    deleteLoadBalanceRecord,
    { isLoading: deleteLoadBalanceRecordLoading },
  ] = useDeleteApiMyVpcLoadBalancerDeleteVirtualServerByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedLoadBalance(null);
  };

  const handleOpenDelete = (virtualServerId: number) => {
    setSelectedLoadBalance(virtualServerId);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteLoadBalanceRecordHandler = () =>
    deleteLoadBalanceRecord({
      id: Number(selectedLoadBalance),
    })
      .unwrap()
      .then(() => {
        toast.success("LoadBalance رکورد مورد نظر حذف شد", { icon: Success });
        closeDialogHandler();
      })
      .catch((err) => {});

  const poolMemberItems = rowData?.serverPoolMembers;

  return (
    <Fragment>
      {/* <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcLoadBalanceStruct.map((column) => {
          const value = row[column.id];
          const text =
            column.format && typeof value === "number"
              ? column.format(value)
              : value;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow> */}
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(odd)": {
            backgroundColor: rowBgColor,
          },
        }}
      >
        <TableCell align="center">{rowData?.virtualServerId}</TableCell>
        <TableCell align="center">{rowData?.name}</TableCell>
        <TableCell align="center">{rowData?.port}</TableCell>
        <TableCell align="center">{rowData?.algorithmTypeName}</TableCell>
        <TableCell align="center">{rowData?.ip}</TableCell>
        <TableCell align="center">
          <IconButton
            sx={{ borderRadius: 1 }}
            color="error"
            onClick={() => handleOpenDelete(rowData?.virtualServerId)}
          >
            <TrashSvg />
          </IconButton>
        </TableCell>
        <TableCell>
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
                    {vpcLoadBalancerPollMembersTableStruct.map(
                      (item, index) => (
                        <TableCell
                          key={index}
                          align="center"
                          sx={{ bgcolor: "background.default" }}
                        >
                          {item.label}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {poolMemberItems.length > 0
                    ? poolMemberItems?.map((item: any, index: any) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">{item.ip}</TableCell>
                            <TableCell align="center">{item.name}</TableCell>
                            <TableCell align="center">{item.port}</TableCell>
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
        keyTitle="LoadBalance"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={rowData?.name || ""}
        onSubmit={deleteLoadBalanceRecordHandler}
        submitLoading={deleteLoadBalanceRecordLoading}
      />
    </Fragment>
  );
};
