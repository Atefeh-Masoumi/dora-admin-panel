import { FC } from "react";
import { Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { orderTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";

export const OrderTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();
  return (
    <DorsaTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.usedCode}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/cloud/order/${row.id}`)}
    >
      {orderTableStruct.map((column) => {
        const value = row[column.id];
        const text =
          column.format && typeof value === "number"
            ? column.format(value)
            : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 5, whiteSpace: "nowrap" }}
          >
            {column.id === "title" ? (
              <Stack
                sx={{
                  maxWidth: 232,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {text}
              </Stack>
            ) : (
              <Stack>
                {column.id === "orderStatus" ? (
                  <Chip
                    label={text}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        row["orderStatusId"] === 2
                          ? "success.light"
                          : "error.light",
                      color:
                        row["orderStatusId"] === 2
                          ? "success.main"
                          : "error.main",
                      py: 2.2,
                      borderRadius: 1,
                      fontSize: "14px",
                    }}
                  />
                ) : (
                  text
                )}
              </Stack>
            )}
          </DorsaTableCell>
        );
      })}
      {/* <DorsaTableCell align="center" sx={{ px: 5, whiteSpace: "nowrap" }}>
          <IconButton onClick={deleteButtonClickHandler}>
            <DeleteSvg />
          </IconButton>
        </DorsaTableCell> */}
    </DorsaTableRow>
  );
};
