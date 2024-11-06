import type { FC } from "react";
import { Skeleton, Stack } from "@mui/material";

const UserMessage: FC = () => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1.5}>
        <Skeleton variant="circular" width={50} height={50} />
        <Stack spacing={1} width="40%">
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const AdminMessage: FC = () => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1.5} width="100%" justifyContent="end">
        <Stack spacing={1} width="40%">
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
          />
        </Stack>
        <Skeleton variant="circular" width={50} height={50} />
      </Stack>
    </Stack>
  );
};

export const LoadingChat: FC = () => {
  return (
    <Stack spacing={3}>
      <UserMessage />
      <UserMessage />
      <AdminMessage />
      <UserMessage />
      <AdminMessage />
      <AdminMessage />
    </Stack>
  );
};
