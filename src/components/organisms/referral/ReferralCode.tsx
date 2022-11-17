import { FC, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostApiV2PortalReferralJoinMutation } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

export const ReferralCode: FC = () => {
  const [joinReferral, { isLoading }] =
    usePostApiV2PortalReferralJoinMutation();

  const [referralCode, setReferralCode] = useState("");

  const submit = () =>
    joinReferral({ joinReferralModel: { referralCode } })
      .unwrap()
      .then(() => toast.success("کد با موفقیت ثبت شد"));

  return (
    <Stack
      direction="row"
      justifyContent="center"
      borderRadius={2}
      bgcolor="#3C8AFF"
      color="white"
      px={{ xs: 1.8, lg: 3 }}
      py={{ xs: 1.8, lg: 5 }}
    >
      <Stack direction="column" spacing={1.5} alignItems="center" px={2.5}>
        <Stack direction="column" spacing={0.7} alignItems="center">
          <Typography variant="title5">معرف شما</Typography>
          <Typography variant="text2" textAlign="center">
            کد دعوت فردی که شما را به درسا کلود دعوت کرده را می‌توانید در کادر
            زیر وارد کنید.
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            width={{ xs: "100%", md: "fit-content" }}
          >
            <Typography variant="text2" whiteSpace="nowrap">
              کد معرف:
            </Typography>
            <DorsaTextField
              onChange={(e) => setReferralCode(e.target.value)}
              mode="white"
              sx={{ width: "100%" }}
              inputProps={{ dir: "ltr" }}
            />
          </Stack>
          <LoadingButton
            sx={{
              px: 4,
              py: 1.4,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#fff" },
              width: { xs: "100%", md: "fit-content" },
            }}
            loading={isLoading}
            onClick={submit}
          >
            ثبت
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
