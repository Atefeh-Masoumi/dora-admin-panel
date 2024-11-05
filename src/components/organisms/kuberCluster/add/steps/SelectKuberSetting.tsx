import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  DatacenterListResponse,
  useGetApiMyDatacenterImageListQuery,
  useGetApiMyKubernetesClusterVersionListQuery,
} from "src/app/services/api.generated";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { HYPERVISOR_ENUM } from "src/types/hypervisorEnum";
import { AddKubernetesContext } from "../contexts/AddKubernetesContext";
import { Counter } from "../../../kubernetesCloud/add/steps/Counter";

type SelectKuberSettingPropsType = {};

export const SelectKuberSetting: FC<SelectKuberSettingPropsType> = () => {
  const {
    dataCenter,
    kubernetesVersion,
    setKubernetesVersion,
    osVersion,
    setOsVersion,
    workersCount,
    setWorkersCount,
  } = useContext(AddKubernetesContext);

  const { data } = useGetApiMyKubernetesClusterVersionListQuery();

  const versionsList = useMemo(
    () => (data as DatacenterListResponse[]) || [],
    [data]
  );

  useEffect(() => {
    if (versionsList.length === 0) return;
    setKubernetesVersion(versionsList[versionsList.length - 1]);
  }, [setKubernetesVersion, versionsList]);

  const versionOnChange = (
    event: SelectChangeEvent<number>,
    child: ReactNode
  ) => {
    const enhancedValue =
      versionsList.find((item) => item.id === event.target.value) || null;
    setKubernetesVersion(enhancedValue);
  };

  const { data: osVersionsList = [] } = useGetApiMyDatacenterImageListQuery({
    datacenterId: dataCenter?.id || 1,
    productId: PRODUCT_CATEGORY_ENUM.KubernetesCluster,
    hypervisorTypeId: HYPERVISOR_ENUM.VM,
  });

  useEffect(() => {
    if (
      !osVersionsList ||
      osVersionsList.length === 0 ||
      osVersionsList.length > 1
    )
      return;
    setOsVersion(osVersionsList[0]);
  }, [osVersionsList, setOsVersion]);

  const osVersionOnChange = (
    event: SelectChangeEvent<number>,
    _: ReactNode
  ) => {
    const enhancedValue =
      osVersionsList.find((item) => item.id === event.target.value) || null;
    setOsVersion(enhancedValue);
  };

  const isInRange = (num: number) => {
    return num > 2 && num < 100;
  };

  const addOne = () => {
    setWorkersCount((prevState) =>
      isInRange(prevState + 1) ? prevState + 1 : prevState
    );
  };
  const minusOne = () => {
    setWorkersCount((prevState) =>
      isInRange(prevState - 1) ? prevState - 1 : prevState
    );
  };
  const workersCountOnChange = useCallback(
    (newValue: number) => {
      setWorkersCount((prevState) =>
        isInRange(newValue) ? newValue : prevState
      );
    },
    [setWorkersCount]
  );

  return (
    <Stack alignItems="center" rowGap={4}>
      <Typography fontSize={24} fontWeight="bold" alignItems="center">
        تنظیمات کلاستر کوبرنتیز را انتخاب کنید
      </Typography>
      <Stack
        direction="row"
        // direction={{ xs: "column", lg: "row" }}
        gap={2}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <FormControl>
          <InputLabel>ورژن‌های کوبرنتیز</InputLabel>
          <Select
            label="ورژن‌های کوبرنتیز"
            sx={{ width: 240 }}
            value={kubernetesVersion?.id || ""}
            onChange={versionOnChange}
          >
            {versionsList?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl disabled={!dataCenter}>
          <InputLabel>نسخه سیستم عامل</InputLabel>
          <Select
            label="نسخه سیستم عامل"
            sx={{ width: 240 }}
            value={osVersion?.id || ""}
            onChange={osVersionOnChange}
          >
            {osVersionsList?.length === 0 ? (
              <MenuItem disabled value="">
                موردی یافت نشد
              </MenuItem>
            ) : (
              osVersionsList?.map(({ id, name }) => {
                return (
                  <MenuItem key={id} value={id!}>
                    {name}
                  </MenuItem>
                );
              })
            )}
          </Select>
        </FormControl>
        <Counter
          label="تعداد نودهای کلاستر"
          value={workersCount}
          onChange={workersCountOnChange}
          onPlusClick={addOne}
          onMinusClick={minusOne}
        />
      </Stack>
    </Stack>
  );
};
