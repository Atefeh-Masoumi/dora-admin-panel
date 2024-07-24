import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type ServiceSpecificationsPropsType = {
  resourceList?: any[];
  masterResourceList?: any[];
};

const ServiceSpecifications: FC<ServiceSpecificationsPropsType> = ({
  resourceList,
  masterResourceList,
}) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <Paper
      elevation={0}
      sx={{
        direction: "ltr !important",
        bgcolor: "#FBFCFF",
        border: "1px solid #DCE7FD",
        borderRadius: BORDER_RADIUS_1,
        p: { xs: 2, md: 2.5, lg: 3 },
        flexGrow: 1,
        // height: { xs: "auto", md: "659px" },
      }}
    >
      <Box sx={{ mb: 6.9 }}>
        <Typography
          variant="title5"
          sx={{ mb: 1.5 }}
          fontWeight={700}
          align="center"
          color={({ palette }) => palette.secondary.main}
        >
          مشخصات سرویس مورد نظر را انتخاب کنید
        </Typography>
        <Typography
          variant="button1"
          align="center"
          color={({ palette }) => palette.grey[700]}
        >
          بعد از ایجاد سرویس می توانید مشخصات سرویس مورد نیاز خود را تغییر دهید.
        </Typography>
      </Box>
      <Stack rowGap={{ xs: 3, md: 7.4 }}>
        {resourceList?.map(
          ({ name, value, onChange, min, max, step }, index) => (
            <Stack
              key={index}
              direction={{ xs: "column-reverse", md: "row" }}
              rowGap={5}
              columnGap={4}
              alignItems="end"
            >
              <ReverseSlider
                value={value}
                valueLabelDisplay="on"
                onChange={(_, value) => onChange(value as number)}
                min={min}
                max={max}
                step={step}
              />
              <Typography
                color={({ palette }) => palette.grey[700]}
                sx={{ width: "125px" }}
                align="right"
              >
                {name}
              </Typography>
            </Stack>
          )
        )}
        {Number(tab) === 2 && (
          <>
            <Typography>
              مشخصات نودهای مستر توسط کاربر قابل تغییر نیست
            </Typography>
            <Divider />
            {masterResourceList?.map(
              ({ name, value, disabled, min, max, step }, index) => (
                <Stack
                  key={index}
                  direction={{ xs: "column-reverse", md: "row" }}
                  rowGap={5}
                  columnGap={4}
                  alignItems="end"
                >
                  <ReverseSlider
                    value={value}
                    valueLabelDisplay="on"
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                  />
                  <Typography
                    color={({ palette }) => palette.grey[700]}
                    sx={{ width: "125px" }}
                    align="right"
                  >
                    {name}
                  </Typography>
                </Stack>
              )
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default ServiceSpecifications;
