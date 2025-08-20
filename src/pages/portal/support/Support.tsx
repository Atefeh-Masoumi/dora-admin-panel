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
    const selectedFiles: File[] = Array.from(e.target.files || []);
    setFiles(selectedFiles);
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

  const submit = async () => {
    if (!id || !content) return;

    const attachments = files.length
      ? await Promise.all(files.map((f) => readFileAsBase64(f)))
      : [];

    const payload = {
      issueId: Number(id),
      content,
      attachments,
    } as any;

    itemCreate({ createIssueItemModel: payload })
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
                    // onClick={handleOpen}
                    component="label"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{
                      px: 5.5,
                      py: { xs: 1, md: 1.5 },
                      whiteSpace: "nowrap",
                    }}
                    disabled={files.length > 0}
                  >
                    {files.length === 0 ? (
                      <Typography>بارگذاری پیوست</Typography>
                    ) : (
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {files.length === 1
                          ? "1 فایل انتخاب شد"
                          : `${files.length} فایل انتخاب شد`} <Done />
                      </Typography>
                    )}
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
            </Stack>
          </Stack>
        )}
      </Stack>
      {/* <UploadDialog openDialog={open} handleClose={handleClose} /> */}
    </Fragment>
  );
};

export default Detail;
