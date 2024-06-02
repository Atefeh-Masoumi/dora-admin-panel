import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useGetApiMyPortalWalletGetBalanceQuery } from "src/app/services/api.generated";
import { DepositDialog } from "src/components/organisms/portal/financial/payment/dialog/DepositDialog";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const Balance: FC = () => {
  const handleDeposit = () => setOpenDeposit(true);
  const [openDeposit, setOpenDeposit] = useState(false);
  const closeDeposit = () => setOpenDeposit(false);

  const { data: balance, isLoading: loadingBalance } =
    useGetApiMyPortalWalletGetBalanceQuery();
  const separateBalance = balance
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        md="auto"
        sx={{
          width: { xs: "100%", md: 300 },
          height: { xs: 220, md: 300 },
          bgcolor: "white",
          borderRadius: { xs: BORDER_RADIUS_1, lg: BORDER_RADIUS_1 },
          px: { xs: 1.5, lg: 2 },
          py: { xs: 2, lg: 2.5 },
        }}
      >
        <Typography
          variant="text1"
          color="secondary"
          sx={{ py: 1, pb: { xs: 0, md: 2 } }}
        >
          کیف پول
        </Typography>
        <Divider
          sx={{
            borderColor: "rgba(110, 118, 138, 0.08)",
            mb: { xs: 2, md: 4.3 },
          }}
        />
        <Stack spacing={1.5} pt={{ xs: 0, md: 1 }}>
          <Typography fontSize={16} align="center" color="primary">
            موجودی کیف پول شما
          </Typography>
          <Stack direction="row" justifyContent="center">
            {loadingBalance ? (
              <Stack width={30}>
                <LinearProgress />
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                color="secondary.main"
              >
                <Typography
                  sx={{ direction: "rtl" }}
                  fontSize={24}
                  fontWeight={700}
                >
                  {balance === 0 ? "صفر" : separateBalance}
                </Typography>
                <Typography fontSize={18}>ریال</Typography>
              </Stack>
            )}
          </Stack>
          <Stack pt={{ xs: 0, md: 2 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ py: 1.5 }}
              onClick={handleDeposit}
            >
              افزایش موجودی
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <DepositDialog openDialog={openDeposit} handleClose={closeDeposit} />
    </Fragment>
  );
};
