import { FC } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { supportTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { useNavigate } from "react-router";

export const SupportTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();
  return (
    <DorsaTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.usedCode}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/cloud/support/${row.id}`)}
    >
      {supportTableStruct.map((column) => {
        const value = row[column.id];
        const text =
          column.format && typeof value === "number"
            ? column.format(value)
            : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 1, whiteSpace: "nowrap" }}
          >
            {column.id === "supportSubject" ? (
              <Typography
                textOverflow="ellipsis"
                fontSize={14}
                sx={{ maxWidth: 265, overflow: "hidden" }}
              >
                {text}
              </Typography>
            ) : (
              <Stack>
                {column.id === "supportStatus" ? (
                  <Chip
                    label={text}
                    sx={{
                      backgroundColor:
                        row.supportStatusId === 3
                          ? "success.light"
                          : "error.light",
                      color:
                        row.supportStatusId === 3
                          ? "success.main"
                          : "error.main",
                      py: 2.2,
                      borderRadius: 1,
                      fontSize: "14px",
                      cursor: "pointer",
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
    </DorsaTableRow>
  );
};
