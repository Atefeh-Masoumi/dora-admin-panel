import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  addEdge,
  MarkerType,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFormik } from "formik";
import { FC, useCallback } from "react";
import { useParams } from "react-router";
import CloudImage from "src/assets/images/cloudDestination.png";
import GatewayImage from "src/assets/images/gateway.png";
import SwitchImage from "src/assets/images/switch.png";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { formikOnSubmitType } from "src/types/form.type";
import "./index.css";

import {
  useGetApiMyVpcIpListByVpcHostIdQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
  useGetApiMyVpcTranslateListQuery,
  usePostApiMyVpcNatCreateDnatMutation,
} from "src/app/services/api.generated";
import { ipValidation } from "src/utils/regex.utils";
import * as yup from "yup";
import { SelectNatService } from "../nat/SelectNatService";

export type CreateVpcGatewayDnat = {
  vpcHostId: number;
  vpcNetworkId: number;
  vpcHostGatewayIpId: number;
  vpcHostTranslateId: number;
  name: string;
  sourceIp?: string | null;
  destinationIp: string;
  destinationPort: number | "";
  description?: string | null;
};

const VALIDATION_REQUIRED_ERROR_MESSAGE = "فیلد الزامیست";

export const dNatInitialValueSchema = yup.object().shape({
  name: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  vpcNetworkId: yup.number(),
  vpcHostGatewayIpId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  vpcHostTranslateId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  sourceIp: yup
    .string()
    .matches(
      ipValidation,
      "آدرس IP که وارد کردید یک آدرس IPv4 معتبر نیست. لطفاً قالب را بررسی کنید (به عنوان مثال، 192.168.1.1)."
    )
    .nullable(),
  destinationIp: yup
    .string()
    .matches(
      ipValidation,
      "آدرس IP که وارد کردید یک آدرس IPv4 معتبر نیست. لطفاً قالب را بررسی کنید (به عنوان مثال، 192.168.1.1)."
    )
    .required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  destinationPort: yup
    .number()
    .typeError("مقدار را به عدد وارد کنید")
    .required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  description: yup.string(),
});

type CreateDestinationNatFormPropsType = DialogProps & {
  forceClose: () => void;
};

export const CreateDestinationNatDialog: FC<
  CreateDestinationNatFormPropsType
