import { FC } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { paymentTableStruct } from "./struct";
import { useNavigate } from "react-router";

export const PaymentTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();

  const rowClickHandler = () => navigate("/payment/" + row.id);

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
    <DorsaTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
      onClick={rowClickHandler}
    >
      {paymentTableStruct.map((column) => {
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 5, whiteSpace: "nowrap" }}
          >
            <Stack>{renderValueHandler(column)}</Stack>
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};
