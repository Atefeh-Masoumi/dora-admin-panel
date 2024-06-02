import { FC, Fragment, useState } from "react";
import { Add } from "@mui/icons-material";
import { Tick } from "src/components/atoms/svg-icons/TickSvg";
import { Button, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Stack } from "@mui/system";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const ChangeCode: FC = () => {
  const [code, setCode] = useState(0);
  return (
    <Fragment>
      {code === 0 ? (
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            color: "primary.main",
            justifyContent: "space-between",
            py: 1,
            fontSize: "16px",
          }}
          endIcon={<Add />}
          onClick={() => setCode(1)}
        >
          افزودن کد شارژ شگفت انگیز
        </Button>
      ) : code === 1 ? (
        <Stack
          p={2}
          direction="row"
          spacing={1.5}
          alignItems="center"
          whiteSpace="nowrap"
          border={1}
          borderRadius={BORDER_RADIUS_1}
          borderColor="secondary.light"
        >
          <DorsaTextField placeholder="کد شارژ شگفت انگیز" fullWidth />
          <Button
            variant="contained"
            sx={{ py: 1.2, px: 3.5, fontSize: "16px" }}
            onClick={() => setCode(2)}
          >
            ثبت کد
          </Button>
        </Stack>
      ) : (
        <Stack
          p={2}
          direction="row"
          spacing={1.5}
          border={1}
          borderRadius={BORDER_RADIUS_1}
          borderColor="secondary.light"
          color="primary.main"
        >
          <Tick />
          <Stack>
            <Typography fontSize="16px">کد شارژ با موفقیت اضافه شد!</Typography>
            <Typography fontSize="12px">
              ۲۰٪ از مبلغ افزایش موجودی به کیف پول شما اضافه خواهد شد
            </Typography>
          </Stack>
        </Stack>
      )}
    </Fragment>
  );
};
