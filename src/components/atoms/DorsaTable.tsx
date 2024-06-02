import { Pagination, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const DorsaTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(240, 247, 255, 1)",
    borderRadius: 5,
  },
  "& td": {
    color: "secondary",
    borderRadius: 5,
    border: "none",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const DorsaTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "secondary",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
  borderRadius: "0 !important",
}));

export const DorsaTablePagination = styled(Pagination)(() => ({
  "& .MuiButtonBase-root": {
    border: "none",
    backgroundColor: "rgba(110, 118, 138, 0.08)",
    color: "secondary",
    borderRadius: BORDER_RADIUS_1,
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgba(60, 138, 255, 0.3)",
      color: "rgba(60, 138, 255, 1)",
    },
    "&:focus": {
      backgroundColor: "rgba(60, 138, 255, 1)",
      color: "white",
    },
  },
}));
