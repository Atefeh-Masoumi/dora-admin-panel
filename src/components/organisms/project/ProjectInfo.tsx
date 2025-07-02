import { FC } from "react";
import { useParams } from "react-router-dom";
import { Paper, Stack, Typography, Chip, Grid, Divider } from "@mui/material";
import { useGetApiMyProjectGetByIdQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { e2p } from "src/utils/e2p.utils";
import Moment from "src/utils/utils";
import { ConvertToJalali } from "src/utils/convertToJalali";
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
      <Grid container>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="stretch"
          width="100%"
        >
          <Grid item xs={12}>
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
              <Typography fontWeight="bold" fontSize={18}>
              </Typography>
              {/* <Divider /> */}
              {isLoading ? (
                <Typography>در حال بارگذاری...</Typography>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} display={"flex"} flexDirection={"column"}>
                    <Stack spacing={2}>
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
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={12} md={6} display={"flex"} flexDirection={"column"}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography fontWeight="bold">مرکز داده:</Typography>
                        <Typography>{projectData?.datacenterName || "--"}</Typography>
                      </Stack>
                      
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography fontWeight="bold">تاریخ ایجاد:</Typography>
                        <Typography>{projectData?.createDate ? e2p(ConvertToJalali(projectData?.createDate)) : "--"}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}; 