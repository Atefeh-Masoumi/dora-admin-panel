import { FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { GlobalEdit } from "src/components/atoms/svg/GlobalEdit";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { RecordsList } from "src/components/organisms/cdn/addZone/RecordsList";
import { Terms } from "src/components/organisms/cdn/addZone/Terms";
import { usePostUserV2CdnCdnCheckZoneMutation } from "src/app/services/api.generated";

const AddDomain: FC = () => {
  const [addDomainLevel, setAddDomainLevel] = useState(1);

  const [checkZone, { isLoading }] = usePostUserV2CdnCdnCheckZoneMutation();
  const [zoneName, setZoneName] = useState("");

  const submit = () => {
    if (zoneName === "") {
      toast.warning("نام دامنه را وارد کنید");
      return;
    }
    checkZone({ checkCdnModel: { zoneName } })
      .unwrap()
      .then(() => {
        toast.success("دامنه تایید شد");
        setAddDomainLevel(2);
      })
      .catch((res) => {
        if (res.status === 401 || res.status === 404) toast.error("خطای سرور");
        else toast.error(res.data[""][0]);
      });
  };
  return (
    <Stack p={{ xs: 0, md: 2 }} spacing={1}>
      <Typography variant="title6" color="secondary" fontWeight="700">
        افزودن دامنه جدید
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ py: 2, borderRadius: 3, bgcolor: "white" }}
      >
        {addDomainLevel === 1 ? (
          <Stack spacing={1.5} py={2} px={1} alignItems="center">
            <Stack
              borderRadius="100%"
              border="18px solid rgba(60, 138, 255, 0.04)"
            >
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
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="example.com"
              fullWidth
              inputProps={{ dir: "ltr" }}
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
        ) : addDomainLevel === 2 ? (
          <Terms goNext={() => setAddDomainLevel(3)} />
        ) : (
          <RecordsList zoneName={zoneName} />
        )}
      </Stack>
    </Stack>
  );
};

export default AddDomain;
