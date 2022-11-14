import { FC, useRef, useState } from "react";
import { Button, Stack, Typography, Dialog } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import Dropzone from "src/components/molecules/Dropzone";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostApiV2PortalSupportItemCreateMutation } from "src/app/services/api.generated";
import { useParams } from "react-router";

type HeaderPropsType = {
  openDialog: boolean;
  handleClose: () => void;
};

export const UploadDialog: FC<HeaderPropsType> = ({
  openDialog,
  handleClose,
}) => {
  const { id } = useParams();

  const [itemCreate] = usePostApiV2PortalSupportItemCreateMutation();

  const [fileSelected, setFileSelected] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const [content, setContent] = useState("");

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onSubmit = () => {
    if (fileSelected) setUploading(true);
    else if (fileInput.current) fileInput.current.click();

    if (!id || !content || !fileSelected) return;
    let formData = new FormData();
    formData.append("SupportId", id as string);
    formData.append("Content", content);
    formData.append("Attachment", fileSelected);
    itemCreate({ body: formData as any })
      .unwrap()
      .then(() => {
        setContent("");
        handleClose();
      });
  };

  const onClose = () => {
    setUploading(false);
    setFileSelected(undefined);
    handleClose();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: 2.5 } }}
    >
      <Stack sx={{ boxShadow: 24, px: 3, py: 3 }} spacing={3}>
        <Typography variant="text1" fontWeight="bold">
          بارگذاری پیوست
        </Typography>
        <Stack spacing={1.5}>
          <Dropzone
            setFile={(file: File) => setFileSelected(file)}
            ref={fileInput}
            uploading={uploading}
            file={fileSelected}
            percent={12}
          />
          <DorsaTextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="عنوان"
            fullWidth
            autoComplete="off"
            multiline
            maxRows={3}
            autoFocus
          />
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 3, py: 0.8 }}
            onClick={onClose}
          >
            انصراف
          </Button>
          <Button
            onClick={onSubmit}
            variant="contained"
            component="label"
            sx={{ px: 3, py: 0.8 }}
          >
            {!fileSelected ? " انتخاب فایل" : "ارسال پیام"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
