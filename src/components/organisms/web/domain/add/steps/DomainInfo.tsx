import { FC, useContext, ChangeEvent } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { AddDomainContext } from "src/components/organisms/web/domain/add/contexts/AddContext";

type DomainInfoPropsType = {};

export const DomainInfo: FC<DomainInfoPropsType> = () => {
  const {
    name,
    setName,
    country,
    setCountry,
    province,
    setProvince,
    city,
    setCity,
    street,
    setStreet,
    postalCode,
    setPostalCode,
    voice,
    setVoice,
    ns1,
    setNs1,
    ns2,
    setNs2,
    autoRenewal,
    setAutoRenewal,
    activeCdn,
    setActiveCdn,
  } = useContext(AddDomainContext);

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

  const countryInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setCountry(e.target.value);

  const provinceInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setProvince(e.target.value);

  const cityInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setCity(e.target.value);

  const streetInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setStreet(e.target.value);

  const postalCodeInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPostalCode(e.target.value);

  const voiceInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setVoice(e.target.value);

  const ns1InputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setNs1(e.target.value);

  const ns2InputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setNs2(e.target.value);

  const autoRenewalInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setAutoRenewal(e.target.checked);

  const activeCdnInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setActiveCdn(e.target.checked);

  return (
    <Box sx={{ spacing: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={12} lg={6} item sx={{ m: 2 }} spacing={1}>
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
              بعد از ایجاد سرویس امکان تغییر مشخصات وجود دارد.
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
              فرم زیر را به لاتین (انگلیسی) تکمیل نمایید.
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
              بعد از پرداخت ایمیل به منظور تائید ارسال میشود.
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} lg={6} container item sx={{ m: 2 }} spacing={1}>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={name}
              onChange={nameInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="نام و نام خانوادگی"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={country}
              onChange={countryInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="نام کشور"
              fullWidth
              inputProps={{ dir: "ltr" }}
              placeholder="Iran"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={province}
              onChange={provinceInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="نام استان"
              fullWidth
              inputProps={{ dir: "ltr" }}
              placeholder="Tehran"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={city}
              onChange={cityInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="نام شهر"
              fullWidth
              inputProps={{ dir: "ltr" }}
              placeholder="Tehran"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={street}
              onChange={streetInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="آدرس"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={postalCode}
              onChange={postalCodeInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="کد پستی"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={voice}
              onChange={voiceInputChangeHandler}
              sx={{ minWidth: 300 }}
              label="تلفن"
              fullWidth
              inputProps={{ dir: "ltr" }}
              placeholder="+9821________"
            />
          </Grid>
        </Grid>

        <Grid xs={12} lg={6} container item sx={{ m: 2 }} spacing={1}>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={ns1}
              onChange={ns1InputChangeHandler}
              sx={{ minWidth: 300 }}
              label="Name Server 1"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DorsaTextField
              value={ns2}
              onChange={ns2InputChangeHandler}
              sx={{ minWidth: 300 }}
              label="Name Server 2"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
        </Grid>

        <Grid xs={12} lg={6} container item sx={{ m: 2 }} spacing={1}>
          <Grid item xs={12}>
            <FormControlLabel
              color="secondary.main"
              label="تمدید خودکار"
              control={
                <Checkbox
                  value={autoRenewal}
                  checked={autoRenewal}
                  sx={{ p: 0, borderRadius: 0 }}
                  onChange={autoRenewalInputChangeHandler}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              color="secondary.main"
              label="ایجاد سرویس CDN و DNS"
              control={
                <Checkbox
                  value={activeCdn}
                  checked={activeCdn}
                  sx={{ p: 0, borderRadius: 0 }}
                  onChange={activeCdnInputChangeHandler}
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
