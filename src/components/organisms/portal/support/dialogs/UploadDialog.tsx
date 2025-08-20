import { FC, useMemo, useRef, useState } from "react";
import { Button, Stack, Typography, Dialog } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import Dropzone from "src/components/molecules/Dropzone";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostApiMyPortalIssueItemCreateMutation } from "src/app/services/api.generated";
import { useParams } from "react-router-dom";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type HeaderPropsType = {
  openDialog: boolean;
  handleClose: () => void;
};

export const UploadDialog: FC<HeaderPropsType> = ({
  openDialog,
  handleClose,
}) => {
  const { id } = useParams();

  const [itemCreate] = usePostApiMyPortalIssueItemCreateMutation();

  const [filesSelected, setFilesSelected] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [content, setContent] = useState("");

  const fileInput = useRef<HTMLInputElement | null>(null);

  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async () => {
    if (filesSelected.length > 0) setUploading(true);
    else if (fileInput.current) fileInput.current.click();

    if (!id || !content || filesSelected.length === 0) return;

    const attachments = await Promise.all(
      filesSelected.map((f) => readFileAsBase64(f))
    );

    const payload = {
      issueId: Number(id),
      content,
      attachments,
    } as any;

    itemCreate({ createIssueItemModel: payload })
      .unwrap()
      .then(() => {
        setContent("");
        handleClose();
      })
      .finally(() => setUploading(false));
  };

  const onClose = () => {
    setUploading(false);
    setFilesSelected([]);
    handleClose();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
    >
      <Stack sx={{ boxShadow: 24, px: 3, py: 3 }} spacing={3}>
        <Typography variant="text1" fontWeight="bold">
          بارگذاری پیوست
        </Typography>
        <Stack spacing={1.5}>
          <Dropzone
            setFiles={(files: File[]) => setFilesSelected(files)}
            ref={fileInput}
            uploading={uploading}
            files={filesSelected}
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
            {filesSelected.length === 0 ? " انتخاب فایل" : "ارسال پیام"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
