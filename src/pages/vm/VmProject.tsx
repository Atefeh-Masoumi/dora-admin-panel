import { FC, SyntheticEvent, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Tabs, Stack, Box } from "@mui/material";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { useAppSelector } from "src/app/hooks";
import { VmInfo } from "src/components/organisms/vm/edit/overview/VmInfo";
import { VmIpAddress } from "src/components/organisms/vm/edit/ip/VmIpAddress";
import { VmRebuild } from "src/components/organisms/vm/edit/rebuild/VmRebuild";
import { ServerConfig } from "src/components/organisms/vm/edit/config/ServerConfig";

const VmProjects: FC = () => {
  const selectVmProjects = useAppSelector((state) => state.vm.selectVmProjects);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("overview")) {
      result = "overview";
    }
    if (pathname.includes("vm-ip-address")) {
      result = "vm-ip-address";
    }
    if (pathname.includes("vm-rebuild")) {
      result = "vm-rebuild";
    }
    if (pathname.includes("server-config")) {
      result = "server-config";
    }
    return result;
  }, [pathname]);

  const handleChange = (_: SyntheticEvent, newValue: string) =>
    navigate("/vm/list/" + newValue);

  const renderHandler = () => {
    let result = <></>;

    switch (selectedTab) {
      case "overview":
        result = <VmInfo />;
        break;
      case "vm-ip-address":
        result = <VmIpAddress />;
        break;
      case "vm-rebuild":
        result = <VmRebuild />;
        break;
      case "server-config":
        result = <ServerConfig />;
        break;
      default:
        result = <VmInfo />;
        break;
    }
    return result;
  };

  if (!selectVmProjects) return <Navigate to="/vm-project" />;

  return (
    <Stack spacing={5} alignItems="center">
      <Box
        sx={{
          overflow: "overlay",
          maxWidth: "100%",
          bgcolor: "white",
          py: 0.5,
          borderRadius: BORDER_RADIUS_5,
        }}
      >
        <Tabs
          sx={{
            minWidth: 520,
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={selectedTab}
          onChange={handleChange}
        >
          <DorsaTab value="overview" label="مشخصات سرور" />
          <DorsaTab value="vm-ip-address" label="آدرس IP سرور" />
          <DorsaTab value="vm-rebuild" label="بازسازی سیستم عامل" />
          <DorsaTab value="server-config" label="تغییر مشخصات سخت افزاری" />
        </Tabs>
      </Box>
      {/* <Stack
        p={2.5}
        bgcolor="rgba(244, 95, 80, 1)"
        direction="row"
        spacing={1}
        borderRadius={2}
        width="100%"
        color="white"
        alignItems={{ xs: "start", md: "center" }}
      >
        <ErrorOutlineIcon />
        <Typography variant="text14">
          دامنه مورد نظر به دلیل بدهی مسدود می‌باشد، لطفا با پشتیبانی تماس
          بگیرید.
        </Typography>
      </Stack> */}
      {renderHandler()}
    </Stack>
  );
};

export default VmProjects;
