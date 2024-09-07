import { FC, useContext, useState } from "react";
import { EditKubernetesCloudServerContext } from "./EditKubernetesCloudServerContext";

export const KubernetesCloudServerConfig: FC = () => {
  const { serverId } = useContext(EditKubernetesCloudServerContext);
  const [memory, setMemory] = useState(1);
  const [cpu, setCpu] = useState(1);
  const [disk, setDisk] = useState(25);

  // const [getData] = useLazyGetApiMyVmHostGetByIdQuery();

  // const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
  //   usePutApiMyVmHostEditByIdMutation();

  // useEffect(() => {
  //   if (serverId) {
  //     getData({ id: serverId })
  //       .unwrap()
  //       .then((res) => {
  //         if (res) {
  //           setMemory(res.memory || 0);
  //           setCpu(res.cpu || 0);
  //           setDisk(res.disk || 0);
  //         }
  //       })
  //       .catch(() => {});
  //   }
  // }, [getData, serverId]);

  // const resourceList = [
  //   {
  //     name: "Memory (GB)",
  //     value: memory,
  //     onChange: setMemory,
  //     min: 1,
  //     max: 128,
  //     step: 1,
  //   },
  //   {
  //     name: "CPU (Core)",
  //     value: cpu,
  //     onChange: setCpu,
  //     min: 1,
  //     max: 48,
  //     step: 1,
  //   },
  //   {
  //     name: "Disk (GB)",
  //     value: disk,
  //     onChange: setDisk,
  //     min: 25,
  //     max: 1000,
  //     step: 25,
  //   },
  // ];

  // const totalPrice = useMemo(() => {
  //   const m = memoryUnitPrice * memory;
  //   const c = cpuUnitPrice * cpu;
  //   const d = diskUnitPrice * disk;
  //   return m + c + d + ipAddress;
  // }, [cpu, disk, memory]);

  // const submitClickHandler = () => {
  //   if (!serverId) return;
  //   sendNewConfig({
  //     id: serverId,
  //     editVmModel: {
  //       cpu,
  //       memory,
  //       disk,
  //     },
  //   })
  //     .unwrap()
  //     .then(() => toast.success("تغییرات جدید با موفقیت اعمال شد"))
  //     .catch(() => {});
  // };
  return <></>;
  // return (
  //   <>
  //     <Typography
  //       color="grey.700"
  //       fontSize={24}
  //       fontWeight={700}
  //       sx={{ mb: 2 }}
  //     >
  //       تغییر مشخصات سخت افزاری
  //     </Typography>
  //     <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}>
  //       <Stack rowGap={{ xs: 3, md: 7.4 }} sx={{ p: 4 }}>
  //         {resourceList.map(
  //           ({ name, value, onChange, min, max, step }, index) => (
  //             <Stack
  //               key={index}
  //               direction={{ xs: "column-reverse", md: "row" }}
  //               rowGap={5}
  //               columnGap={4}
  //               alignItems="end"
  //             >
  //               <ReverseSlider
  //                 value={value}
  //                 valueLabelDisplay="on"
  //                 onChange={(_, value) => onChange(value as number)}
  //                 min={min}
  //                 max={max}
  //                 step={step}
  //               />
  //               <Typography
  //                 color={({ palette }) => palette.grey[700]}
  //                 sx={{ width: "125px" }}
  //                 align="right"
  //               >
  //                 {name}
  //               </Typography>
  //             </Stack>
  //           )
  //         )}
  //       </Stack>
  //       <Stack
  //         direction={{ xs: "column", sm: "row" }}
  //         sx={{ mt: 6 }}
  //         alignItems="center"
  //         justifyContent="space-between"
  //         rowGap={3}
  //       >
  //         <Stack direction="row" spacing={1} alignItems="center">
  //           <Typography color="grey.700">تخمین هزینه ماهیانه:</Typography>
  //           <Typography color="grey.700" fontWeight={700}>
  //             {priceToPersian(totalPrice)} ریال
  //           </Typography>
  //         </Stack>
  //         <LoadingButton
  //           loading={sendNewConfigLoading}
  //           onClick={submitClickHandler}
  //           variant="contained"
  //           sx={{
  //             px: { xs: 3, sm: 7 },
  //             py: 2,
  //             width: { xs: "100%", sm: "auto" },
  //           }}
  //         >
  //           تغییر سخت افزار ماشین
  //         </LoadingButton>
  //       </Stack>
  //     </Paper>
  //   </>
  // );
};
