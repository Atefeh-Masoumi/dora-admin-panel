import { FC, useEffect, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { SupportItemTransactionModel } from "src/app/services/api.generated";
import { Document } from "src/components/atoms/svg/DocumentSvg";

export const DorsaChat: FC<{ message: SupportItemTransactionModel }> = ({
  message,
}) => {
  const getBase64FileExtension = (base64String: string) => {
    switch (base64String.charAt(0)) {
      case "/":
        return "jpeg";
      case "i":
        return "png";
      case "R":
        return "gif";
      case "U":
        return "webp";
      case "J":
        return "pdf";
      default:
        return "unknown";
    }
  };

  const [fileType, setFileType] = useState("");
  useEffect(() => {
    if (!message.fileName) return;
    setFileType(getBase64FileExtension(message.fileName as string));
  }, [message]);
  const fileHref = `data:image/${fileType};base64,${message.fileName}`;

  if (message.user === "پشتیبانی درسا") {
    return (
      <Stack spacing={1}>
        <Stack direction="row" spacing={1.5}>
          <Avatar
            sx={{
              width: { xs: "22px", md: "52px" },
              height: { xs: "22px", md: "52px" },
              bgcolor: "primary.main",
            }}
            src="/broken-image.jpg"
          />
          <Stack spacing={1}>
            <Stack
              bgcolor="primary.main"
              color="white"
              borderRadius={2}
              px={1}
              py={1.5}
              spacing={1.5}
            >
              <Stack direction="row" spacing={0.5}>
                <Typography variant="text9" fontWeight="bold">
                  {message.user}
                </Typography>
                <Typography>|</Typography>
                {/* <Typography variant="text9">{message.person.role}</Typography> */}
                <Typography variant="text9">ادمین</Typography>
              </Stack>
              <Typography variant="text4">{message.content}</Typography>
            </Stack>
            <Stack direction="row" px={1}>
              <Typography variant="text9" color="rgba(110, 118, 138, 0.8)">
                {message.supportDate}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack alignItems="end" spacing={1}>
      <Stack direction="row" spacing={1.5}>
        <Stack spacing={1}>
          <Stack
            bgcolor="rgba(110, 118, 138, 0.06)"
            color="secondary"
            borderRadius={2}
            px={1}
            py={1.5}
            spacing={1.5}
          >
            <Stack direction="row" justifyContent="end" spacing={0.5}>
              <Typography variant="text9" fontWeight="bold">
                {message.user}
              </Typography>
              <Typography>|</Typography>
              {/* <Typography variant="text9">{message.person.role}</Typography> */}
              <Typography variant="text9">کاربر</Typography>
            </Stack>
            <Stack>
              <Typography component="pre" variant="text4">
                {message.content}
              </Typography>
              {message.fileSize && (
                <Button
                  href={fileHref}
                  target="_blank"
                  component="a"
                  download={fileHref}
                  variant="text"
                  startIcon={
                    <Document
                      sx={{
                        "& path": {
                          stroke: ({ palette }) => palette.secondary.main,
                        },
                      }}
                    />
                  }
                  sx={{ width: "fit-content", py: 0, lineHeight: "" }}
                >
                  {/* دانلود پیوست {message.attachment} */}
                  دانلود پیوست screenshot.png
                </Button>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="end" px={1}>
            <Typography variant="text9" color="rgba(110, 118, 138, 0.8)">
              {message.supportDate}
            </Typography>
          </Stack>
        </Stack>
        <Avatar
          sx={{
            width: { xs: "22px", md: "52px" },
            height: { xs: "22px", md: "52px" },
            bgcolor: "secondary.main",
          }}
          src="/broken-image.jpg"
        />
      </Stack>
    </Stack>
  );
};