> = ({ forceClose, ...props }) => {
  const { vpcId } = useParams();

  const initialNodes = [
    {
      id: "1",
      sourcePosition: "right",
      data: {
        label: (
          <>
            <img src={CloudImage} alt="cloud" className="image-icon" />
            <div>
              <p className="dnat-destination">Source</p>
            </div>
          </>
        ),
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <>
            <img
              src={GatewayImage}
              alt="switch"
              className="gateway image-icon"
            />
            <div>
              <p className="dnat-gateway">Gateway</p>
            </div>
          </>
        ),
      },
      position: { x: 220, y: 0 },
    },
    {
      id: "3",
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <>
            <img src={SwitchImage} alt="switch" className="image-icon" />
            <div>
              <p className="dnat-source">Destination</p>
            </div>
          </>
        ),
      },
      position: { x: 450, y: 0 },
    },
  ];

  const initialEdges = [
    {
      id: "horizontal-e1-2",
      source: "1",
      type: "smoothstep",
      target: "2",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#1373CC",
      },
      style: {
        stroke: "#1373CC",
      },
    },
    {
      id: "horizontal-e1-3",
      source: "2",
      type: "smoothstep",
      target: "3",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#1373CC",
      },
      style: {
        stroke: "#1373CC",
      },
    },
  ];

  const [nodes, _, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);

  const onReconnect = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  const { data: vpcNetworkList, isLoading: vpcNetworkListLoading } =
    useGetApiMyVpcNetworkShortListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const { data: vpcHostGatewayList, isLoading: vpcIpListLoading } =
    useGetApiMyVpcIpListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const { data: translateIpList } = useGetApiMyVpcTranslateListQuery();

  const [createVpcNat, { isLoading }] = usePostApiMyVpcNatCreateDnatMutation();

  const onSubmit: formikOnSubmitType<CreateVpcGatewayDnat> = (
    values,
    { resetForm }
  ) => {
    createVpcNat({
      createVpcGatewayDnatModel: {
        ...values,
        destinationPort: Number(values.destinationPort!),
      },
    })
      .unwrap()
      .then((res) => {
        resetForm();
        formik.resetForm();
        forceClose();
      })
      .catch((err) => {});
  };

  const initialValues: CreateVpcGatewayDnat = {
    vpcHostId: Number(vpcId!),
    name: "",
    vpcNetworkId: vpcNetworkList?.length ? vpcNetworkList[0].id : 1,
    vpcHostGatewayIpId: vpcHostGatewayList?.length
      ? vpcHostGatewayList[0].id
      : 1,
    vpcHostTranslateId: translateIpList?.length ? translateIpList[0].id : 0,
    sourceIp: "",
    destinationIp: "",
    destinationPort: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: dNatInitialValueSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const dialogCloseHandler: DialogProps["onClose"] = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  return (
    <Dialog {...props} onClose={dialogCloseHandler}>
      <DialogTitle textAlign="center">ایجاد Destination Nat جدید</DialogTitle>
      {true ? (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ py: 4 }}>
            <Grid
              container
              columnSpacing={1}
              rowSpacing={2}
              sx={{ mt: { xs: 1, lg: 0 } }}
            >
              <Grid item xs={12} md={6} lg={3.6}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.errors.name && formik.touched.name)}
                >
                  {/* <Typography>نام سرویس</Typography> */}
                  <AlphaNumericTextField
                    formik={formik}
                    id="name"
                    size="small"
                    fullWidth
                    placeholder="نام موردنظر را وارد کنید"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Grid sx={{ width: "100%", height: "80px" }}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onReconnect={onReconnect}
                    nodesDraggable={false}
                    nodesFocusable={false}
                    nodesConnectable={false}
                    fitView
                    attributionPosition="bottom-left"
                  ></ReactFlow>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ py: 1 }} />

            <Grid container pt={2} rowGap={2} justifyContent="space-between">
              <Grid item xs={12} md={5.8} lg={3.5}>
                <Stack
                  pt={0}
                  mt={0}
                  rowGap={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack justifyContent="center" width="100%">
                    <Stack textAlign="end" borderBottom="1px solid lightgray">
                      <Typography variant="text9">Destination</Typography>
                    </Stack>
                  </Stack>
                  <Stack width="100%" direction="column" rowGap={2}>
                    <FormControl>
                      <InputLabel id="network-select">Network</InputLabel>
                      <Select
                        {...formik.getFieldProps("vpcNetworkId")}
                        size="small"
                        labelId="network-select"
                        id="network-select"
                        label="Network"
                        sx={{ paddingBottom: "3.5px" }}
                      >
                        {vpcNetworkList?.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        {...formik.getFieldProps("destinationIp")}
                        value={formik.values.destinationIp ?? ""}
                        size="small"
                        label="Destination IP"
                        focused
                        error={Boolean(
                          formik.errors.destinationIp &&
                            formik.touched.destinationIp
                        )}
                        helperText={
                          formik.touched.destinationIp &&
                          formik.errors.destinationIp
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              border: "1px solid lightgray",
                            },
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        {...formik.getFieldProps("destinationPort")}
                        value={formik.values.destinationPort ?? ""}
                        size="small"
                        label="Destination Port"
                        focused
                        error={Boolean(
                          formik.errors.destinationPort &&
                            formik.touched.destinationPort
                        )}
                        helperText={
                          formik.touched.destinationPort &&
                          formik.errors.destinationPort
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              border: "1px solid lightgray",
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5.8} lg={3.5}>
                <Stack
                  pt={0}
                  mt={0}
                  rowGap={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack justifyContent="center" width="100%">
                    <Stack textAlign="end" borderBottom="1px solid lightgray">
                      <Typography variant="text9">Gateway</Typography>
                    </Stack>
                  </Stack>
                  <Stack width="100%" direction="column" rowGap={2}>
                    <FormControl size="small">
                      <InputLabel id="gateway-select">Gateway Ip</InputLabel>
                      <Select
                        {...formik.getFieldProps("vpcHostGatewayIpId")}
                        size="small"
                        labelId="gateway-select"
                        id="gateway-select"
                        label="Gateway Ip"
                        sx={{ paddingBottom: "3.5px" }}
                      >
                        {vpcHostGatewayList?.map((item, index) => (
                          <MenuItem key={index} value={item.id!}>
                            {item.ip}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <SelectNatService
                      translateIpList={translateIpList}
                      formik={formik}
                    />
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={12} lg={3.5}>
                <Stack
                  pt={0}
                  mt={0}
                  rowGap={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack justifyContent="center" width="100%">
                    <Stack textAlign="end" borderBottom="1px solid lightgray">
                      <Typography variant="text9">Source</Typography>
                    </Stack>
                  </Stack>
                  <Stack width="100%" direction="column" rowGap={2}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        {...formik.getFieldProps("sourceIp")}
                        focused
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              border: "1px solid lightgray",
                            },
                          },
                        }}
                        size="small"
                        label="Source IP"
                        error={Boolean(
                          formik.errors.sourceIp && formik.touched.sourceIp
                        )}
                        helperText={
                          formik.touched.sourceIp && formik.errors.sourceIp
                        }
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={forceClose}
              >
                انصراف
              </Button>
              <LoadingButton
                component="button"
                type="submit"
                loading={isLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ذخیره
              </LoadingButton>
            </Stack>
          </DialogActions>
        </form>
      ) : (
        <Alert sx={{ margin: 3 }} severity="info">
          <Typography>لطفا ابتدا شبکه ایجاد کنید</Typography>
        </Alert>
      )}
    </Dialog>
  );
};
