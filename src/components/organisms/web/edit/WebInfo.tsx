import { FC, useMemo } from "react";
import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useGetApiMyWebHostGetByIdQuery } from "src/app/services/api.generated";
import { BoxRow } from "src/components/molecules/BoxRow";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";

type WebInfoPropsType = {};

export const WebInfo: FC<WebInfoPropsType> = () => {
  const { id } = useParams();

  const {
    data: storageData,
    isLoading: getStorageDataLoading,
    isFetching: getStorageDataFetching,
  } = useGetApiMyWebHostGetByIdQuery({
    id: Number(id)!,
  });

  const isLoading = useMemo(
    () => getStorageDataLoading || getStorageDataFetching,
    [getStorageDataFetching, getStorageDataLoading]
  );  

  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12} md={10}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_1, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            هاستینگ وب ابری
          </Typography>
          <Divider />
          <BoxRow
            title="Status"
            component={
              <Chip
                label={serviceStatusIdentifier(storageData?.statusId!).label}
                sx={{
                  bgcolor: serviceStatusIdentifier(storageData?.statusId!)
                    .bgColor,
                  color: serviceStatusIdentifier(storageData?.statusId!)
                    .typographyColor,
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
                label={storageData?.domainName}
                sx={{
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="DataCenter"
            value={storageData?.datacenter}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={ConvertToJalali(String(storageData?.createDate))}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
