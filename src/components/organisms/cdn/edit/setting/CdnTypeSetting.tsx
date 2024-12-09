import { FC } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import CloudSvg from "src/components/atoms/svg-icons/CloudSvg.svg";
import { toast } from "react-toastify";
import PageLoading from "src/components/atoms/PageLoading";
import { usePutApiMyDnsCdnHostChangeCdnTypeMutation } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const radioItems = [
  {
    value: 1,
    title: "غیر رمزنگاری شده - HTTP",
    text: "پروتکل ارتباط بازدید‌کننده با سرورهای CDN به صورت غیر رمزنگاری شده خواهد بود.",
  },
  {
    value: 2,
    title: "ارتباط رمزنگاری شده با ابر (HTTPS-HTTP)",
    text: "پروتکل ارتباطی بازدیدکننده با سرورهای CDN به صورت TLS رمزنگاری میشود.",
  },
  {
    value: 3,
    title: "ارتباط رمزنگاری شده با ابر و از ابر با سرور اصلی (HTTPS-HTTPS)",
    text: "پروتکل ارتباطی بازدیدکننده با سرورهای CDN و از CDN با سرور اصلی به صورت TLS رمزنگاری میشود.",
  },
];

type CdnTypeSettingPropsType = {
  zoneTypeId: number;
  loading: boolean;
  dnsId: number;
};

export const CdnTypeSetting: FC<CdnTypeSettingPropsType> = ({
  zoneTypeId,
  loading,
  dnsId,
}) => {
  const [changeCdnType, { isLoading: loadingChange }] =
    usePutApiMyDnsCdnHostChangeCdnTypeMutation();
  const onChangeZoneType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zoneTypeId = +event.target.value;
    changeCdnType({
      changeCdnTypeModel: {
        id: dnsId,
        cdnHostTypeId: zoneTypeId,
      },
    }).then(() => {
      toast.success("بروزرسانی پروتکل ارتباطی انجام شد");
    });
  };

  return (
    <>
      {loadingChange && <PageLoading />}
      <Stack
        bgcolor="white"
        direction="row"
        justifyContent="center"
        sx={{ py: 2, px: 3, borderRadius: BORDER_RADIUS_1 }}
      >
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Stack>
            <Stack>
              <Typography
                variant="text1"
                fontWeight="bold"
                sx={{ paddingInlineStart: 1 }}
              >
                پروتکل ارتباطی بازدیدکننده با سرورهای راهبر و سرورهای اصلی کاربر
              </Typography>
              <Typography variant="text15" color="secondary">
                با تنظیم این گزینه می‌توانید شیوه‌ی ارتباط بین سرورهای CDN و
                کاربران خود را مشخص کنید.
              </Typography>
            </Stack>
            {loading ? (
              <Stack spacing={1} py={1.5}>
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={50}
                    sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                  />
                ))}
              </Stack>
            ) : (
              <Stack color="secondary">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={zoneTypeId}
                    onChange={onChangeZoneType}
                  >
                    <Stack py={3} spacing={3}>
                      {radioItems.map(({ value: val, title, text }, index) => (
                        <Stack
                          direction="row"
                          alignItems="start"
                          key={index}
                          spacing={1}
                          sx={{
                            "& .MuiRadio-root": { p: 0 },
                            "& .MuiFormControlLabel-root": { m: 0 },
                          }}
                        >
                          <FormControlLabel
                            value={val}
                            control={<Radio />}
                            label=""
                          />
                          <Stack
                            color={
                              zoneTypeId === val
                                ? "primary.main"
                                : "secondary.main"
                            }
                          >
                            <Typography variant="text14" fontWeight="bold">
                              {title}
                            </Typography>
                            <Typography variant="text13">{text}</Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            )}
          </Stack>

          <Stack
            px={5}
            justifyContent="center"
            display={{ xs: "none", md: "flex" }}
          >
            <img src={CloudSvg} alt="Cloud" />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
