import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { useGetApiMyAccountCustomerUserListQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { AccessibilityTableRow } from "./table/AccessibilityTableRow";
import { accessibilityTableStruct } from "./table/accessibilityTableStruct";
import { CreateUserAccessModal } from "./dialog/CreateUserAccessModal";
import { EditUserAccessModal } from "./dialog/EditUserAccessModal";

export const AccessibilitySetting: FC = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const { data: customerUserList, isLoading: customerUserListLoading } =
    useGetApiMyAccountCustomerUserListQuery();

  return (
    <>
      {customerUserListLoading && <PageLoading />}
      <Stack
        borderRadius={BORDER_RADIUS_1}
        bgcolor="white"
        p={{ xs: 1.8, lg: 3 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "start", md: "center" }}
            width="100%"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="text1" color="secondary" whiteSpace="nowrap">
              لیست دسترسی‌ها
            </Typography>
          </Stack>
          <Button
            onClick={() => setCreateModalIsOpen(true)}
            variant="outlined"
            sx={{ width: "200px" }}
          >
            افزودن کاربر
          </Button>
        </Stack>
        <Divider variant="middle" sx={{ my: 2 }} />
        <Stack>
          <Box sx={{ overflowX: "auto" }}>
            <BaseTable
              struct={accessibilityTableStruct}
              RowComponent={AccessibilityTableRow}
              rows={customerUserList as any[]}
              text="در حال حاضر سطح دسترسی ایجاد نشده است"
              isLoading={customerUserListLoading}
              initialOrder={1}
            />
          </Box>
        </Stack>
      </Stack>
      <CreateUserAccessModal
        dialogProps={{
          open: createModalIsOpen,
          onClose: () => setCreateModalIsOpen(false),
        }}
        forceClose={() => setCreateModalIsOpen(false)}
      />
    </>
  );
};
