import { LoadingButton } from "@mui/lab";
import {  Button, Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import { ChooseInfo } from "./serverRebuildSections/ChooseInfo";
import { ChooseOSForRebuild } from "./serverRebuildSections/ChooseOS";
import { usePutApiMyVmHostRebuildByIdMutation } from "src/app/services/api.generated";
import { VmRebuildConfirmation } from "./dialog/VmRebuildConfirmation";

type VmRebuildPropsType = {};

export const VmRebuild: FC<VmRebuildPropsType> = () => {
  const formInitialValues = { serverName: "", password: "" };
  const { serverId, hostProjectId } = useContext(EditServerContext);
  const [imageId, setImageId] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = ()=> {
  if (!formik.values.serverName) {
    toast.error("لطفا نام سرور را وارد کنید");
    return; 
  }

  if (!formik.values.password) {
    toast.error("لطفا رمز عبور را وارد کنید");
    return; 
  }

  setShowDialog(true);
  }
  const navigate = useNavigate();

  const { projectId} = useParams()

  const [rebuild, { isLoading }] = usePutApiMyVmHostRebuildByIdMutation();

  const submitHandler = () => {
    formik.handleSubmit();
  };

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
        imageId: imageId,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("درخواست با موفقیت انجام شد");
        setShowDialog(false);
        navigate(`/vm/${projectId}/list`);
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
        <ChooseOSForRebuild
          setImageId={setImageId}
          hostProjectId={hostProjectId || 0}
        />
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
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          formik={formik}
        />
        <Stack alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              width: { xs: "100%", sm: "auto" },
              px: { sm: 8 },
              py: 2.1,
              mt: 2,
            }}
          >
            درخواست بازسازی
          </Button>
        </Stack>
      </Paper>
     <VmRebuildConfirmation
     open={showDialog}
     onClose={()=>setShowDialog(false)}
     securityPhrase={formik.values.serverName}
     onSubmit={submitHandler}
     submitLoading={isLoading}
     />
    </>
  );
};
