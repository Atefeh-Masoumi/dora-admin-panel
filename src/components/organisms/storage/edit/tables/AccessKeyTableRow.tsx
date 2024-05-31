import { FC, useState } from "react";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { accessKeyTableStruct } from "./AccessKeyStruct";
import { DeleteAccessKeyDialog } from "../dialogs/DeleteAccessKeyDialog";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

export const AccessKeyTableRow: FC<{ row: any }> = ({ row }) => {
  const [showSecretKey, setShowSecretKey] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleShowSecretKeyOnClick = () => {
    setShowSecretKey(!showSecretKey);
  };

  const handleCopySecretKeyOnClick = () => {
    if (!row.secretKey) return;
    navigator.clipboard.writeText(row.secretKey).then(() => {
      toast.success("secretKey با موفقیت کپی شد");
    });
  };

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
                    onClick={handleOpenDelete}
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
      <DeleteAccessKeyDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};
