import { FC, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddUserSvg from "src/components/atoms/svg-icons/AddUser";
import { Copy } from "src/components/atoms/svg-icons/CopySvg";
import { Share } from "src/components/atoms/svg-icons/ShareSvg";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ShareDialog } from "./ShareDialog";
import { WelcomeTooltip } from "./WelcomeTooltip";
import { useGetApiMyPortalReferralGetQuery } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const InviteCode: FC = () => {
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

  const { data: referralData, isLoading } = useGetApiMyPortalReferralGetQuery();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      borderRadius={BORDER_RADIUS_1}
      bgcolor="white"
      px={{ xs: 1.8, lg: 3 }}
      py={{ xs: 1.8, lg: 5 }}
      width={"100%"}
    >
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
      <Grid alignItems={"center"} justifyContent={"center"} mb={3}>
        <Typography color="secondary" textAlign={"center"}>
          با استفاده از این کد می‌توانید دوستان خود را به ابر درسا دعوت کنید
          <WelcomeTooltip />
        </Typography>
      </Grid>

      <Grid alignItems="center" width="100%">
        <Stack
          direction="row"
          // spacing={{ xs: 0, md: 1.5 }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          // px={1}
          // mb={1}
        >
          {isLoading ? (
            <Stack direction="row" spacing={1}>
              <Skeleton
                variant="rectangular"
                // height={45}
                // width={150}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            </Stack>
          ) : (
            <DorsaTextField
              defaultValue={referralData?.referralCode}
              InputProps={{ readOnly: true }}
              // sx={{
              //   maxWidth: { xs: "143px", md: "200px" },
              //   width: "150px",
              // }}
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
        {/* <Stack
          direction="row"
          spacing={{ xs: 0, md: 1.5 }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          px={1}
        >
          <Typography color="secondary" variant="text2" whiteSpace="nowrap">
            لینک معرف
          </Typography>
          {isLoading ? (
            <Stack direction="row" spacing={1}>
              <Skeleton
                variant="rectangular"
                height={45}
                width={150}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            </Stack>
          ) : (
            <DorsaTextField
              defaultValue={referralData?.referralLink}
              InputProps={{ readOnly: true }}
              sx={{
                maxWidth: { xs: "143px", md: "200px" },
                width: "150px",
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
        </Stack> */}
      </Grid>

      <ShareDialog code={code} openDialog={open} handleClose={handleClose} />
    </Grid>
  );
};
