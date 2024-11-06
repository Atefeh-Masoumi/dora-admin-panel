import { Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { supportStatusIdentifier } from "src/constant/supportStatusIdentifier";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { supportTableStruct } from "./struct";

export const SupportTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();

  return (
    <DorsaTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.usedCode}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/portal/support/${row.id}`)}
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
            {column.id === "issueSubject" ? (
              <Typography
                textOverflow="ellipsis"
                fontSize={14}
                sx={{ maxWidth: 265, overflow: "hidden" }}
              >
                {text}
              </Typography>
            ) : (
              <Stack>
                {column.id === "issueStatus" ? (
                  <Chip
                    label={text}
                    sx={{
                      bgcolor: supportStatusIdentifier(row.issueStatusId)
                        .bgcolor,
                      color: supportStatusIdentifier(row.issueStatusId)
                        .typographyColor,
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

export default withTableRowWrapper(SupportTableRow);
