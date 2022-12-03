import { FC, useState } from "react";
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import AddUserSvg from "src/components/atoms/svg/AddUser";
import { Copy } from "src/components/atoms/svg/CopySvg";
import { Share } from "src/components/atoms/svg/ShareSvg";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ShareDialog } from "./ShareDialog";
import { WelcomeTooltip } from "./WelcomeTooltip";
import { useGetUserV2PortalReferralGetQuery } from "src/app/services/api.generated";
import { toast } from "react-toastify";

export const InviteCode: FC = () => {
  const { data: referralData, isLoading } = useGetUserV2PortalReferralGetQuery();

  const [code, setCode] = useState<string | undefined | null>();
  const handleOpen = () => {
    if (!code) return;
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setCode(null);
    setOpen(false);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      borderRadius={2}
      bgcolor="white"
      px={{ xs: 1.8, lg: 3 }}
      py={{ xs: 1.8, lg: 5 }}
    >
      <Stack direction="column" spacing={2} alignItems="center">
        <Box borderRadius="100%" border="18px solid rgba(60, 138, 255, 0.04)">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: { xs: "120px", md: "196px" },
              height: { xs: "120px", md: "196px" },
              borderRadius: "100%",
              backgroundColor: "rgba(60, 138, 255, 0.08)",
            }}
            p={3}
          >
            <AddUserSvg
              sx={{ width: "100%", height: "100%", color: "primary.main" }}
            />
          </Stack>
        </Box>
        <Stack direction="column" spacing={0.7} alignItems="center">
          <Typography variant="title5">کد معرف شما</Typography>
          <Stack direction="row">
            <Typography color="secondary" variant="text2">
              با استفاده از این کد می‌توانید دوستان خود را به ابر درسا دعوت کنید
            </Typography>
            <Box display={{ xs: "none", md: "flex" }}>
              <WelcomeTooltip />
            </Box>
          </Stack>
        </Stack>
        <Stack alignItems="center" width="100%">
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={{ xs: 0, md: 1.5 }}
              alignItems="center"
              justifyContent="end"
              width="100%"
              px={1}
            >
              <Typography color="secondary" variant="text2" whiteSpace="nowrap">
                کد معرف شما:
              </Typography>
              {isLoading ? (
                <Stack direction="row" spacing={1}>
                  <Skeleton
                    variant="rectangular"
                    height={45}
                    width={200}
                    sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                  />
                </Stack>
              ) : (
                <DorsaTextField
                  defaultValue={referralData?.referralCode}
                  InputProps={{ readOnly: true }}
                  sx={{
                    maxWidth: { xs: "143px", md: "200px" },
                    width: "200px",
                  }}
                  inputProps={{ dir: "ltr" }}
                />
              )}
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    referralData?.referralCode as string
                  );
                  toast.success("کد کپی شد", { position: "bottom-left" });
                }}
              >
                <Copy
                  sx={{
                    "& path": {
                      stroke: ({ palette }) => palette.secondary.main,
                    },
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setCode(referralData?.referralCode);
                  handleOpen();
                }}
              >
                <Share
                  sx={{
                    "& path": {
                      stroke: ({ palette }) => palette.secondary.main,
                    },
                  }}
                />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              spacing={{ xs: 0, md: 1.5 }}
              alignItems="center"
              justifyContent="end"
              width="100%"
              px={1}
            >
              <Typography color="secondary" variant="text2" whiteSpace="nowrap">
                لینک معرف:
              </Typography>
              {isLoading ? (
                <Stack direction="row" spacing={1}>
                  <Skeleton
                    variant="rectangular"
                    height={45}
                    width={200}
                    sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                  />
                </Stack>
              ) : (
                <DorsaTextField
                  defaultValue={referralData?.referralLink}
                  InputProps={{ readOnly: true }}
                  sx={{
                    maxWidth: { xs: "143px", md: "200px" },
                    width: "200px",
                  }}
                  inputProps={{ dir: "ltr" }}
                />
              )}
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    referralData?.referralLink as string
                  );
                  toast.success("کد کپی شد", { position: "bottom-left" });
                }}
              >
                <Copy
                  sx={{
                    "& path": {
                      stroke: ({ palette }) => palette.secondary.main,
                    },
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setCode(referralData?.referralLink);
                  handleOpen();
                }}
              >
                <Share
                  sx={{
                    "& path": {
                      stroke: ({ palette }) => palette.secondary.main,
                    },
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <ShareDialog code={code} openDialog={open} handleClose={handleClose} />
    </Stack>
  );
};
