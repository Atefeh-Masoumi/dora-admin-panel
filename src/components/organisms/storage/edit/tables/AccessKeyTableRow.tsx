import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  StorageUserListResponse,
  useDeleteApiMyStorageUserDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { accessKeyTableStruct } from "./AccessKeyStruct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const AccessKeyTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedAccessKey, setSelectedAccessKey] =
    useState<StorageUserListResponse | null>(null);
  const [showSecretKey, setShowSecretKey] = useState(true);

  const handleShowSecretKeyOnClick = () => {
    setShowSecretKey(!showSecretKey);
  };

  const handleCopySecretKeyOnClick = () => {
    if (!row.secretKey) return;
    navigator.clipboard.writeText(row.secretKey).then(() => {
      toast.success("secretKey با موفقیت کپی شد");
    });
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedAccessKey(null);
  };

  const handleOpenDelete = (accessKey: StorageUserListResponse) => {
    setSelectedAccessKey(accessKey);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const [DeleteAccessKey, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyStorageUserDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    DeleteAccessKey({ id: Number(selectedAccessKey?.id) })
      .unwrap()
      .then(() => {
        toast.success(" کلید دسترسی با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {accessKeyTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "secretKey" ? (
                <OutlinedInput
                  color="secondary"
                  disabled
                  type={showSecretKey ? "password" : "text"}
                  defaultValue={text}
                  size="small"
                  margin="none"
                  inputProps={{
                    style: { paddingLeft: "8px", paddingRight: "0px" },
                  }}
                  sx={{
                    fontSize: "12px",
                    "& .MuiInputBase-root": {},
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary !important",
                      borderWidth: "1px !important",
                    },
                    "& .MuiOutlinedInput-input": {
                      WebkitTextFillColor: "black !important",
                    },
                    minWidth: "200px",
                  }}
                  startAdornment={
                    <>
                      <InputAdornment
                        onClick={handleCopySecretKeyOnClick}
                        position="start"
                      >
                        <IconButton
                          sx={{
                            padding: 0,
                            "& .button": {
                              padding: 0,
                            },
                          }}
                        >
                          {<ContentCopyIcon />}
                        </IconButton>
                      </InputAdornment>
                      <InputAdornment
                        onClick={handleShowSecretKeyOnClick}
                        position="start"
                      >
                        <IconButton
                          sx={{
                            padding: 0,
                            "& .button": {
                              padding: 0,
                            },
                          }}
                        >
                          {showSecretKey ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    </>
                  }
                />
              ) : (
                <>{text}</>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="کلید دسترسی"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedAccessKey?.accessKey || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </>
  );
};
