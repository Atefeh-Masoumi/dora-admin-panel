import { Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  CustomerUserListResponse,
  useDeleteApiMyAccountCustomerUserDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
// import { EditUserAccessModal } from "../dialog/EditUserAccessModal";
import { accessibilityTableStruct } from "./accessibilityTableStruct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const AccessibilityTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedCustomerUser, setSelectedCustomerUser] = useState<CustomerUserListResponse | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const settingOnClick = (row: any) => {
    setUserId(row.userId);
    setUserName(row.userName);
    setEditModalIsOpen(true);
  };

  const [deleteCustomerUser, { isLoading: deleteCustomerUserLoading }] =
    useDeleteApiMyAccountCustomerUserDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteCustomerUser({ id: selectedCustomerUser?.id! })
      .unwrap()
      .then(() => {
        toast.success("دسترسی کاربر با موفقیت حذف شد.");
        closeDialogHandler();
      })
      .catch((err: any) => { });

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedCustomerUser(null);
  };

  const handleOpenDelete = (customerUser: CustomerUserListResponse) => {
    setSelectedCustomerUser(customerUser);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  function handleChip(name: string, row: any) {
    switch (name) {
      case "isSuperManager":
        return (
          <Chip
            clickable={false}
            label={row.isSuperManager ? "فعال" : "غیرفعال"}
            sx={{
              bgcolor: row.isSuperManager ? "success.light" : "error.light",
              color: row.isSuperManager ? "success.main" : "error.main",
              py: 2.2,
              borderRadius: BORDER_RADIUS_1,
              fontSize: "14px",
            }}
          />
        );
      case "isActive":
        return (
          <Chip
            clickable={false}
            label={row.isActive ? "فعال" : "غیرفعال"}
            sx={{
              bgcolor: row.isActive ? "success.light" : "error.light",
              color: row.isActive ? "success.main" : "error.main",
              py: 2.2,
              borderRadius: BORDER_RADIUS_1,
              fontSize: "14px",
            }}
          />
        );
      case "isFinancialManager":
        return (
          <Chip
            clickable={false}
            label={row.isFinancialManager ? "فعال" : "غیرفعال"}
            sx={{
              bgcolor: row.isFinancialManager ? "success.light" : "error.light",
              color: row.isFinancialManager ? "success.main" : "error.main",
              py: 2.2,
              borderRadius: BORDER_RADIUS_1,
              fontSize: "14px",
            }}
          />
        );
    }
  }
  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {accessibilityTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ whiteSpace: "nowrap", minWidth: 100 }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={() => settingOnClick(row)}
                  >
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  {column.id === "isSuperManager" ||
                    column.id === "isActive" ||
                    column.id === "isFinancialManager" ? (
                    <>{handleChip(column.id, row)}</>
                  ) : (
                    text || "-"
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="دسترسی کاربر"
        subTitle="برای حذف دسترسی کاربر, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedCustomerUser?.phoneNumber || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteCustomerUserLoading}
      />
      {/* <EditUserAccessModal
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        forceClose={() => setEditModalIsOpen(false)}
        userId={userId as string}
        userName={userName as string}
        maxWidth="md"
      /> */}
    </>
  );
};

export default withTableRowWrapper(AccessibilityTableRow);
