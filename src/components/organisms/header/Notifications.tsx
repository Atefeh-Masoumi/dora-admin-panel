import { FC, Fragment, useState } from "react";
import {
  Badge,
  Button,
  ClickAwayListener,
  createTheme,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetApiCloudNotificationShortListQuery } from "src/app/services/api.generated";
import { EmptyNotificationSvg } from "src/components/atoms/svg/EmptyNotifSvg";
import NotificationSvg from "src/components/atoms/svg/NotificationSvg";

export const Notifications: FC = () => {
  const { data: notifications, isLoading } =
    useGetApiCloudNotificationShortListQuery();

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => setOpen(false);

  const handleTooltipOpen = () => setOpen(!open);

  const theme = useTheme();

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        componentsProps={{
          popper: {
            sx: {
              "& .MuiTooltip-tooltip": {
                background: "rgba(32, 32, 32, 1)",
                borderRadius: 3,
                minWidth: "330px",
              },
              "& .MuiTooltip-arrow::before": { color: "rgba(32, 32, 32, 1)" },
            },
          },
        }}
        title={
          <Fragment>
            {isLoading ? (
              <Stack spacing={1} p={1}>
                <Skeleton
                  variant="rectangular"
                  height={60}
                  sx={{ bgcolor: "secondary.main", borderRadius: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={60}
                  sx={{ bgcolor: "secondary.main", borderRadius: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={30}
                  sx={{ bgcolor: "secondary.main", borderRadius: 1.2 }}
                />
              </Stack>
            ) : (
              <Fragment>
                {notifications ? (
                  <Fragment>
                    <Stack py={1}>
                      <ThemeProvider
                        theme={createTheme({
                          ...theme,
                          palette: {
                            mode: "dark",
                            secondary: theme.palette.secondary,
                          },
                        })}
                      >
                        <MenuList
                          sx={{
                            backgroundColor: "rgba(32, 32, 32, 1)",
                            maxWidth: 330,
                          }}
                        >
                          {notifications.map((notification) => (
                            <MenuItem
                              key={notification.id}
                              sx={{ cursor: "default", borderRadius: 2 }}
                            >
                              <Stack key={notification.id} spacing={1}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                >
                                  <Typography variant="text15" fontWeight={500}>
                                    {notification.subject}
                                  </Typography>
                                  <Typography variant="text8">
                                    {notification.notificationDate}
                                  </Typography>
                                </Stack>
                                <Stack>
                                  <Typography
                                    variant="text9"
                                    sx={{ whiteSpace: "initial" }}
                                  >
                                    {notification.content}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ThemeProvider>
                    </Stack>
                    <Divider sx={{ borderColor: "secondary.light" }} />
                    <Button
                      fullWidth
                      sx={{ color: "white" }}
                      href="/portal/notifications"
                    >
                      نمایش تمام پیام ها
                    </Button>
                  </Fragment>
                ) : (
                  <Stack alignItems="center" py={1.7}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: { xs: "100px", md: "170px" },
                        height: { xs: "100px", md: "170px" },
                      }}
                      p={1}
                      pb={0}
                    >
                      <EmptyNotificationSvg
                        sx={{ width: "100%", height: "100%" }}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="text13">
                        صندوق پیام شما خالی است
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Fragment>
            )}
          </Fragment>
        }
        arrow
      >
        <IconButton
          sx={{
            border: 1,
            borderRadius: { xs: 62, lg: 8 },
            borderColor: "rgba(110, 118, 138, 0.16)",
          }}
          onClick={handleTooltipOpen}
        >
          <Badge
            color="primary"
            variant="dot"
            overlap="circular"
            badgeContent={notifications?.length}
            sx={{ "& .MuiBadge-badge": { ml: 0.5, mt: 0.5 } }}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <NotificationSvg />
          </Badge>
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
};
