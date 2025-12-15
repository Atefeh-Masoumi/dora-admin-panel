import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Typography, Divider } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { ChooseOSForRebuild } from "./serverRebuildSections/ChooseOS";
import { passwordValidationRegex } from "src/utils/regexUtils";
import { VM_SECURITY_TYPE_SETTING } from "src/types/securityTypeSettings.type";
import { EditConfirmationDialog } from "src/components/organisms/vm/edit/rebuild/dialog/EditConfirmationDialog";
import { SelectServiceName } from "src/components/organisms/vm/edit/rebuild/steps/createServices/SelectServiceName";
import { usePutApiMyVmByProjectIdHostRebuildAndIdMutation, useGetApiMyVmByProjectIdKeyListQuery } from "src/app/services/api.generated";

type VmRebuildPropsType = {};

export const VmRebuild: FC<VmRebuildPropsType> = () => {
  const [name, setName] = useState("");
  const [usePassword, setUsePassword] = useState(true);
  const [useVmKey, setUseVmKey] = useState(false);
  const [password, setPassword] = useState("");
  const [vmKeyId, setVmKeyId] = useState<any>(null);
  const [securityId, setSecurityId] = useState<VM_SECURITY_TYPE_SETTING>(
    VM_SECURITY_TYPE_SETTING.PASSWORD
  );
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const [selectedOs, setSelectedOs] = useState<any>(null);
  const navigate = useNavigate();
  const { id: vmId, projectId } = useParams();

  const { data: vmKeyList } = useGetApiMyVmByProjectIdKeyListQuery({
    projectId: Number(projectId!),
  });

  const [rebuild, { isLoading: rebuildLoading }] = usePutApiMyVmByProjectIdHostRebuildAndIdMutation();

  const closeAllDialogs = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleRebuildOnClick = () => {
    if (!vmId) return;
    if (!name) {
      toast.error("لطفاً یک نام برای شناسایی سرویس خود انتخاب کنید");
      return;
    } else if (name.length < 5) {
      toast.error("نام سرور نباید کمتر از ۵ کارکتر باشد");
      return;
    } else if (securityId === VM_SECURITY_TYPE_SETTING.PASSWORD && !password) {
      toast.error("لطفا رمز عبور را وارد کنید");
      return;
    } else if (
      securityId === VM_SECURITY_TYPE_SETTING.PASSWORD &&
      !passwordValidationRegex.test(password)
    ) {
      toast.error(
        "رمز عبور باید حداقل ۸ حرف باشد و ترکیبی از حروف بزرگ و کوچک و عدد و یک کارکتر خاص باشد"
      );
      return;
    } else if (securityId === VM_SECURITY_TYPE_SETTING.VMKEY && !vmKeyId) {
      toast.error("لطفا کلید را وارد کنید");
      return;
    } else if (!selectedOs) {
      toast.error("لطفا ورژن سیستم عامل را انتخاب کنید");
      return;
    }
    setIsConfirmationDialogOpen(true);
  };

  const submitBtnOnClick = () => {
    const rebuildVmModel: any = {
      name,
      password,
      vmImageId: selectedOs,
    };

    // Only include vmKeyId if VM key is being used and a key is selected
    if (securityId === VM_SECURITY_TYPE_SETTING.VMKEY && vmKeyId?.id) {
      rebuildVmModel.vmKeyId = vmKeyId.id;
    }

    rebuild({
      id: Number(vmId),
      projectId: Number(projectId!),
      rebuildVmModel,
    })
      .unwrap()
      .then(() => {
        toast.success("فرآیند بازسازی سرور مورد نظر با موفقیت شروع شد.");
        navigate(`/vm/${projectId}/list`);
      })
      .catch((err) => { });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography
            color="grey.700"
            fontSize={24}
            fontWeight={700}
          >
            بازسازی سیستم عامل
          </Typography>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <Paper elevation={0} sx={{ py: 5 }}>
            <Typography align="center" color="grey.700" sx={{ mb: 4 }}>
              بعد از بازسازی امکان دستیابی به اطلاعات قبلی وجود ندارد!
            </Typography>
            <Stack spacing={4} >
              <ChooseOSForRebuild setImageId={setSelectedOs} />
              <Divider sx={{ mt: 10 }} />
              <SelectServiceName
                serviceName={name} setServiceName={setName}
                securityId={securityId}
                setSecurityId={setSecurityId}
                usePassword={usePassword}
                setUsePassword={setUsePassword}
                useVmKey={useVmKey}
                setUseVmKey={setUseVmKey}
                password={password}
                setPassword={setPassword}
                vmKeyId={vmKeyId}
                setVmKeyId={setVmKeyId}
                vmKeyList={vmKeyList}
              />
              <Stack alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                <LoadingButton
                  loading={rebuildLoading}
                  variant="contained"
                  onClick={handleRebuildOnClick}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    px: { sm: 8 },
                    py: 2.1,
                  }}
                >
                  بازسازی سرور
                </LoadingButton>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
      <EditConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={closeAllDialogs}
        onSubmit={submitBtnOnClick}
        submitLoading={rebuildLoading}
      />
    </>
  );
};
