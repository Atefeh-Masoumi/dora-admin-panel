import { FC, useState } from "react";
import { paymentTableStruct } from "./struct";
import { Chip, Stack, Typography } from "@mui/material";
import PaymentDialog from "../dialog/PaymentDIalog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";

const PaymentTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialog, setDialog] = useState<boolean>(false);

  const openDialog = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  const renderValueHandler = (column: any) => {
    const value = row[column.id];

    const text =
      column.format && typeof value === "number" ? column.format(value) : value;

    let result: any;
    switch (column.id) {
      case "title":
        result = (
          <Typography maxWidth={232} overflow="hidden" textOverflow="ellipsis">
            {text}
          </Typography>
        );
        break;
      case "paymentStatus":
        const isSuccess = row["paymentStatusId"] === 2;
        result = (
          <Chip
            label={text}
            sx={{
              cursor: "pointer",
              backgroundColor: isSuccess ? "success.light" : "error.light",
              color: isSuccess ? "success.main" : "error.main",
              py: 2.2,
              borderRadius: 1,
              fontSize: "14px",
            }}
          />
        );
        break;
      case "hashCardNumber":
        result = (
          <Typography sx={{ direction: "rtl", fontSize: "12px" }}>
            {text}
          </Typography>
        );
        break;
      case "amount":
        result = <>{text} ریال</>;
        break;
      default:
        result = text;
        break;
    }
    return result;
  };

  return (
    <>
      <DorsaTableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        sx={{ py: 2.9, cursor: "pointer" }}
        onClick={openDialog}
      >
        {paymentTableStruct.map((column) => {
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, py: 2.9, whiteSpace: "nowrap" }}
            >
              <Stack>{renderValueHandler(column)}</Stack>
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>

      <PaymentDialog handleClose={closeDialog} open={dialog} maxWidth="xs" />
    </>
  );
};

export default withTableRowWrapper(PaymentTableRow);
