import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { BlurBackdrop } from "../atoms/BlurBackdrop";

type DeleteDialogPropsType = DialogProps & {
  keyTitle: string;
  subTitle: string;
  securityPhrase: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  submitLoading: boolean;
};

export const DeleteDialog: FC<DeleteDialogPropsType> = ({
  keyTitle,
  subTitle,
  securityPhrase,
  onSubmit,
  submitLoading,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (props.open) return;
    setInputValue("");
  }, [props.open]);

  const canDelete = useMemo(
    () => inputValue === securityPhrase,
    [inputValue, securityPhrase]
  );

  const inputOnChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setInputValue(event.target.value);
  };

  const copyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("متن با موفقیت کپی شد");
        })
        .catch((err) => {});
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      successful ?? toast.success("متن با موفقیت کپی شد");
    } catch (err) {
      toast.warning(err as string);
    }
    document.body.removeChild(textArea);
  };

  const onCloseButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
    setInputValue("");
  };

  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick") return;
  };

  return (
    <Dialog
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
      {...{
        ...props,
        onClose: handleClose,
      }}
    >
      <DialogTitle textAlign="center">{`حذف ${keyTitle}`}</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack direction="column" rowGap={3}>
          <DialogContentText textAlign="center">{subTitle}</DialogContentText>
          <Alert variant="filled" severity="warning">
            <AlertTitle>اخطار!</AlertTitle>
            <Typography>
              {`توجه داشته باشید در صورت حذف ${keyTitle} مورد نظر، امکان بازگرداندن ${keyTitle} وجود ندارد.`}
            </Typography>
          </Alert>
          <Box width="100%">
            <Typography gutterBottom>نام {keyTitle}</Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: BORDER_RADIUS_1,
              }}
            >
              <Tooltip title={securityPhrase}>
                <Typography
                  pl={1.2}
                  maxWidth={{ xs: "60%", md: "80%" }}
                  textOverflow="ellipsis"
                  noWrap
                >
                  {securityPhrase}
                </Typography>
              </Tooltip>
              <Button
                variant="contained"
                onClick={() => copyText(securityPhrase)}
              >
                کپی کردن
              </Button>
            </Stack>
          </Box>
          <Stack direction="column">
            <Typography gutterBottom>محل وارد کردن نام {keyTitle}</Typography>
            <TextField
              onChange={inputOnChange}
              value={inputValue}
              size="small"
              placeholder="نام سرویس را وارد کنید"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          width="90%"
          direction="row"
          alignItems="center"
          columnGap={2}
          sx={{ margin: "10px auto" }}
        >
          <LoadingButton
            disabled={!canDelete}
            variant="contained"
            color="error"
            sx={{ width: 260 }}
            onClick={onSubmit}
            loading={submitLoading}
          >
            {`حذف ${keyTitle}`}
          </LoadingButton>
          <Button
            variant="text"
            color="error"
            sx={{ width: 260 }}
            onClick={onCloseButtonClick}
          >
            انصراف
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
