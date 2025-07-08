import { FC } from "react";
import { useParams } from "react-router-dom";
import { Paper, Stack, Typography, Chip, Divider } from "@mui/material";
import { Grid2 } from "@mui/material";
import { useGetApiMyProjectGetByIdQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { e2p } from "src/utils/e2p.utils";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { BoxRow } from "src/components/molecules/BoxRow";

type ProjectInfoPropsType = {};

export const ProjectInfo: FC<ProjectInfoPropsType> = () => {
  const { projectId } = useParams();
  
  const { data: projectData, isLoading } = useGetApiMyProjectGetByIdQuery({
    id: Number(projectId)!,
  });

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
            مشخصات پروژه
          </Typography>
          <Divider />
          <BoxRow
            title="نام پروژه"
            value={projectData?.name || "--"}
            isLoading={isLoading}
          />
          <BoxRow
            title="نوع پروژه"
            component={
              <Chip
                label={projectData?.isPublic ? "عمومی" : "خصوصی"}
                color={projectData?.isPublic ? "success" : "error"}
                sx={{ borderRadius: BORDER_RADIUS_1 }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="مرکز داده"
            value={projectData?.datacenterName || "--"}
            isLoading={isLoading}
          />
          <BoxRow
            title="تاریخ ایجاد"
            value={projectData?.createDate ? e2p(ConvertToJalali(projectData?.createDate)) : "--"}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
}; 