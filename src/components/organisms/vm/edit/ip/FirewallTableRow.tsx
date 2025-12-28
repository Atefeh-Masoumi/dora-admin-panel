import { Chip } from "@mui/material";
import { FC, Fragment } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { FirewalStruct } from "./struct";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const FirewalTableRow: FC<{ row: any }> = ({ row }) => {

  const getSecurityStatusConfig = (enabled: boolean) => {
    if (enabled) {
      return {
        bgcolor: "success.light",
        typographyColor: "success.main",
        label: "فعال",
      };
    }

    return {
      bgcolor: "error.light",
      typographyColor: "error.main",
      label: "غیرفعال",
    };
  };
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row?.id ?? row?.vmHostName}>
        {FirewalStruct.map((column) => {
          const value = row?.[column.id];

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              {column.id === "isSecurityEnabled" ? (() => {
                const status = getSecurityStatusConfig(Boolean(value));

                return (
                  <Chip
                    size="small"
                    label={status.label}
                    sx={{
                      bgcolor: ({ palette }) => {
                        const [color, shade] = status.bgcolor.split(".");
                        return (palette as any)[color]?.[shade];
                      },
                      color: ({ palette }) => {
                        const [color, shade] = status.typographyColor.split(".");
                        return (palette as any)[color]?.[shade];
                      },
                      borderRadius: BORDER_RADIUS_1,
                    }}
                  />
                );
              })() : (
                value ?? "-"
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
    </Fragment>
  );
};

export default withTableRowWrapper(FirewalTableRow);
