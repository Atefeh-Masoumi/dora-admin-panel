import { TabContext, TabPanel } from "@mui/lab";
import { Container, Stack, Tabs, Typography } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { DnsCostEstimator } from "src/components/organisms/portal/calculator/DnsCostEstimator";
import { KubernetesCostEstimator } from "src/components/organisms/portal/calculator/KubernetesCostEstimator";
import { StorageCostEstimator } from "src/components/organisms/portal/calculator/StorageCostEstimator";
import { VmCostEstimator } from "src/components/organisms/portal/calculator/VmCostEstimator";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const a11yProps = (index: number) => {
  return {
    id: `calculator-tab-${index}`,
    "aria-controls": `calculator-tabpanel-${index}`,
  };
};

const Calculator: FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const [value, setValue] = useState(tab || "1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`?tab=${newValue}`);
  };

  useEffect(() => {
    if (tab && tab !== value) {
      setValue(tab);
    }
  }, [tab, value]);

  useEffect(() => {
    const initialTab = new URLSearchParams(window.location.search).get("tab");
    if (initialTab) {
      setValue(initialTab);
    }
  }, []);

  return (
    <Stack
      bgcolor="white"
      py={1}
      px={1}
      borderRadius={3}
      direction="column"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        columnGap={1}
        sx={{ mb: 1 }}
      >
        <Typography variant="title7" fontWeight={700} color="#202020">
          ماشین حساب
        </Typography>
        <Typography variant="title7" fontWeight={700} color="primary">
          خدمات ابری
        </Typography>
      </Stack>
      <TabContext value={value}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            border: "1px solid #DCE7FD",
            borderRadius: BORDER_RADIUS_1,
            width: "70%",
          }}
        >
          <Tabs
            variant="fullWidth"
            sx={{
              width: "100%",
              bgcolor: "white",
              py: 0.5,
              borderRadius: BORDER_RADIUS_1,
            }}
            TabIndicatorProps={{ style: { display: "none" } }}
            value={value}
            onChange={handleChange}
          >
            <DorsaTab {...a11yProps(1)} label="سرور ابری" value="1" />
            <DorsaTab {...a11yProps(2)} label="کلاستر کوبرنتیز" value="2" />
            <DorsaTab {...a11yProps(3)} label="DNS ابری" value="3" />
            <DorsaTab {...a11yProps(4)} label="ذخیره‌ساز ابری" value="4" />
          </Tabs>
        </Container>
        <TabPanel value="1" sx={{ p: 0, my: 3 }}>
          <VmCostEstimator />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0, my: 3 }}>
          <KubernetesCostEstimator />
        </TabPanel>
        <TabPanel value="3" sx={{ p: 0, my: 3 }}>
          <DnsCostEstimator />
        </TabPanel>
        <TabPanel value="4" sx={{ p: 0, my: 3 }}>
          <StorageCostEstimator />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default Calculator;
