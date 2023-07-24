import { FC, useContext, useEffect, useMemo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid2 from "@mui/material/Unstable_Grid2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { priceToPersian } from "src/utils/priceToPersian";
import { EditWorkspaceTableRow } from "./tables/EditWorkspaceTableRow";
import { editWorkspaceTableStruct } from "./tables/struct";
import {
  useGetPortalPanelProductBundleListByProductCategoryIdQuery,
  usePutPortalKubeWorkspaceEditMutation,
} from "src/app/services/api.generated";
import { EditWorkspaceContext } from "./context/EditWorkspaceContext";

const memoryUnitPrice = 600000;
const cpuUnitPrice = 500000;
const diskUnitPrice = 45000;
const ipAddress = 600000;

type ServerConfigPropsType = {};

export const ServerConfig: FC<ServerConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetPortalPanelProductBundleListByProductCategoryIdQuery({
      productCategoryId: PRODUCT_CATEGORY_ENUM.KUBE,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={editWorkspaceTableStruct}
        RowComponent={EditWorkspaceTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [configsList, isLoading]
  );

  const navigate = useNavigate();

  const [editWorkspaceHostModel, { isLoading: updateLoading }] =
    usePutPortalKubeWorkspaceEditMutation();

  const { serverId, serverConfig } = useContext(EditWorkspaceContext);
  const [memory, setMemory] = useState(1);
  const [cpu, setCpu] = useState(1);
  const [disk, setDisk] = useState(25);

  const [getData] = useLazyGetPortalVmVmGetByIdQuery();

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutPortalKubeWorkspaceEditMutation();

  useEffect(() => {
    if (serverId) {
      getData({ id: serverId })
        .unwrap()
        .then((res) => {
          if (res) {
            setMemory(res.memory || 0);
            setCpu(res.cpu || 0);
            setDisk(res.disk || 0);
          }
        });
    }
  }, [getData, serverId]);

  const resourceList = [
    {
      name: "Memory (GB)",
      value: memory,
      onChange: setMemory,
      min: 1,
      max: 128,
      step: 1,
    },
    {
      name: "CPU (Core)",
      value: cpu,
      onChange: setCpu,
      min: 1,
      max: 48,
      step: 1,
    },
    {
      name: "Disk (GB)",
      value: disk,
      onChange: setDisk,
      min: 25,
      max: 1000,
      step: 25,
    },
  ];

  const totalPrice = useMemo(() => {
    const m = memoryUnitPrice * memory;
    const c = cpuUnitPrice * cpu;
    const d = diskUnitPrice * disk;
    return m + c + d + ipAddress;
  }, [cpu, disk, memory]);

  const submitClickHandler = () => {
    if (!serverId) return;
    sendNewConfig({
      editVmModel: {
        cpu,
        memory,
        disk,
        id: serverId,
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات جدید با موفقیت اعمال شد"));
  };

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        تغییر مشخصات سخت افزاری
      </Typography>
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}>
        <Stack rowGap={{ xs: 3, md: 7.4 }} sx={{ p: 4 }}>
          {resourceList.map(
            ({ name, value, onChange, min, max, step }, index) => (
              <Stack
                key={index}
                direction={{ xs: "column-reverse", md: "row" }}
                rowGap={5}
                columnGap={4}
                alignItems="end"
              >
                <ReverseSlider
                  value={value}
                  valueLabelDisplay="on"
                  onChange={(_, value) => onChange(value as number)}
                  min={min}
                  max={max}
                  step={step}
                />
                <Typography
                  color={({ palette }) => palette.grey[700]}
                  sx={{ width: "125px" }}
                  align="right"
                >
                  {name}
                </Typography>
              </Stack>
            )
          )}
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ mt: 6 }}
          alignItems="center"
          justifyContent="space-between"
          rowGap={3}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography color="grey.700">تخمین هزینه ماهیانه:</Typography>
            <Typography color="grey.700" fontWeight={700}>
              {priceToPersian(totalPrice)} ریال
            </Typography>
          </Stack>
          <LoadingButton
            loading={sendNewConfigLoading}
            onClick={submitClickHandler}
            variant="contained"
            sx={{
              px: { xs: 3, sm: 7 },
              py: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            تغییر سخت افزار ماشین
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetPortalPanelProductBundleListByProductCategoryIdQuery({
      productCategoryId: PRODUCT_CATEGORY_ENUM.KUBE,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={editWorkspaceTableStruct}
        RowComponent={EditWorkspaceTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [configsList, isLoading]
  );

  const navigate = useNavigate();

  const { serverId, serverConfig } = useContext(EditWorkspaceContext);
  const [editWorkspaceHostModel, { isLoading: updateLoading }] =
    usePutPortalKubeWorkspaceEditMutation();

  const submitHandler = () => {
    if (!serverId || !serverConfig) return;

    editWorkspaceHostModel({
      editWorkspaceModel: {
        id: serverId,
        productBundleId: serverConfig.id || 0,
      },
    })
      .unwrap()
      .then(() => {
        navigate("/kubernetes");
        toast.success("درخواست تغییر سرویس با موفقیت انجام شد");
      });
    return;
  };

  return (
    <>
      <Grid2 container spacing={3} alignItems="center" justifyContent="center">
        <Grid2 xs={12}>
          <Stack
            bgcolor="white"
            py={3}
            px={3}
            width="100%"
            borderRadius={3}
            direction="column"
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              rowGap={3}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                spacing={2}
              >
                <Typography fontSize={18} color="secondary">
                  مشخصات سرویس را انتخاب کنید
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
            <Box sx={{ px: { lg: 5 }, pt: 5 }}>{table}</Box>
            <Stack py={3} px={3} alignItems="center" justifyContent="center">
              <LoadingButton
                loading={updateLoading}
                variant="contained"
                onClick={submitHandler}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  px: { sm: 8 },
                  py: 2.1,
                }}
              >
                تغییر سرویس
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
};
function useState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}

function useState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}

function useLazyGetPortalVmVmGetByIdQuery(): [any] {
  throw new Error("Function not implemented.");
}

