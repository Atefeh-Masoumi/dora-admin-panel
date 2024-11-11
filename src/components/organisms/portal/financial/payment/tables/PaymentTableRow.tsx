import { FC, useState } from "react";
import { paymentTableStruct } from "./struct";
import { Chip, Stack, Typography } from "@mui/material";
import PaymentModal from "src/pages/portal/financial/Payment";
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
        result = <Typography sx={{ direction: "rtl" }}>{text}</Typography>;
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
        sx={{ cursor: "pointer" }}
        onClick={openDialog}
      >
        {paymentTableStruct.map((column) => {
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              <Stack>{renderValueHandler(column)}</Stack>
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>

      <PaymentModal handleClose={closeDialog} open={dialog} maxWidth="xs" />
    </>
  );
};

export default withTableRowWrapper(PaymentTableRow);
