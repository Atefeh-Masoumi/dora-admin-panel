import { Download } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "src/app/hooks";
import { IssueItemModel } from "src/app/services/api.generated";
import { baseUrl } from "src/app/services/baseQuery";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";

const downloadFileUrl = baseUrl + "/api/my/portal/issue-item/download/";

export const DorsaChat: FC<{ message: IssueItemModel }> = ({ message }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth?.accessToken);
  const userId = useAppSelector((state) => state.auth?.userId);

  const downloadFile = () => {
    if (!message || !message.id) return;

    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    setIsLoading(true);
    fetch(downloadFileUrl + message.id, {
      headers,
    })
      .then((response) => (response as any).blob())
      .then((blobby) => {
        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        let objectUrl = window.URL.createObjectURL(blobby);

        anchor.href = objectUrl;
        anchor.download = message.fileName || "";
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      })
      .finally(() => setIsLoading(false));
  };

  if (message.userId === userId) {
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
              borderRadius={BORDER_RADIUS_1}
              px={1}
              py={1.5}
              spacing={1.5}
            >
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="text9" fontWeight="bold">
                  {message.user}
                </Typography>
              </Stack>
              <Typography variant="text4">{message.content}</Typography>
              {message.fileName && (
                <Tooltip title={message.fileName}>
                  <LoadingButton
                    loading={isLoading}
                    onClick={downloadFile}
                    sx={{ color: "#fff", border: "1px solid #fff" }}
                    startIcon={
                      <Download
                        sx={{
                          "& path": {
                            color: "#fff",
                          },
                        }}
                      />
                    }
                  >
                    دانلود پیوست
                  </LoadingButton>
                </Tooltip>
              )}
            </Stack>
            <Stack direction="row" px={1}>
              <Typography variant="text9" color="rgba(110, 118, 138, 0.8)">
                {ConvertToJalali(String(message.issueDate))}
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
            borderRadius={BORDER_RADIUS_1}
            px={1}
            py={1.5}
            spacing={1.5}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              spacing={0.5}
            >
              <Typography variant="text9" fontWeight="bold">
                {message.user}
              </Typography>
              <Typography>|</Typography>
              <Typography variant="text9">ادمین</Typography>
            </Stack>
            <Typography variant="text4">{message.content}</Typography>
            {message.fileName && (
              <Tooltip title={message.fileName}>
                <LoadingButton
                  loading={isLoading}
                  onClick={downloadFile}
                  sx={{ border: "1px solid" }}
                  startIcon={
                    <Download
                      sx={{
                        "& path": {
                          stroke: ({ palette }) => palette.secondary.main,
                        },
                      }}
                    />
                  }
                >
                  دانلود پیوست
                </LoadingButton>
              </Tooltip>
            )}
          </Stack>
          <Stack direction="row" justifyContent="end" px={1}>
            <Typography variant="text9" color="rgba(110, 118, 138, 0.8)">
              {ConvertToJalali(String(message.issueDate))}
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
