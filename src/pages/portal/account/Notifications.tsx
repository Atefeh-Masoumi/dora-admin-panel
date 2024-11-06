import type { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { notificationTableStruct } from "src/components/organisms/portal/account/notification/tables/struct";
import NotificationTableRow from "src/components/organisms/portal/account/notification/tables/NotificationTableRow";
import { useGetApiMyAccountNotificationListQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const Notification: FC = () => {
  const { data: notifications, isLoading } =
    useGetApiMyAccountNotificationListQuery();

  return (
    <Stack
      borderRadius={BORDER_RADIUS_1}
      bgcolor="white"
      p={{ xs: 1.8, lg: 3 }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="text1" color="secondary" whiteSpace="nowrap">
          لیست پیام ها
        </Typography>
      </Stack>
      <Divider
        variant="middle"
        sx={{ my: 2, color: "rgba(110, 118, 138, 0.8)" }}
      />
      <Stack>
        <BaseTable
          struct={notificationTableStruct}
          RowComponent={NotificationTableRow}
          rows={notifications as any}
          text="در حال حاضر پیامی وجود ندارد"
          isLoading={isLoading}
          initialOrder={0}
        />
      </Stack>
    </Stack>
  );
};

export default Notification;
