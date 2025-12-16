import { FC, MouseEventHandler } from "react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  DialogActions,
  InputLabel,
  MenuItem,
  Skeleton,
  Select,
  Typography,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import {
  useGetApiMyVmByProjectIdVolumeShortListQuery,
  usePostApiMyVmByProjectIdSnapshotCreateBatchMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";

import {
  dialogSx,
  dialogTitleSx,
  dialogContentSx,
  dialogFormStackSx,
  dialogActionsSx,
  dialogButtonSx,
} from "src/configs/dialogStyles";

type CreateSnapshotDialogPropsType = DialogProps & {
  vmId: number;
  forceClose: () => void;
  refetch: () => void;
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("این بخش الزامی می‌باشد")
    .min(5, "تعداد کارکترهای نام اسنپ شات باید حداقل 5 عدد باشد")
    .max(50, "تعداد کارکترهای نام اسنپ شات باید حداکثر 50 عدد باشد"),
  vmVolumeHostId: yup
    .array()
    .of(yup.number().moreThan(0))
    .min(1, "انتخاب دیسک الزامی است")
    .required("انتخاب دیسک الزامی است"),
  description: yup.string().nullable(),
});

export const CreateSnapshotDialog: FC<CreateSnapshotDialogPropsType> = ({
  vmId,
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId } = useParams();

  const [createSnapshotBatch, { isLoading: createSnapshotLoading }] =
    usePostApiMyVmByProjectIdSnapshotCreateBatchMutation();

  const { data: volumeList, isLoading: volumeLoading } =
    useGetApiMyVmByProjectIdVolumeShortListQuery({
      projectId: Number(projectId),
      vmHostId:vmId,
    });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      vmVolumeHostId: [] as number[],
    },
    validationSchema,
    onSubmit: async ({ name, description, vmVolumeHostId }, { setSubmitting }) => {
      try {
        await createSnapshotBatch({
          projectId: Number(projectId),
          createVolumeSnapshotBatchModel: {
            vmHostId: Number(vmId),
            vmVolumeHostId,
            name,
            description,
          },
        }).unwrap();

        toast.success("اسنپ شات با موفقیت ایجاد شد");
        forceClose();
        refetch();
      } catch (_err) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    props.onClose?.(event, "backdropClick");
  };

  const handleVolumesChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as unknown;
    const next =
      typeof value === "string"
        ? value.split(",").map((v) => Number(v))
        : (value as number[]);

    formik.setFieldValue("vmVolumeHostId", next);
  };

  return (
    <Dialog {...props} sx={dialogSx}>
      <DialogTitle sx={dialogTitleSx}>ایجاد اسنپ شات</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={dialogContentSx}>
          <Stack sx={dialogFormStackSx}>
            <Stack>
              <InputLabel>لیست دیسک‌ها *</InputLabel>

              {volumeLoading ? (
                <Skeleton height={40} sx={{ transform: "none" }} />
              ) : (
                <Select
                  multiple
                  size="small"
                  fullWidth
                  value={formik.values.vmVolumeHostId}
                  onChange={handleVolumesChange}
                  onBlur={() => formik.setFieldTouched("vmVolumeHostId", true)}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as number[]).map((id) => {
                        const item = volumeList?.find((v) => v.id === id);
                        return (
                          <Chip
                            key={id}
                            size="small"
                            label={item?.name ?? String(id)}
                          />
                        );
                      })}
                    </Box>
                  )}
                  error={Boolean(
                    formik.touched.vmVolumeHostId && formik.errors.vmVolumeHostId
                  )}
                >
                  {volumeList?.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {formik.touched.vmVolumeHostId && formik.errors.vmVolumeHostId && (
                <Typography color="error" fontSize={12}>
                  {String(formik.errors.vmVolumeHostId)}
                </Typography>
              )}
            </Stack>

            <DorsaTextField
              focused
              fullWidth
              label="نام"
              inputProps={{ dir: "ltr" }}
              {...formik.getFieldProps("name")}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name ? formik.errors.name : ""}
            />

            <DorsaTextField
              fullWidth
              label="توضیحات"
              multiline
              minRows={3}
              maxRows={8}
              {...formik.getFieldProps("description")}
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              helperText={
                formik.touched.description ? formik.errors.description : ""
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={dialogActionsSx}>
          <Stack direction="row" justifyContent="end" spacing={1} width="100%">
            <Button
              variant="outlined"
              color="secondary"
              sx={dialogButtonSx}
              onClick={cancelBtnOnClick}
            >
              انصراف
            </Button>

            <LoadingButton
              type="submit"
              loading={createSnapshotLoading}
              variant="contained"
              sx={dialogButtonSx}
            >
              ذخیره
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
