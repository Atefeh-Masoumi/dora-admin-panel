import { Fragment, FC, useState, useEffect } from "react";
import { Button, Chip, Divider, Input, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingChat } from "src/components/organisms/portal/support/LoadingChat";
import { DorsaTooltip } from "src/components/organisms/portal/account/referral/WelcomeTooltip";
import { DorsaChat } from "src/components/molecules/DorsaChat";
import { supportStatusIdentifier } from "src/constant/supportStatusIdentifier";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { Done } from "@mui/icons-material";
import { ConvertToJalali } from "src/utils/convertToJalali";
import {
  useGetApiMyPortalIssueItemListByIssueIdQuery,
  usePostApiMyPortalIssueItemCreateMutation,
} from "src/app/services/api.generated";

const Detail: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const dropzoneOptions = { accept: "image/* , .pdf", multiple: true };
  const handleFileChange = (e: any) => {
    const selected = Array.from(e.target.files || []) as File[];
    if (!selected || selected.length === 0) return;
    const merged: File[] = [...files];
    selected.forEach((sf) => {
      const exists = merged.some(
        (f) => f.name === sf.name && f.size === sf.size && f.lastModified === sf.lastModified
      );
      if (!exists) merged.push(sf);
    });
    setFiles(merged);
    if (e?.target) e.target.value = ""; // allow re-selecting the same files
  };

  const removeFile = (fileToRemove: File) => {
    const remaining = files.filter(
      (f) => !(f.name === fileToRemove.name && f.size === fileToRemove.size && f.lastModified === fileToRemove.lastModified)
    );
    setFiles(remaining);
  };

  const [isDisableButton, setIsDisableButton] = useState<boolean>();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (files.length > 0 && content === "") setIsDisableButton(true);
    else setIsDisableButton(false);
  }, [content, files]);

  const { id } = useParams();
  const { data: issueItems, isLoading } =
    useGetApiMyPortalIssueItemListByIssueIdQuery({
      issueId: parseInt(id as string),
    });

  const [date, setDate] = useState("");

  useEffect(() => {
    if (!issueItems || !issueItems.createDate) return;
    setDate(ConvertToJalali(String(issueItems.createDate)));
  }, [issueItems]);

  useEffect(() => {
    const el = document.getElementById("chat");
    if (el) el.scrollTop = el.scrollHeight;
  }, [issueItems]);

  const [itemCreate, { isLoading: LoadingSend }] =
    usePostApiMyPortalIssueItemCreateMutation();

  const submit = async () => {
    if (!id || !content) return;

    const formData = new FormData();
    formData.append("issueId", id);
    formData.append("content", content);
    
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    itemCreate({ createIssueItemModel: formData as any })
      .unwrap()
      .then(() => {
        setContent("");
        setFiles([]);
      });
  };

  return (
    <Fragment>
      <Stack p={2} bgcolor="white" spacing={3} borderRadius={BORDER_RADIUS_1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          px={1}
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography variant="text1" fontWeight="700" whiteSpace="nowrap">
              {id} / {issueItems?.issueSubject}
            </Typography>
            <Stack direction="row" spacing={1} color="secondary">
              <Typography variant="text9">
                تاریخ ایجاد: {(String(date))}
              </Typography>
            </Stack>
          </Stack>
          <Chip
            label={supportStatusIdentifier(issueItems?.issueStatusId || 0).text}
            sx={{
              color: supportStatusIdentifier(issueItems?.issueStatusId || 0)
                .typographyColor,
              bgcolor: supportStatusIdentifier(issueItems?.issueStatusId || 0)
                .bgcolor,
              borderRadius: 1,
              fontSize: "14px",
              p: 0.5,
              py: 2.3,
            }}
          />
        </Stack>
        <Divider
          variant="middle"
          sx={{ my: 2, color: "rgba(110, 118, 138, 0.8)" }}
        />
        {/* Chat Part */}
        {isLoading ? (
          <LoadingChat />
        ) : (
          <Stack spacing={2} overflow="visible" id="chat">
            {issueItems?.issueItems?.map((item, index) => {
              return <DorsaChat key={index} message={item} />;
            })}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <DorsaTextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="متن پیام را بنویسید ..."
                fullWidth
                autoFocus
                autoComplete="off"
                multiline
                rows={4}
              />
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <DorsaTooltip
                  title={
                    <Stack>
                      <Typography>فرمت های مجاز jpg, png, jpeg, pdf</Typography>
                      <Typography>حداکثر حجم فایل: 2 مگابایت</Typography>
                    </Stack>
                  }
                  arrow
                >
                  <Button
                    component="label"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{
                      px: 5.5,
                      py: { xs: 1, md: 1.5 },
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography>بارگذاری پیوست</Typography>
                    <Input
                      inputProps={{ ...dropzoneOptions }}
                      onChange={handleFileChange}
                      sx={{ display: "none" }}
                      type="file"
                    />
                  </Button>
                </DorsaTooltip>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ px: 3.5, py: { xs: 1, md: 1.5 }, whiteSpace: "nowrap" }}
                  onClick={submit}
                  disabled={isDisableButton}
                  loading={LoadingSend}
                >
                  ارسال پیام
                </LoadingButton>
              </Stack>
              {files.length > 0 && (
                <Stack direction="row" flexWrap="wrap" gap={1} width="100%">
                  {files.map((f, idx) => (
                    <Chip key={`${f.name}-${f.size}-${f.lastModified}-${idx}`} label={f.name} onDelete={() => removeFile(f)} />
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
      {/* <UploadDialog openDialog={open} handleClose={handleClose} /> */}
    </Fragment>
  );
};

export default Detail;
