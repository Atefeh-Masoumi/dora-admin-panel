import { Fragment, FC, useState, useEffect } from "react";
import { Button, Chip, Divider, Input, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import moment from "jalali-moment";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingChat } from "src/components/organisms/cloud/support/LoadingChat";
import { DorsaTooltip } from "src/components/organisms/cloud/referral/WelcomeTooltip";
import { DorsaChat } from "src/components/molecules/DorsaChat";
import {
  useGetApiCloudSupportItemListBySupportIdQuery,
  usePostApiCloudSupportItemCreateMutation,
} from "src/app/services/api.generated";

const Detail: FC = () => {
  const [file, setFile] = useState<string | Blob>();
  const dropzoneOptions = { accept: "image/* , .pdf", multiple: true };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const [isDisableButton, setIsDisableButton] = useState<boolean>();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (file && content === "") setIsDisableButton(true);
    else setIsDisableButton(false);
  }, [content, file]);

  const { id } = useParams();
  const { data: supportItems, isLoading } =
    useGetApiCloudSupportItemListBySupportIdQuery({
      supportId: parseInt(id as string),
    });

  const [date, setDate] = useState("");

  useEffect(() => {
    if (!supportItems || !supportItems.supportDate) return;
    const m = moment
      .from(supportItems.supportDate, "fa", "YYYY/MM/DD HH:mm:ss")
      .locale("fa")
      .format("YYYY/MM/DD ساعت: HH:mm");
    setDate(m);
  }, [supportItems]);

  useEffect(() => {
    const el = document.getElementById("chat");
    if (el) el.scrollTop = el.scrollHeight;
  }, [supportItems]);

  const [itemCreate, { isLoading: LoadingSend }] =
    usePostApiCloudSupportItemCreateMutation();
  const submit = () => {
    if (!id || !content) return;

    let formData = new FormData();
    formData.append("SupportId", id as string);
    formData.append("Content", content);
    formData.append("Attachment", file as Blob);
    itemCreate({ body: formData as any })
      .unwrap()
      .then(() => {
        setContent("");
        setFile(undefined);
      });
  };

  return (
    <Fragment>
      <Stack p={2} bgcolor="white" spacing={3} borderRadius={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          px={1}
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography variant="text1" fontWeight="700" whiteSpace="nowrap">
              {id} / {supportItems?.supportSubject}
            </Typography>
            <Stack direction="row" spacing={1} color="secondary">
              <Typography variant="text9">تاریخ ایجاد: {date}</Typography>
              {/* <Typography variant="text9">
                آخرین بروزرسانی: ۱۹ روز پیش
              </Typography> */}
            </Stack>
          </Stack>
          <Chip
            label={
              supportItems?.supportStatusId === 1
                ? "در انتظار پاسخ"
                : supportItems?.supportStatusId === 2
                ? "پاسخ داده شده"
                : "تکمیل شده"
            }
            sx={{
              color:
                supportItems?.supportStatusId === 1
                  ? "rgba(255, 147, 68, 1)"
                  : "rgba(13, 191, 102, 1)",
              backgroundColor:
                supportItems?.supportStatusId === 1
                  ? "rgba(255, 233, 218, 1)"
                  : "rgba(218, 246, 232, 1)",
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
            {supportItems?.transaction?.map((item, index) => {
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
                rows={3}
              />
              <Stack direction="row" spacing={1} alignItems="center">
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
            </Stack>
          </Stack>
        )}
      </Stack>
      {/* <UploadDialog openDialog={open} handleClose={handleClose} /> */}
    </Fragment>
  );
};

export default Detail;
