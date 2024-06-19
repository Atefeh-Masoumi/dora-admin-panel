import {
  Box,
  Button,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { GiftDialog } from "../portal/financial/payment/dialog/GiftDialog";
import { useGetApiMyPortalReferralGetQuery } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { Copy } from "src/components/atoms/svg-icons/CopySvg";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { WelcomeTooltip } from "../portal/account/referral/WelcomeTooltip";

export const GiftAndReferral: FC = () => {
  const [giftCodeOpen, setGiftCodeOpen] = useState(false);

  const handleCloseGiftDialog = () => setGiftCodeOpen(false);
  const { data: referralData, isLoading } = useGetApiMyPortalReferralGetQuery();

  return (
    <Fragment>
      <Grid
        container
        columnSpacing={{ md: "16px" }}
        rowSpacing={{ xs: "24px", lg: "16px" }}
      >
        <Grid item xs={12} md={6}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height={"100%"}
            px={3}
            py={2}
            bgcolor={"white"}
            borderRadius={BORDER_RADIUS_1}
          >
            <Typography color="secondary" variant="text2" whiteSpace="nowrap">
              کد هدیه دارید؟
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setGiftCodeOpen(true)}
            >
              ثبت کد هدیه
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Grid
              container
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={2}
              bgcolor={"white"}
              borderRadius={BORDER_RADIUS_1}
            >
              <Grid item xs={12} sm={6}>
                <Stack direction="row">
                  <Typography color="secondary" fontSize={14}>
                    با دعوت دوستان خود تخفیف بگیرید
                  </Typography>
                  <Box display={{ xs: "none", md: "flex" }}>
                    <WelcomeTooltip />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  {isLoading ? (
                    <Stack direction="row" spacing={1}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                      />
                    </Stack>
                  ) : (
                    <DorsaTextField
                      defaultValue={referralData?.referralCode}
                      InputProps={{ readOnly: true }}
                      inputProps={{ dir: "rtl" }}
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      backgroundColor: "#F6F7F8",
                      padding: "7px 0",
                      position: "relative",
                      right: "5px",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
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
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <GiftDialog
        openDialog={giftCodeOpen}
        handleClose={handleCloseGiftDialog}
      />
    </Fragment>
  );
};
