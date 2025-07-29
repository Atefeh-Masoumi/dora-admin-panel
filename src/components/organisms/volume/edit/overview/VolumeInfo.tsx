import { FC, useMemo } from "react";
import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Grid2 } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useGetApiMyVmByProjectIdVolumeGetAndIdQuery } from "src/app/services/api.generated";
import { BoxRow } from "src/components/molecules/BoxRow";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";
import { e2p } from "src/utils/e2p.utils";

type VolumeInfoPropsType = {};

export const VolumeInfo: FC<VolumeInfoPropsType> = () => {
  const { blockstorageId, projectId } = useParams();

  const {
    data: volumeData,
    isLoading: getVolumeDataLoading,
    isFetching: getVolumeDataFetching,
  } = useGetApiMyVmByProjectIdVolumeGetAndIdQuery({
    id: Number(blockstorageId)!, 
    projectId: Number(projectId),
  });

  const isLoading = useMemo(
    () => getVolumeDataLoading || getVolumeDataFetching,
    [getVolumeDataFetching, getVolumeDataLoading]
  );

  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 size={{xs:12,md:10}}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{
            borderRadius: BORDER_RADIUS_1,
            p: { xs: 2.5 },
            height: "100%",
          }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            دیسک ابری
          </Typography>
          <Divider />
          <BoxRow
            title="وضعیت"
            component={
              <Chip
                label={e2p(serviceStatusIdentifier(volumeData?.statusId!).label)}
                sx={{
                  bgcolor: serviceStatusIdentifier(volumeData?.statusId!)
                    .bgColor,
                  color: serviceStatusIdentifier(volumeData?.statusId!)
                    .typographyColor,
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="نام دیسک"
            component={
              <Chip
                label={e2p(volumeData?.name || "")}
                sx={{
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="مرکز داده"
            value={volumeData?.datacenter}
            isLoading={isLoading}
          />
          <BoxRow
            title="حجم دیسک"
            value={volumeData?.size ? `${volumeData.size} GB` : "-"}
            isLoading={isLoading}
          />
          <BoxRow
            title="تاریخ ایجاد"
            value={volumeData?.createDate ? e2p(ConvertToJalali(String(volumeData?.createDate))) : "-"}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
