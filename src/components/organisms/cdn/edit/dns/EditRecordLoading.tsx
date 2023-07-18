import { Skeleton, Stack } from "@mui/material";
import { FC } from "react";

export const EditRecordLoading: FC = () => {
  return (
    <Stack
      rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}
      justifyContent="space-between"
      px={1}
      pt={3}
    >
      <Stack spacing={2} p={1}>
        <Stack direction="row" spacing={1}>
          {[...Array(2)].map((_, index) => (
            <Stack width="50%" key={index}>
              <Skeleton
                variant="rectangular"
                height={55}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            </Stack>
          ))}
        </Stack>
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={55}
            sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
          />
        ))}
        <Skeleton
          variant="rectangular"
          height={60}
          sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
        />
        <Stack direction="row" justifyContent="end" spacing={1}>
          {[...Array(2)].map((_, index) => (
            <Stack width="30%" key={index}>
              <Skeleton
                variant="rectangular"
                height={55}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
