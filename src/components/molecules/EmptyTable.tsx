import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import EmptyTableSvg from "src/components/atoms/svg-icons/EmptyTableSvg.svg";

export const EmptyTable: FC<{ text: string }> = ({ text }) => {
  return (
    <Stack direction="row" justifyContent="center" py={5}>
      <Stack spacing={2} alignItems="center">
        <img
          src={EmptyTableSvg}
          alt="Empty Card"
          style={{ maxWidth: "220px", maxHeight: "160px" }}
        />
        <Typography variant="title5" color="rgba(110, 118, 138, 0.6)">
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};
