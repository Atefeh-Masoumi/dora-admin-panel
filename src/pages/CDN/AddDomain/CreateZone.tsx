import { FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { GlobalEdit } from "src/components/atoms/svg/GlobalEdit";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostApiV2CdnZoneCheckZoneMutation } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

type CreateZonePropsType = { goNext: () => void };

export const CreateZone: FC<CreateZonePropsType> = ({ goNext }) => {
  const [checkZone, { isLoading }] = usePostApiV2CdnZoneCheckZoneMutation();
  const [zoneName, setZoneName] = useState("");

  const submit = () => {
    if (zoneName === "") return;
    checkZone({ checkZoneModel: { zoneName } })
      .unwrap()
      .then(() => goNext())
      .catch((res) => {
        if (res.status === 401 || res.status === 404) toast.error("خطای سرور");
        else toast.error(res.data[""][0]);
      });
  };

  return (
    <Stack spacing={1.5} py={2} px={1} alignItems="center">
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
          p={3}
        >
          <GlobalEdit
            sx={{ width: "100%", height: "100%", color: "primary.main" }}
          />
        </Stack>
      </Stack>
      <Typography variant="text14" color="secondary">
        لطفا آدرس دامنه خود را بدون www وارد کنید
      </Typography>
      <DorsaTextField
        onChange={(e) => setZoneName(e.target.value)}
        placeholder="example.com"
        fullWidth
      />
      <Stack direction="row" alignItems="center" spacing={1} width="100%">
        <Button fullWidth variant="outlined" sx={{ py: 1.3 }} href="/cdn">
          انصراف
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => submit()}
          fullWidth
          variant="contained"
          sx={{ py: 1.3 }}
        >
          ادامه
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
