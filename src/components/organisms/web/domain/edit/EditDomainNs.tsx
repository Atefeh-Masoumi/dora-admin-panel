import { FC, useEffect, useMemo, useState } from "react";
import { Divider, Paper, Grid, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import {
  useGetApiMyDomainHostGetByIdQuery,
  usePutApiMyDomainHostChangeNsMutation,
} from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";

type EditDomainNsPropsType = {};

export const EditDomainNs: FC<EditDomainNsPropsType> = () => {
  const [nameServer1, setNameServer1] = useState("");
  const [nameServer2, setNameServer2] = useState("");
  const { id } = useParams();

  const {
    data: domainData,
    isLoading: getDataLoading,
    isFetching: getDataFetching,
  } = useGetApiMyDomainHostGetByIdQuery({
    id: Number(id)!,
  });

  useEffect(() => {
    if (!nameServer1) {
      setNameServer1(domainData?.ns1 || "");
    }
  }, [domainData?.ns1, nameServer1]);
  useEffect(() => {
    if (!nameServer2) {
      setNameServer2(domainData?.ns2 || "");
    }
  }, [domainData?.ns2, nameServer2]);

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  const navigate = useNavigate();

  const [changeNsModel, { isLoading: loadEdit }] =
    usePutApiMyDomainHostChangeNsMutation();

  const submitHandler = () => {
    if (
      !id ||
      !nameServer1 ||
      !nameServer2 ||
      (domainData?.ns1 === nameServer1 && domainData?.ns2 === nameServer2)
    )
      return;

    changeNsModel({
      changeNsModel: {
        id: parseInt(id),
        ns1: nameServer1,
        ns2: nameServer2,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("درخواست با موفقیت انجام شد");
        navigate("/domain");
      });
    return;
  };

  const nameServer1OnChange = (event: any) => {
    setNameServer1(event.target.value);
  };
  const nameServer2OnChange = (event: any) => {
    setNameServer2(event.target.value);
  };

  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 } }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            تغییر Name Server دامنه
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
                  تغییر NS کمی زمانبر است.
                </Typography>
              </Stack>
            </Grid>

            <Grid
              xs={12}
              container
              item
              sx={{ m: 2 }}
              gap={2}
              justifyContent="space-evenly"
            >
              <Grid item xs={12} lg={5.5}>
                <DorsaTextField
                  value={nameServer1}
                  onChange={nameServer1OnChange}
                  label="Name Server 1"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={5.5}>
                <DorsaTextField
                  value={nameServer2}
                  onChange={nameServer2OnChange}
                  label="Name Server 2"
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} item sx={{ m: 2 }} spacing={1}>
              <Stack alignItems="center" justifyContent="center">
                <LoadingButton
                  loading={isLoading || loadEdit}
                  variant="contained"
                  onClick={submitHandler}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                  }}
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
