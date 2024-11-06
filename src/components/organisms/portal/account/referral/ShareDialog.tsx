import type { FC } from "react";
import { Box, Button, Stack, Typography, Dialog, Grid } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { Instagram } from "src/components/atoms/svg-icons/InstagramSvg";
import { Message } from "src/components/atoms/svg-icons/MessageSvg";
import { Telegram } from "src/components/atoms/svg-icons/TelegramSvg";
import { Twitter } from "src/components/atoms/svg-icons/TwitterSvg";
import { Whatsapp } from "src/components/atoms/svg-icons/WhatsappSvg";

type HeaderPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  code?: string | null;
};

const icons = [
  { name: "whatsapp", component: Whatsapp, bgcolor: "rgba(37, 211, 102, 1)" },
  { name: "telegram", component: Telegram, bgcolor: "rgba(0, 136, 204, 1)" },
  { name: "instagram", component: Instagram, bgcolor: "rgba(240, 0, 115, 1)" },
  { name: "twitter", component: Twitter, bgcolor: "rgba(29, 161, 242, 1)" },
  { name: "email", component: Message, bgcolor: "" },
];

export const ShareDialog: FC<HeaderPropsType> = ({
  openDialog,
  handleClose,
  code,
}) => {
  const sendCode = (name: string) => {
    if (!code || code === undefined) return;
    let url = "";
    if (name === "whatsapp") {
      url = `https://web.whatsapp.com/send?&text=${encodeURI(
        code
      )}&app_absent=0`;
    }
    if (name === "telegram") url = `https://t.me/share/url?url=${code}`;
    if (name === "twitter")
      url = `https://twitter.com/intent/tweet?text=${code}`;
    if (name === "email")
      url = `mailto:?subject=${code}&amp;body=https://google.com`;
    if (name === "instagram") return;
    return window.open(url);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      components={{ Backdrop: BlurBackdrop }}
    >
      <Stack sx={{ px: 2, py: 3 }} spacing={2}>
        <Typography variant="text1" fontWeight="bold">
          اشتراک گذاری با دوستان
        </Typography>
        <Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {icons.map(({ name, component: IconComponent, bgcolor }, index) => (
              <Grid item sm={12 / 5} xs={4} key={index}>
                <Button sx={{ p: 0 }} onClick={() => sendCode(name)}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      p: 2,
                      bgcolor,
                      borderRadius: 1,
                      border: bgcolor === "" ? "1px solid #ccc" : "",
                    }}
                  >
                    <IconComponent sx={{ height: "40px", width: "40px" }} />
                  </Stack>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Stack direction="row" justifyContent="end" py={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 3, py: 0.8 }}
            onClick={handleClose}
          >
            بستن
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
