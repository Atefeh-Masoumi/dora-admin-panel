import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import { useFormik } from "formik";
import { FC, Fragment } from "react";
import { toast } from "react-toastify";
import { usePutApiMyKubernetesCloudConfigmapEditMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type InitialValuesType = {
  alias?: string | null;
  description?: string | null;
  envs: { key: string; value: string }[];
  removeEnvIds: number[];
};

type EditConfigmapDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
  configData: any;
};

export const EditConfigMapDialog: FC<EditConfigmapDialogPropsType> = ({
  onClose,
  openDialog,
  configData,
}) => {

  const [editConfigMap, { isLoading: editConfigMapLoading }] =
    usePutApiMyKubernetesCloudConfigmapEditMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      alias: null,
      envs: configData?.configMaps || [{ key: "", value: "" }],
      removeEnvIds: [],
    },

    onSubmit: (values, { setSubmitting, resetForm }) => {
      const submittedConfigMapsArray = values?.envs;
      const configDataConfigMapsArray = configData?.configMaps;

      const compareConfigMaps = (
        originalArray: { id: number; key: string; value: string }[],
        submittedArray: { key: string; value: string }[]
      ) => {
        let removeEnvIds: number[] = [];
        let envs: { [key: string]: any } = {};

        const originalLookup: {
          [key: string]: { id: number; key: string; value: string };
        } = originalArray.reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item,
          }),
          {} as { [key: string]: { id: number; key: string; value: string } }
        );

        submittedArray.forEach((submittedItem) => {
          const originalItem = originalLookup[submittedItem.key];

          if (originalItem) {
            if (originalItem.value !== submittedItem.value) {
              envs[originalItem.id] = {
                [submittedItem.key]: submittedItem.value,
              };
            }
          } else {
            envs["0"] = envs["0"] || {};
            envs["0"][submittedItem.key] = submittedItem.value;
          }
        });

        originalArray.forEach((originalItem) => {
          const isKeyDeleted = !submittedArray.some(
            (submittedItem) => submittedItem.key === originalItem.key
          );
          if (isKeyDeleted) {
            removeEnvIds.push(originalItem.id);
          }
        });

        return { removeEnvIds, envs };
      };

      const updatedConfigmap = compareConfigMaps(
        configDataConfigMapsArray,
        submittedConfigMapsArray
      );
      editConfigMap({
        editKuberCloudConfigmapModel: {
          configmapId: Number(configData?.id),
          alias: null,
          description: null,
          removeEnvIds: updatedConfigmap.removeEnvIds,
          envs: updatedConfigmap.envs,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت آپدیت شد");
          resetForm();
          onClose();
        })
        .catch(() => {});

      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const addEnvsInput = () => {
    formik.setFieldValue("envs", [
      ...formik.values.envs,
      { id: 0, key: "", value: "" },
    ]);
  };

  const removeEnvsInput = (index: number) => {
    formik.setFieldValue(
      "envs",
      formik.values.envs.filter((_, i) => i !== index)
    );
  };

  const handleKeyChange = (index: number, key: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], key };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleValueChange = (index: number, value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={onClose}
        components={{ Backdrop: BlurBackdrop }}
        fullWidth
        PaperProps={{
          sx: { borderRadius: BORDER_RADIUS_1 },
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="on">
          <Stack
            px={{ xs: 1.8, md: 2 }}
            py={{ xs: 1.8, md: 1 }}
            spacing={{ xs: 2, md: 5 }}
          >
            <DialogTitle
              fontWeight="bold"
              variant="text1"
              sx={{ padding: "10px 5px" }}
            >
              ویرایش Configmap
            </DialogTitle>
            <Divider sx={{ marginTop: "20px !important" }} />
            <Grid2 container>
              <Grid2 size={{xs:12,md:6}}>
                <DorsaTextField
                  fullWidth
                  label="*name"
                  size="small"
                  value={configData?.name}
                  disabled
                />
              </Grid2>
            </Grid2>

            <Stack spacing={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600} mb={1}>
                  افزودن
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: "primary.main",
                    justifyContent: "space-between",
                    py: 1,
                    fontSize: "15px !important",
                    mb: 1,
                    border: "1px solid",
                  }}
                  startIcon={<Add />}
                  onClick={addEnvsInput}
                  size="small"
                >
                  اضافه کردن
                </Button>
              </Stack>
              <Grid
                container
                columnSpacing={1}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ direction: "rtl", margin: "0 auto" }}
              >
                {formik.values.envs.map((env, index) => (
                  <Fragment key={index}>
                    <Grid item xs={4} mb={2}>
                      <DorsaTextField
                        fullWidth
                        label="key"
                        value={env.key}
                        onChange={(e) => handleKeyChange(index, e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={7} mb={2} key={`value-${index}`}>
                      <DorsaTextField
                        fullWidth
                        label="value"
                        value={env.value}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      mb={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: "0 !important",
                        margin: 0,
                        padding: 0,
                        marginBottom: "15px !important",
                      }}
                    >
                      <IconButton onClick={() => removeEnvsInput(index)}>
                        <TrashSvg />
                      </IconButton>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Stack>
            <DialogActions>
              <Stack direction="row" justifyContent="end" spacing={1}>
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
                  loading={editConfigMapLoading}
                  variant="contained"
                  sx={{ px: 3, py: 0.8 }}
                >
                  ذخیره
                </LoadingButton>
              </Stack>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
    </>
  );
};
