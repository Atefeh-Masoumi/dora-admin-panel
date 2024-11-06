import { FC } from "react";
import { Stack, Skeleton, Typography } from "@mui/material";

type BoxRowPropsType = {
  title: string;
  value?: string | number | undefined | null;
  component?: any;
  isLoading: boolean;
};

export const BoxRow: FC<BoxRowPropsType> = ({
  title,
  value,
  component,
  isLoading,
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {isLoading ? (
        <Skeleton width={150} height={24} />
      ) : component ? (
        component
      ) : (
        <Typography
          sx={{ color: ({ palette }) => palette.grey[700], direction: "rtl" }}
        >
          {value || ""}
        </Typography>
      )}
      <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
        :{title}
      </Typography>
    </Stack>
  );
};
