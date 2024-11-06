import { FC } from "react";
import { Stack, Skeleton } from "@mui/material";

export const TextLoading: FC<{ num: number }> = ({ num }) => {
  return (
    <Stack direction="row" spacing={1}>
      {[...Array(num)].map((_, index) => (
        <Skeleton key={index} variant="circular" width={10} height={10} />
      ))}
    </Stack>
  );
};
