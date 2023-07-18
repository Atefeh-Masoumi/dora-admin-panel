import { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { toast } from "react-toastify";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  useGetPortalKubeWorkspaceGetByIdQuery,
  usePostPortalKubeVolumeCreateMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { VolumeContext } from "../../VolumeManagement";

const formInitialValues = {
  volume: 0,
  name: "",
};

type AddVolumeDialogPropsType = {
  onClose: () => void;
  hostId: number;
  usedVolume: number;
};

export const AddVolumeDialog: FC<AddVolumeDialogPropsType> = ({
  onClose,
  hostId,
  usedVolume,
}) => {
  const [formValidation, setFormValidation] = useState(
    yup.object().shape({
      name: yup.string().required("عنوان الزامیست"),
    })
  );

  const { refetchVolumes } = useContext(VolumeContext);

  const { data: hostInfo } = useGetPortalKubeWorkspaceGetByIdQuery({
    id: hostId,
  });

  useEffect(() => {
    if (hostInfo) {
      setFormValidation(
        yup.object().shape({
          name: yup.string().required("عنوان الزامیست"),
          volume: yup
            .number()
            .required("حجم الزامی است")
            .min(0, "حجم نمی تواند منفی باشد")
            .max(
              (hostInfo?.disk || 0) - usedVolume,
              "حجم اختصاص داده شده بیشتر از ظرفیت موجود ااست"
            ),
        })
      );
    }
  }, [hostInfo]);

  const [createVolume, { isLoading: createVolumeLoading }] =
    usePostPortalKubeVolumeCreateMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = ({
    volume,
    name,
  }) => {
    createVolume({
      createKubeVolumeModel: {
        kubeHostId: +hostId,
        name,
        capacity: +volume,
      },
    })
      .unwrap()
      .then(() => {
        refetchVolumes();
        toast.success("حجم مورد نظر با موفقیت اختصاص داده شد");
        onClose();
      });
  };

  return (
    <>
      <Dialog
        open
        onClose={onClose}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2.5 },
        }}
      >
        <DialogTitle>ایجاد دسترسی به کاربر </DialogTitle>
        <Formik
          initialValues={{
            volume: 0,
            name: "",
          }}
          validationSchema={formValidation}
          onSubmit={submitHandler}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form autoComplete="on">
              <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
                <Grid2 container spacing={3}>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      label="عنوان"
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name}
                      {...getFieldProps("name")}
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      type="number"
                      label="حجم دیسک"
                      error={Boolean(errors.volume && touched.volume)}
                      helperText={errors.volume}
                      {...getFieldProps("volume")}
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      disabled
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      label="مقدار حجم باقی مانده"
                      value={hostInfo?.disk ? hostInfo?.disk - usedVolume : 0}
                    />
                  </Grid2>
                </Grid2>
                <br />
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ px: 3, py: 0.8 }}
                    onClick={onClose}
                  >
                    انصراف
                  </Button>
                  <LoadingButton
                    component="button"
                    type="submit"
                    loading={createVolumeLoading}
                    variant="contained"
                    sx={{ px: 3, py: 0.8 }}
                  >
                    ذخیره تغییرات
                  </LoadingButton>
                </DialogActions>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
