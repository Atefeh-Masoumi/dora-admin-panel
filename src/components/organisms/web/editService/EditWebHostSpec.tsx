import { FC, useMemo } from "react";
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { useNavigate, useParams } from "react-router";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useGetUserV2DomainGetByIdQuery, usePutUserV2DomainChangeContactMutation } from "src/app/services/api.generated";

type EditWebHostSpecPropsType = {};

export const EditWebHostSpec: FC<EditWebHostSpecPropsType> = () => {
  const { id } = useParams();

  const {
    data: domainData,
    isLoading: getDataLoading,
    isFetching: getDataFetching,
  } = useGetUserV2DomainGetByIdQuery({
    id: Number(id)!,
  });

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  const navigate = useNavigate();

  const [changeContactModel, { isLoading: loadEdit }] = usePutUserV2DomainChangeContactMutation();

  const submitHandler = () => {
    if (
      !id ||
      !domainData?.name ||
      !domainData?.country ||
      !domainData?.province ||
      !domainData?.city ||
      !domainData?.street ||
      !domainData?.postalCode ||
      !domainData?.voice ||
      !domainData?.email
    ) return;

    changeContactModel({
      changeContactModel: {
        id: parseInt(id),
        name: domainData?.name,
        country: domainData?.country,
        province: domainData?.province,
        city: domainData?.city,
        street: domainData?.street,
        postalCode: domainData?.postalCode,
        voice: domainData?.voice,
        email: domainData?.email,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("درخواست بازسای با موفیت ثبت شد");
        navigate("/dash/domain");
      });
    return;
  };

  return (
    <Grid2
      container
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >
      <Grid2 xs={12} md={8}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            تغییر اطلاعات دامنه
          </Typography>
          <Divider />

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={12} item sx={{ m: 2 }} spacing={1}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ px: 2 }}
              >
                <ExclamationMarkCircleSvg
                  sx={{
                    transform: "rotate(180deg)",
                    "&>path:first-of-type": {
                      opacity: 1,
                      stroke: ({ palette }) => palette.grey[700],
                      strokeWidth: 1,
                      fill: "transparent",
                    },
                  }}
                />
                <Typography
                  align="center"
                  sx={{ color: ({ palette }) => palette.grey[700] }}
                >
                  تغییر اطلاعات شاید کمی زمانبر باشد.
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ px: 2 }}
              >
                <ExclamationMarkCircleSvg
                  sx={{
                    transform: "rotate(180deg)",
                    "&>path:first-of-type": {
                      opacity: 1,
                      stroke: ({ palette }) => palette.grey[700],
                      strokeWidth: 1,
                      fill: "transparent",
                    },
                  }}
                />
                <Typography
                  align="center"
                  sx={{ color: ({ palette }) => palette.grey[700] }}
                >
                  بعد از تغییر، ایمیلی برای شما ارسال میگردد و بعد از تائید تغییر اعمال میگردد.
                </Typography>
              </Stack>
            </Grid>

            <Grid xs={12} container item sx={{ m: 2 }} spacing={1}>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.name}
                  sx={{ minWidth: 300 }}
                  label="نام و نام خانوادگی"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.country}
                  sx={{ minWidth: 300 }}
                  label="نام کشور"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                  placeholder="Iran"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.province}
                  sx={{ minWidth: 300 }}
                  label="نام استان"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                  placeholder="Tehran"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.city}
                  label="نام شهر"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                  placeholder="Tehran"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.street}
                  label="آدرس"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.postalCode}
                  sx={{ minWidth: 300 }}
                  label="کد پستی"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DorsaTextField
                  value={domainData?.voice}
                  sx={{ minWidth: 300 }}
                  label="تلفن"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                  placeholder="+9821________"
                />
              </Grid>
            </Grid>

            <Grid xs={12} item sx={{ m: 2 }} spacing={1}>
              <Stack alignItems="center" justifyContent="center">
                <LoadingButton
                  loading={isLoading || loadEdit}
                  variant="contained"
                  onClick={submitHandler}
                  sx={{ width: { xs: "100%", sm: "auto" }, px: { sm: 8 }, py: 2.1 }}
                >
                  ذخیره اطلاعات
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid2>
    </Grid2>

  );
};

