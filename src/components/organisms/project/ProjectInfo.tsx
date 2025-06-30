import { FC } from "react";
import { useParams } from "react-router-dom";
import { Paper, Stack, Typography, Chip } from "@mui/material";
import { useGetApiMyProjectGetByIdQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { e2p } from "src/utils/e2p.utils";
type ProjectInfoPropsType = {};

export const ProjectInfo: FC<ProjectInfoPropsType> = () => {
  const { projectId } = useParams();
  
  const { data: projectData, isLoading } = useGetApiMyProjectGetByIdQuery({
    id: Number(projectId)!,
  });

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        مشخصات پروژه
      </Typography>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        {isLoading ? (
          <Typography>در حال بارگذاری...</Typography>
        ) : (
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontWeight="bold">نام پروژه:</Typography>
              <Typography>{projectData?.name || "--"}</Typography>
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontWeight="bold">نوع پروژه:</Typography>
              <Chip
                label={projectData?.isPublic ? "عمومی" : "خصوصی"}
                color={projectData?.isPublic ? "success" : "error"}
                sx={{ borderRadius: BORDER_RADIUS_1 }}
              />
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontWeight="bold">مرکز داده:</Typography>
              <Typography>{projectData?.datacenterName || "--"}</Typography>
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontWeight="bold">تاریخ ایجاد:</Typography>
              <Typography>{projectData?.createDate ? e2p(projectData?.createDate) : "--"}</Typography>
            </Stack>
          </Stack>
        )}
      </Paper>
    </>
  );
}; 