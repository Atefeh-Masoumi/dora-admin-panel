import type { FC } from "react";
import {
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { notificationTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(32, 32, 32, 1)",
    minWidth: "fit-content",
    color: "#fff",
    fontSize: "14px",
    // borderRadius: "24px",
    padding: "16px",

    "& .MuiTooltip-arrow::before": {
      color: "rgba(32, 32, 32, 1)",
    },
  },
}));

const NotificationTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      {notificationTableStruct.map((column) => {
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
            {column.id === "content" ? (
              <CustomTooltip title={text} arrow>
                <Stack direction="row" justifyContent="center">
                  <Typography
                    sx={{
                      maxWidth: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: 14,
                    }}
                  >
                    {text}
                  </Typography>
                </Stack>
              </CustomTooltip>
            ) : (
              text
            )}
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};

export default withTableRowWrapper(NotificationTableRow);
