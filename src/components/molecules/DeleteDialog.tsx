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
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type DeleteDialogPropsType = DialogProps & {
  keyTitle: string;
  subjectTitle?: string;
  subTitle: string;
  securityPhrase: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  submitLoading: boolean;
};

const useStyles = makeStyles(() => ({
  input: {
    textAlign: "left",
    "&::placeholder": {
      textAlign: "right",
    },
  },
}));

export const DeleteDialog: FC<DeleteDialogPropsType> = ({
  keyTitle,
  subTitle,
  subjectTitle = "نام",
  securityPhrase,
  onSubmit,
  submitLoading,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");

  const classes = useStyles();

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
          // toast.success("متن با موفقیت کپی شد");
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
            <Typography fontSize={14}>
              {`توجه داشته باشید در صورت حذف ${keyTitle} مورد نظر، امکان بازگردانی وجود ندارد.`}
            </Typography>
          </Alert>
          <Box width="100%">
            <Typography gutterBottom>
              {subjectTitle} {keyTitle}
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: BORDER_RADIUS_1,
                padding: "8px",
              }}
            >
              <IconButton onClick={() => copyText(securityPhrase)}>
                <ContentCopyIcon />
              </IconButton>
              <Tooltip title={securityPhrase}>
                <Typography
                  pl={1.2}
                  maxWidth={{ xs: "60%", md: "80%" }}
                  mr={1}
                  textOverflow="ellipsis"
                  noWrap
                >
                  {securityPhrase}
                </Typography>
              </Tooltip>
            </Stack>
          </Box>
          <Stack direction="column">
            <Typography gutterBottom>
              محل وارد کردن {subjectTitle} {keyTitle}
            </Typography>
            <TextField
              onChange={inputOnChange}
              value={inputValue}
              size="small"
              placeholder="نام سرویس را وارد کنید"
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
              InputLabelProps={{
                shrink: true,
                dir: "ltr",
              }}
              dir="ltr"
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
            {/* {`حذف ${keyTitle}`} */}
            حذف
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
