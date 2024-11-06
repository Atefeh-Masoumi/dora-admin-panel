import { TabContext, TabPanel } from "@mui/lab";
import {
  Container,
  Stack,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { DnsCostEstimator } from "src/components/organisms/portal/calculator/DnsCostEstimator";
import { KubernetesCostEstimator } from "src/components/organisms/portal/calculator/KubernetesCostEstimator";
import { StorageCostEstimator } from "src/components/organisms/portal/calculator/StorageCostEstimator";
import { VmCostEstimator } from "src/components/organisms/portal/calculator/VmCostEstimator";
import { VpcCostEstimator } from "src/components/organisms/portal/calculator/VpcCostEstimator";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      // bgcolor="white"
      py={1}
      px={1}
      borderRadius={3}
      direction="column"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <Stack
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
      </Stack> */}
      {/* <Stack sx={{ width: { xs: "100%", lg: "80%" } }}> */}
      <Stack sx={{  }}>
        <TabContext value={value}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              // mt: 2,
              margin: "10px auto",
              // border: "1px solid #DCE7FD",
              borderRadius: BORDER_RADIUS_1,
            }}
          >
            <Tabs
              variant={isMobile ? "scrollable" : "fullWidth"}
              sx={{
                width: "90%",
                bgcolor: "white",
                py: 1,
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
              <DorsaTab {...a11yProps(5)} label="VPC" value="5" />
            </Tabs>
          </Container>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "75%",
              margin: "0 auto",
            }}
          >
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
            <TabPanel value="5" sx={{ p: 0, my: 3 }}>
              <VpcCostEstimator />
            </TabPanel>
          </Stack>
        </TabContext>
      </Stack>
    </Stack>
  );
};

export default Calculator;
