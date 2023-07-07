import { FC, Fragment } from "react";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { BORDER_RADIUS_1, BORDER_RADIUS_2 } from "src/configs/theme";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useGetPortalPanelDashboardBillShortListQuery } from "src/app/services/api.generated";
import EmptyTableSvg from "src/components/atoms/svg/EmptyTableSvg.svg";
import { useNavigate } from "react-router";
import moment from "jalali-moment";
import { priceToPersian } from "src/utils/priceToPersian";

export const ShortUserBill: FC = () => {
  const navigate = useNavigate();

  const { data: reports, isLoading } =
    useGetPortalPanelDashboardBillShortListQuery();

  return (
    <Stack
      component={Paper}
      sx={{
        width: { xs: "100%", md: "50%" },
        px: { xs: 1.8, lg: 2 },
        py: { xs: 1.8, lg: 2.25 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 1.3 }}
      >
        <Typography variant="text1" fontWeight={500} color="secondary">
          گزارش محاسبات
        </Typography>
        <Button color="secondary" href="/portal/bills">
          <Typography variant="text9">مشاهده همه</Typography>
        </Button>
      </Stack>
      <Divider sx={{ borderColor: "rgba(91, 104, 119, 0.1)", mb: 1.3 }} />
      <Stack
        rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {isLoading ? (
          <Stack spacing={1} p={1}>
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={60}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            ))}
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Fragment>
              {reports?.length === 0 ? (
                <Stack direction="row" justifyContent="center" py={5}>
                  <Stack spacing={2} alignItems="center">
                    <img
                      src={EmptyTableSvg}
                      alt="Empty Card"
                      style={{ maxWidth: "220px", maxHeight: "160px" }}
                    />
                    <Typography
                      variant="text12"
                      color="rgba(110, 118, 138, 0.6)"
                    >
                      در حال حاضر صورتحسابی وجود ندارد
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Fragment>
                  {reports?.map(({ id, billDate, totalPrice }) => {
                    const date = moment
                      .from(billDate || "", "fa", "YYYY/MM/DD HH:mm:ss")
                      .locale("fa")
                      .format("YYYY/MM/DD");

                    return (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        key={id}
                        sx={{
                          p: { xs: 1, md: 1 },
                          borderRadius: {
                            xs: BORDER_RADIUS_1,
                            md: BORDER_RADIUS_2,
                          },
                          bgcolor: "rgba(246, 247, 251, 1)",
                        }}
                      >
                        <Typography
                          fontSize={14}
                          color="rgba(19, 25, 32, 1)"
                          fontWeight={500}
                        >
                          {id}
                        </Typography>
                        <Typography
                          fontSize={14}
                          color="rgba(19, 25, 32, 1)"
                          fontWeight={500}
                        >
                          {date}
                        </Typography>
                        <Typography
                          fontSize={14}
                          color="rgba(19, 25, 32, 1)"
                          fontWeight={500}
                        >
                          {totalPrice && priceToPersian(totalPrice)}
                        </Typography>
                        <IconButton
                          onClick={() => navigate(`/portal/bill/${id}`)}
                        >
                          <KeyboardArrowLeftIcon color="secondary" />
                        </IconButton>
                      </Stack>
                    );
                  })}
                </Fragment>
              )}
            </Fragment>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
