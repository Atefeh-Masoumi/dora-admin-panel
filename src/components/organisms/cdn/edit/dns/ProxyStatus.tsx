import { FC, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CloudTrue } from "src/components/atoms/svg-icons/CloudTrueSvg";
import { CloudFalse } from "src/components/atoms/svg-icons/CloudFalseSvg";
import { usePutApiMyDnsCdnDnsRecordChangeProxyByIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import PageLoading from "src/components/atoms/PageLoading";

type ProxyStatusProps = { status: boolean; id: number };

export const ProxyStatus: FC<ProxyStatusProps> = ({ status, id }) => {
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => setOpen(false);
  const handleTooltipOpen = () => setOpen(!open);

  const [changeProxyStatus, { isLoading }] =
    usePutApiMyDnsCdnDnsRecordChangeProxyByIdMutation();

  const changeProxy = () => {
    if (status === undefined) return;

    changeProxyStatus({ id })
      .unwrap()
      .then(() => toast.success("Proxy status updated"))
      .catch((res) => {});
  };

  return (
    <>
      {isLoading && <PageLoading />}
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{ disablePortal: true }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          componentsProps={{
            popper: {
              sx: {
                "& .MuiTooltip-tooltip": {
                  background: "rgba(32, 32, 32, 1)",
                  borderRadius: 2,
                },
                "& .MuiTooltip-arrow::before": { color: "rgba(32, 32, 32, 1)" },
              },
            },
          }}
          title={
            <Stack spacing={1.5} p={1}>
              <Stack textAlign="justify" spacing={0.5}>
                <Typography fontSize={16}>استفاده از CDN ابر درسا</Typography>
                <Typography
                  whiteSpace="initial"
                  fontSize={14}
                  color="rgba(255, 255, 255, 0.8)"
                >
                  مشتری گرامی با فعال‌سازی این سرویس، هر ساعت و بر پایه‌ی متغییر
                  های ترافیک ورودی، ترافیک خروجی و تعداد درخواست های HTTP/HTTPS
                  از حساب شما کسر می گردد.
                </Typography>
              </Stack>
              <Divider sx={{ borderColor: "secondary.light" }} />
              <Stack direction="row" justifyContent="end" spacing={1}>
                <Button sx={{ color: "white" }}>انصراف</Button>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                  onClick={changeProxy}
                >
                  تغییر وضعیت
                </LoadingButton>
              </Stack>
            </Stack>
          }
          arrow
        >
          <IconButton
            onClick={handleTooltipOpen}
            color={status === true ? "success" : "error"}
          >
            {status === true ? <CloudTrue /> : <CloudFalse />}
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
};
