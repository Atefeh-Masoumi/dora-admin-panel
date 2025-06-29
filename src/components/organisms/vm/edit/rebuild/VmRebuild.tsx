import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import { ChooseInfo } from "./serverRebuildSections/ChooseInfo";
import { ChooseOSForRebuild } from "./serverRebuildSections/ChooseOS";
import { usePutApiMyVmByProjectIdHostRebuildAndIdMutation } from "src/app/services/api.generated";
import { passwordValidationRegex } from "src/utils/regexUtils";

type VmRebuildPropsType = {};

export const VmRebuild: FC<VmRebuildPropsType> = () => {
  const formInitialValues = { serverName: "", password: "" };
  const { serverId } = useContext(EditServerContext);
  const [imageId, setImageId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [rebuild, { isLoading }] = usePutApiMyVmByProjectIdHostRebuildAndIdMutation();

  const submitHandler = () => {
    formik.handleSubmit();
  };

  const formValidation = yup.object().shape({
    serverName: yup.string().required("نام سرور الزامیست!"),
    password: yup.string().required("گذرواژه الزامیست!"),
  });

  const onSubmit: formikOnSubmitType<typeof formInitialValues> = () => {
    if (!serverId || !formik.values.serverName || !formik.values.password || !imageId) {
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (formik.values.serverName.length < 5) {
      toast.error("نام سرور نباید کمتر از ۵ کارکتر باشد");
      return;
    }

    if (!passwordValidationRegex.test(formik.values.password)) {
      toast.error("رمز عبور باید حداقل ۸ حرف باشد و ترکیبی از حروف بزرگ و کوچک و عدد و یک کارکتر خاص باشد");
      return;
    }

    rebuild({
      id: serverId,
      projectId: Number(projectId),
      rebuildVmModel: {
        name: formik.values.serverName,
        password: formik.values.password,
        vmImageId: imageId,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("درخواست با موفقیت انجام شد");
        navigate(`/vm/${projectId}/list`);
      })
      .catch(() => {});
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidation,
    onSubmit,
  });

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        بازسازی سیستم عامل
      </Typography>
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}>
        <Typography align="center" color="grey.700">
          بعد از بازسازی امکان دستیابی به اطلاعات قبلی وجود ندارد!
        </Typography>
        <ChooseOSForRebuild setImageId={setImageId} />
        <Typography
          align="center"
          fontWeight={700}
          fontSize={24}
          color="#202020"
          sx={{ mt: 10 }}
        >
          اطلاعات سرور
        </Typography>
        <ChooseInfo
          name={formik.values.serverName}
          setName={(name) => formik.setFieldValue('serverName', name)}
          password={formik.values.password}
          setPassword={(password) => formik.setFieldValue('password', password)}
          formik={formik}
        />
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
            درخواست بازسازی
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
};
