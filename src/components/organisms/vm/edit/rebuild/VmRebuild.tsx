import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { usePutApiMyVmHostRebuildByIdMutation } from "src/app/services/api.generated";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import { ChooseInfo } from "./serverRebuildSections/ChooseInfo";
import { ChooseOSForRebuild } from "./serverRebuildSections/ChooseOS";

type VmRebuildSteps = 1 | 2;

type VmRebuildPropsType = {};

export const VmRebuild: FC<VmRebuildPropsType> = () => {
  const { serverId } = useContext(EditServerContext);
  const [step, setStep] = useState<VmRebuildSteps>(1);
  const [imageId, setImageId] = useState<any>(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [rebuild, { isLoading }] = usePutApiMyVmHostRebuildByIdMutation();

  const submitHandler = () => {
    if (step === 1) {
      imageId && setStep(2);
    } else if (step === 2) {
      formik.handleSubmit();
    }
  };
  //formik
  const formInitialValues = { serverName: "", password: "" };

  const formValidation = yup.object().shape({
    serverName: yup.string().required("نام سرور الزامیست!"),
    password: yup.string().required("گذرواژه الزامیست!"),
  });
  const onSubmit: formikOnSubmitType<typeof formInitialValues> = () => {
    if (
      !serverId ||
      !formik.values.serverName ||
      !formik.values.password ||
      !imageId
    )
      return;
    rebuild({
      id: serverId,
      rebuildVmModel: {
        name: formik.values.serverName,
        password: formik.values.password,
        imageId: imageId.osId,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("درخواست با موفقیت انجام شد");
        navigate("/vm");
      })
      .catch(() => {});
    return;
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidation,
    onSubmit,
  });

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
        <ChooseOSForRebuild imageId={imageId} setImageId={setImageId} />
      ) : (
        <ChooseInfo
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          formik={formik}
        />
      )}
      <Stack alignItems="center" justifyContent="center">
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={submitHandler}
          sx={{
            width: { xs: "100%", sm: "auto" },
            px: { sm: 8 },
            py: 2.1,
            mt: 2,
          }}
        >
          ادامه
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
