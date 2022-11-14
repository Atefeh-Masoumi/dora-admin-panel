import React, { Fragment, FC, useState, useEffect } from "react";
import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { UploadDialog } from "./UploadDialog";
import { DorsaChat } from "src/components/molecules/DorsaChat";
import {
  useGetApiV2PortalSupportItemListBySupportIdQuery,
  usePostApiV2PortalSupportItemCreateMutation,
} from "src/app/services/api.generated";
import { useParams } from "react-router-dom";
import { LoadingChat } from "src/components/organisms/support/LoadingChat";
import moment from "jalali-moment";

const Detail: FC = () => {
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [content, setContent] = useState("");

  const { id } = useParams();
  const { data: supportItems, isLoading } =
    useGetApiV2PortalSupportItemListBySupportIdQuery({
      supportId: parseInt(id as string),
    });

  console.log(supportItems);

  const [date, setDate] = useState("");
  useEffect(() => {
    if (!supportItems || !supportItems.supportDate) return;
    const m = moment
      .from(supportItems.supportDate, "fa", "YYYY/MM/DD HH:mm:ss")
      .locale("fa")
      .format("YYYY/MM/DD");
    setDate(m);
  }, [supportItems]);

  const [itemCreate] = usePostApiV2PortalSupportItemCreateMutation();
  const submit = () => {
    if (!id || !content) return;

    let formData = new FormData();
    formData.append("SupportId", id as string);
    formData.append("Content", content);
    // formData.append("Attachment", content);
    itemCreate({ body: formData as any })
      .unwrap()
      .then(() => setContent(""));
  };

  useEffect(() => {
    const el = document.getElementById("chat");
    if (el) el.scrollTop = el.scrollHeight;
  }, [supportItems]);

  const keyPress = (e: any) => {
    if (e.key !== "Enter") return;
    submit();
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
              <Typography variant="text9">
                آخرین بروزرسانی: ۱۹ روز پیش
              </Typography>
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
          <Stack spacing={2} overflow="scroll" maxHeight="600px" id="chat">
            {supportItems?.transaction?.map((item, index) => {
              return <DorsaChat key={index} message={item} />;
            })}
          </Stack>
        )}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <DorsaTextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => keyPress(e)}
            placeholder="متن پیام را بنویسید ..."
            fullWidth
            autoComplete="off"
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              onClick={handleOpen}
              variant="outlined"
              size="large"
              fullWidth
              sx={{ px: 5.5, py: { xs: 1, md: 1.5 }, whiteSpace: "nowrap" }}
            >
              بارگذاری پیوست
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ px: 3.5, py: { xs: 1, md: 1.5 }, whiteSpace: "nowrap" }}
              onClick={submit}
            >
              ارسال پیام
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <UploadDialog openDialog={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default Detail;
