import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "jalali-moment";
import { FC, Fragment } from "react";
import { useNavigate } from "react-router";
import { useGetApiMyPortalIssueShortListQuery } from "src/app/services/api.generated";
import EmptyTableSvg from "src/components/atoms/svg-icons/EmptyTableSvg.svg";
import { BORDER_RADIUS_1, BORDER_RADIUS_2 } from "src/configs/theme";
import { CustomTooltip } from "../portal/account/notification/tables/NotificationTableRow";
import { ConvertToJalali } from "src/utils/convertToJalali";

export const ShortTickets: FC = () => {
  const { data: tickets, isLoading } = useGetApiMyPortalIssueShortListQuery();

  const navigate = useNavigate();
  return (
    <Stack
      component={Paper}
      sx={{
        width: { xs: "100%", md: "50%" },
        px: { xs: 1.8, lg: 2 },
        py: { xs: 1.8, lg: 2.25 },
        borderRadius: BORDER_RADIUS_1,
        height: { xs: "80%", sm: "50%" },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 1.3 }}
      >
        <Typography variant="text1" fontWeight={500} color="secondary">
          تیکت های من
        </Typography>
        <Button color="secondary" onClick={() => navigate("/portal/supports")}>
          <Typography variant="text9">مشاهده همه</Typography>
        </Button>
      </Stack>
      <Divider sx={{ borderColor: "rgba(91, 104, 119, 0.1)", mb: 1 }} />
      <Stack rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}>
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
          <Fragment>
            {tickets?.length === 0 ? (
              <Stack direction="row" justifyContent="center" py={5}>
                <Stack spacing={2} alignItems="center">
                  <img
                    src={EmptyTableSvg}
                    alt="Empty Card"
                    style={{ maxWidth: "220px", maxHeight: "160px" }}
                  />
                  <Typography variant="text12" color="rgba(110, 118, 138, 0.6)">
                    در حال حاضر تیکت وجود ندارد
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Fragment>
                {tickets?.map(({ id, createDate, issueSubject }) => {
                  return (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      key={id}
                      sx={{
                        p: 1,
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
                        whiteSpace="nowrap"
                      >
                        {ConvertToJalali(String(createDate))}
                      </Typography>
                      <CustomTooltip title={issueSubject as any} arrow>
                        <Typography
                          fontSize={14}
                          color="rgba(19, 25, 32, 1)"
                          fontWeight={500}
                          sx={{
                            maxWidth: { xs: 150, md: 200 },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          whiteSpace="nowrap"
                        >
                          {issueSubject}
                        </Typography>
                      </CustomTooltip>
                      <IconButton
                        onClick={() => navigate(`/portal/support/${id}`)}
                      >
                        <KeyboardArrowLeftIcon color="secondary" />
                      </IconButton>
                    </Stack>
                  );
                })}
              </Fragment>
            )}
          </Fragment>
        )}
      </Stack>
    </Stack>
  );
};
