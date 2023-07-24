import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { priceToPersian } from "src/utils/priceToPersian";
import {
  usePutPortalKubeWorkspaceEditMutation,
  useGetPortalKubeHostGetByIdQuery,
} from "src/app/services/api.generated";
import { EditWorkspaceContext } from "./context/EditWorkspaceContext";
import ReverseSlider from "src/components/atoms/ReverseSlider";

const memoryUnitPrice = 600000;
const cpuUnitPrice = 500000;
const diskUnitPrice = 45000;
const ipAddress = 600000;

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {

  const { serverId, serverConfig } = useContext(EditWorkspaceContext);
  
  const [memory, setMemory] = useState(1);
  const [cpu, setCpu] = useState(1);
  const [disk, setDisk] = useState(25);

  const { data, isLoading } = useGetPortalKubeHostGetByIdQuery({
    id: serverId || 0,
  });

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutPortalKubeWorkspaceEditMutation();

  useEffect(() => {
    if (serverId && data) {
      setMemory(data.memory || 0);
      setCpu(data.cpu || 0);
      setDisk(data.disk || 0);
    }
  }, [data, serverId]);

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
      editWorkspaceModel: {
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
