import type { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { usePostUserV2CdnZoneCreateMutation } from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import CloudConnectionSvg from "src/components/atoms/svg/CloudConnectionSvg";
import { useNavigate } from "react-router";
import { ContentCopyOutlined } from "@mui/icons-material";

type RecordsListPropsType = { zoneName: string };

export const RecordsList: FC<RecordsListPropsType> = ({ zoneName }) => {
  const navigate = useNavigate();

  const [createZone, { isLoading }] = usePostUserV2CdnZoneCreateMutation();

  const submit = () => {
    if (!zoneName) return;
    createZone({ createZoneModel: { zoneName } })
      .then(() => {
        toast.success("دامنه با موفقیت ایجاد شد");
        navigate("/dash/cdn");
      })
      .catch((res) => {
        if (res.status === 401 || res.status === 404) {
          toast.error("مشکلی پیش آمده");
        } else toast.error(res.data[""][0]);
      });
  };

  return (
    <Stack alignItems="center" spacing={1} px={{ xs: 2, md: 0 }}>
      <Stack borderRadius="100%" border="18px solid rgba(60, 138, 255, 0.04)">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "120px", md: "196px" },
            height: { xs: "120px", md: "196px" },
            borderRadius: "100%",
            backgroundColor: "rgba(60, 138, 255, 0.1)",
          }}
          p={4}
        >
          <CloudConnectionSvg
            sx={{ width: "100%", height: "100%" }}
            mode="fill"
          />
        </Stack>
      </Stack>
      <Typography variant="title5" fontWeight="700">
        لیست رکوردهایDNS
      </Typography>
      <Typography variant="text14" color="secondary" textAlign="center">
        برای فعال شدن سرویس خود باید NS دامنه خود را به NS های ابری زیر تغییر
        بدهید
      </Typography>
      <Stack color="secondary.main" spacing={1} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <DorsaTextField
            disabled
            value="asiatech.ns.dorsacloud.com"
            inputProps={{ dir: "ltr" }}
            sx={{ width: "280px", cursor: "pointer", py: 0, px: 0 }}
            InputProps={{
              endAdornment:
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText("asiatech.ns.dorsacloud.com");
                    toast.success("NS کپی شد", { position: "bottom-left" });
                  }}

                >
                  <ContentCopyOutlined />
                </Button>
            }}
          />
          <Typography>:NS 1</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <DorsaTextField
            disabled
            value="mobin.ns.dorsacloud.com"
            inputProps={{ dir: "ltr" }}
            sx={{ width: "280px", cursor: "pointer", py: 0, px: 0 }}
            InputProps={{
              endAdornment:
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText("mobin.ns.dorsacloud.com");
                    toast.success("NS کپی شد", { position: "bottom-left" });
                  }}

                >
                  <ContentCopyOutlined />
                </Button>
            }}
          />
          <Typography whiteSpace="nowrap">:NS 2</Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        width="100%"
        maxWidth={400}
      >
        <Button
          fullWidth
          variant="outlined"
          href="/dash/cdn"
          sx={{ py: 1.7, px: 5 }}
        >
          انصراف
        </Button>
        <LoadingButton
          onClick={submit}
          fullWidth
          variant="contained"
          sx={{ py: 1.7, px: 5 }}
          loading={isLoading}
        >
          ثبت دامنه
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
