import { FC, useEffect, useState } from "react";
import { Button, Stack, Typography, Paper } from "@mui/material";
import { SuccessfulPayment } from "src/components/atoms/svg/SuccessfulSvg";
import { UnsuccessfulPayment } from "src/components/atoms/svg/UnsuccessfulSvg";
import { useNavigate, useParams } from "react-router";
import PageLoading from "src/components/atoms/PageLoading";
import { usePostApiMyPortalReferralJoinMutation } from "src/app/services/api.generated";

type ReferralCallBackPropsType = {};

const ReferralCallBack: FC<ReferralCallBackPropsType> = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [sendReferralCode, { isLoading }] =
    usePostApiMyPortalReferralJoinMutation();

  useEffect(() => {
    if (id) {
      sendReferralCode({ joinReferralModel: { referralCode: id } })
        .unwrap()
        .then((res) => {
          setIsSuccess(true);
        });
    } else {
      navigate(-1);
    }
  }, [id, navigate, sendReferralCode]);

  const closeHandler = () => navigate("/portal/referral");

  if (!id) return <></>;

  return (
    <>
      {isLoading && <PageLoading />}
      <Paper
        elevation={0}
        component={Stack}
        sx={{ px: 4, py: 3 }}
        spacing={4}
        alignItems="center"
      >
        {isSuccess ? (
          <SuccessfulPayment sx={{ fontSize: 200 }} />
        ) : (
          <UnsuccessfulPayment sx={{ fontSize: 200 }} />
        )}
        <Typography
          variant="text1"
          fontWeight="bold"
          color={isSuccess ? "isSuccess.main" : "error.main"}
          fontSize={{ xs: 24, md: 32 }}
        >
          {isSuccess ? "عملیات با موفقیت انجام شد" : "عملیات ناموفق بود"}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            borderRadius: 1.5,
            px: 7,
            py: 2,
            borderColor: "secondary.light",
          }}
          onClick={closeHandler}
          size="large"
        >
          بازگشت به ابر درسا
        </Button>
      </Paper>
    </>
  );
};

export default ReferralCallBack;
