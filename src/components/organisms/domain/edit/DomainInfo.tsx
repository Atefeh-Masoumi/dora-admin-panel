import { FC, useMemo } from "react";
import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_1, BORDER_RADIUS_4 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router";
import { useGetApiMyDomainHostGetByIdQuery } from "src/app/services/api.generated";
import { BoxRow } from "src/components/molecules/BoxRow";

type DomainInfoPropsType = {};

export const DomainInfo: FC<DomainInfoPropsType> = () => {
  const { id } = useParams();

  const {
    data: domainData,
    isLoading: getDataLoading,
    isFetching: getDataFetching,
  } = useGetApiMyDomainHostGetByIdQuery({
    id: Number(id)!,
  });

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  const isActive = useMemo(
    () => domainData?.statusId === 2,
    [domainData?.statusId]
  );

  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{
            borderRadius: BORDER_RADIUS_4,
            p: { xs: 2.5 },
          }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            مشخصات دامنه
          </Typography>
          <Divider />
          <BoxRow
            title="Status"
            component={
              <Chip
                label={domainData?.status}
                sx={{
                  bgcolor: ({ palette }) =>
                    isActive ? palette.success.light : palette.error.light,
                  color: ({ palette }) =>
                    isActive ? palette.success.main : palette.error.main,
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Domain Name"
            component={
              <Chip
                label={domainData?.domainName}
                sx={{
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Register Email"
            value={domainData?.email}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={domainData?.createDate}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
