import { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { toast } from "react-toastify";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostPortalKubeVolumeCreateMutation } from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { VolumeContext } from "../../VolumeManagement";
import ReverseSlider from "src/components/atoms/ReverseSlider";

const formInitialValues = {
  volume: 0,
  name: "",
};

type AddVolumeDialogPropsType = {
  onClose: () => void;
  hostId: number;
};

const formValidation = yup.object().shape({
  name: yup.string().required("عنوان الزامیست"),
  volume: yup
    .number()
    .required("والیوم الزامی است")
    .positive("والیوم نمی تواند صفر یا منفی باشد")
    .max(2000, "والیوم نمی تواند بیشتر از 2000 باشد"),
});

export const AddVolumeDialog: FC<AddVolumeDialogPropsType> = ({
  onClose,
  hostId,
}) => {
  const { refetchVolumes } = useContext(VolumeContext);

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
        toast.success("والیوم مورد نظر با موفقیت ایجاد شد");
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
        <DialogTitle>ایجاد والیوم</DialogTitle>
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
                  <Grid2 sx={{ pb: 0, pt: 2 }} xs={12}>
                    <Stack
                      sx={{ pt: 2 }}
                      direction={{ xs: "row", md: "row" }}
                      rowGap={5}
                      columnGap={4}
                      alignItems="end"
                    >
                      <ReverseSlider
                        sx={{ mr: 1 }}
                        valueLabelDisplay="on"
                        min={0}
                        max={2000}
                        {...getFieldProps("volume")}
                      />
                    </Stack>
                  </Grid2>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{
                        fontSize: "16px !important",
                        min: 0,
                        max: 2000,
                        step: 1,
                      }}
                      fullWidth
                      label="والیوم مورد نظر"
                      error={Boolean(errors.volume && touched.volume)}
                      helperText={errors.volume}
                      {...getFieldProps("volume")}
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
