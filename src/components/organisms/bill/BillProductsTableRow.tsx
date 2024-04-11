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
import { CustomerProductBillModel } from "src/app/services/api.generated";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { priceToPersian } from "src/utils/priceToPersian";
import { e2p } from "src/utils/e2p.utils";
import { customerProductItemsTableStruct } from "../portal/customerBill/tables/billTableStruct";

type BillProductsTableRowPropsType = {
  rowData: CustomerProductBillModel;
};
const BillProductsTableRow: FC<BillProductsTableRowPropsType> = ({
  rowData,
}) => {
  const [open, setOpen] = useState(false);
  const fromDate = rowData.fromDate!;
  const toDate = rowData.toDate!;
  const product = rowData.product!;
  const customerProductPrice = rowData.customerProductPrice!;
  const customerProduct = rowData.customerProduct!;
  const customerProductBillItems = rowData.customerProductBillItems || [];

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(odd)": {
            backgroundColor: "rgba(240, 247, 255, 1)",
          },
        }}
      >
        <TableCell align="center">{product}</TableCell>
        <TableCell align="center">{customerProduct}</TableCell>
        <TableCell align="center">
          {priceToPersian(customerProductPrice)}
        </TableCell>
        <TableCell align="center" sx={{ direction: "rtl" }}>
          {e2p(fromDate.replace(" ", " - "))}
        </TableCell>
        <TableCell align="center" sx={{ direction: "rtl" }}>
          {e2p(toDate.replace(" ", " - "))}
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
                    {customerProductItemsTableStruct.map((item, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{ bgcolor: "background.default" }}
                      >
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerProductBillItems.length > 0
                    ? customerProductBillItems?.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">
                              {row.customerProductItem}
                            </TableCell>
                            <TableCell align="center">
                              {e2p(row.fromDate!.replace(" ", " - "))}
                            </TableCell>
                            <TableCell align="center">
                              {e2p(row.toDate!.replace(" ", " - "))}
                            </TableCell>
                            <TableCell align="center">
                              {priceToPersian(row.quantity!)}
                            </TableCell>
                            <TableCell align="center">
                              {priceToPersian(row.duration!)}
                            </TableCell>
                            <TableCell align="center">
                              {priceToPersian(row.price!)}
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
    </>
  );
};

export default BillProductsTableRow;
