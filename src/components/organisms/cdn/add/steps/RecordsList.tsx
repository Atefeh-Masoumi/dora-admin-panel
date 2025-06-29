import type { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { ContentCopyOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { CloudConnectionSvg } from "src/components/atoms/svg-icons/CloudConnectionSvg";

type RecordsListPropsType = { zoneName: string };

export const RecordsList: FC<RecordsListPropsType> = ({ zoneName }) => {
  return (
    <Stack alignItems="center" spacing={1} px={{ xs: 2, md: 0 }}>
      <Stack borderRadius="100%" border="18px solid rgba(60, 138, 255, 0.04)">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "120px", md: "196px" },
            height: { xs: "120px", md: "196px" },
            borderRadius: "100%",
            backgroundColor: "rgba(60, 138, 255, 0.1)",
          }}
          p={4}
        >
          <CloudConnectionSvg
            sx={{ width: "100%", height: "100%" }}
            mode="fill"
          />
        </Stack>
      </Stack>
      <Typography variant="title5" fontWeight="700">
        لیست رکوردهایDNS
      </Typography>
      <Typography variant="text14" color="secondary" textAlign="center">
        برای فعال شدن سرویس خود باید NS دامنه خود را به NS های ابری زیر تغییر
        بدهید
      </Typography>
      <Stack color="secondary.main" spacing={1} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <DorsaTextField
            disabled
            value="asia.dorsa.cloud"
            inputProps={{ dir: "ltr" }}
            sx={{ width: "280px", cursor: "pointer", py: 0, px: 0 }}
            InputProps={{
              endAdornment: (
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText("asia.dorsa.cloud");
                    toast.success("NS کپی شد", { position: "bottom-left" });
                  }}
                >
                  <ContentCopyOutlined />
                </Button>
              ),
            }}
          />
          <Typography>:NS 1</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <DorsaTextField
            disabled
            value="mobin.dorsa.cloud"
            inputProps={{ dir: "ltr" }}
            sx={{ width: "280px", cursor: "pointer", py: 0, px: 0 }}
            InputProps={{
              endAdornment: (
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText("mobin.dorsa.cloud");
                    toast.success("NS کپی شد", { position: "bottom-left" });
                  }}
                >
                  <ContentCopyOutlined />
                </Button>
              ),
            }}
          />
          <Typography whiteSpace="nowrap">:NS 2</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
