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
import { useDeleteApiMyVpcLoadBalanceDeleteByIdMutation } from "src/app/services/api.generated";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcLoadBalancerPollMembersTableStruct } from "./struct";

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
  ] = useDeleteApiMyVpcLoadBalanceDeleteByIdMutation();

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

  return (
    <Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(odd)": {
            backgroundColor: rowBgColor,
          },
        }}
      >
        <TableCell align="center">{rowData?.id}</TableCell>
        <TableCell align="center">{rowData?.ip}</TableCell>
        <TableCell align="center">{rowData?.name}</TableCell>
        <TableCell align="center">{rowData?.port}</TableCell>
        <TableCell align="center">{rowData?.vpcHostLbType}</TableCell>
        <TableCell align="center">
          <IconButton
            sx={{ borderRadius: 1 }}
            color="error"
            onClick={() => handleOpenDelete(rowData?.id)}
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
                  {rowData?.vpcHostLbNodes
                    ? rowData?.vpcHostLbNodes?.map((item: any, index: any) => {
                        return (
                          <TableRow key={index} sx={{ border: "none" }}>
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
