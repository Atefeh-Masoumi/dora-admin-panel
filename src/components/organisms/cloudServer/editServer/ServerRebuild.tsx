import { FC, useState, useContext } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { ChooseOS } from "./serverRebuildSections/ChooseOS";
import { ChooseInfo } from "./serverRebuildSections/ChooseInfo";
import { LoadingButton } from "@mui/lab";
import { usePutApiV2VmVmRebuildMutation } from "src/app/services/api.generated";
import { EditServerContext } from "src/context/EditServerContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type ServerRebuildSteps = 1 | 2;

type ServerRebuildPropsType = {};

export const ServerRebuild: FC<ServerRebuildPropsType> = () => {
  const { serverId } = useContext(EditServerContext);
  const [step, setStep] = useState<ServerRebuildSteps>(1);
  const [imageId, setImageId] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [rebuild, { isLoading }] = usePutApiV2VmVmRebuildMutation();

  const submitHandler = () => {
    if (step === 2) {
      if (!serverId || !name || !password || !imageId) return;
      rebuild({
        rebuildVmModel: {
          id: serverId,
          name,
          password,
          imageId,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("درخواست بازسای با موفیت ارسال شد");
          navigate("/dash/cloud");
        });
      return;
    }
    imageId && setStep(2);
  };

  return (
    <Paper
      elevation={0}
      component={Stack}
      rowGap={2}
      sx={{ py: 5, px: { xs: 2, sm: 5 } }}
    >
      <Typography align="center" fontWeight={700} fontSize={24} color="#202020">
        انتخاب سیستم عامل
      </Typography>
      <Typography align="center" color="grey.700">
        لطفا ابتدا سیستم عامل مورد نظر ماشین را از زیر انتخاب کنید
      </Typography>
      {step === 1 ? (
        <ChooseOS imageId={imageId} setImageId={setImageId} />
      ) : (
        <ChooseInfo
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
        />
      )}
      <Stack alignItems="center" justifyContent="center">
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={submitHandler}
          sx={{ width: { xs: "100%", sm: "auto" }, px: { sm: 8 }, py: 2.1 }}
        >
          ادامه
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
