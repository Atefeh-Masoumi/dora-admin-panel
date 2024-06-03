import { SvgIconProps, TabProps, TabsProps, Typography } from "@mui/material";
import { Box, Stack, Tab, Tabs, styled } from "@mui/material";
import type { FC, ReactNode, SyntheticEvent } from "react";
import { useState } from "react";
import { BORDER_RADIUS_1 } from "src/configs/theme";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const CustomTab = styled(Tab)<TabProps>(({ theme }) => ({
  boxShadow: "0px 2px 28px rgba(185, 207, 252, 0.15)",
  borderRadius: BORDER_RADIUS_1,
  backgroundColor: "white",
  width: "200px",
  margin: "4px 0",
  position: "relative",
  overflow: "visible",
  "&::after": {
    transition: "300ms",
    content: '""',
    position: "absolute",
    right: -10,
    top: "30%",
    width: 0,
    height: 0,
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderLeft: "10px solid white",
    opacity: 0,
  },
}));

const CustomTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  overflow: "visible",
  gap: "10px",
  "&>.MuiTabs-scroller": {
    overflow: "visible !important",
    "&>.MuiTabs-flexContainerVertical": {
      "&>button.Mui-selected": {
        "&:after": {
          opacity: 1,
        },
      },
    },
    "&>.MuiTabs-indicator": {
      left: 0,
      width: 10,
      borderTopLeftRadius: BORDER_RADIUS_1,
      borderBottomLeftRadius: BORDER_RADIUS_1,
    },
  },
}));

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
    sx={{ bgcolor: "transparent", overflow: "visible" }}
  >
    {value === index && children}
  </Box>
);

const a11yProps = (index: number) => ({
  id: `vertical-tab-${index}`,
  "aria-controls": `vertical-tabpanel-${index}`,
});

export type tabsType = {
  title: string;
  content: any;
  icon: FC<SvgIconProps>;
};

type ProductPageTabsPropsType = {
  tabs: tabsType[];
};

const CustomTabComponent: FC<ProductPageTabsPropsType> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction="row" columnGap={2}>
      <CustomTabs orientation="vertical" value={value} onChange={handleChange}>
        {tabs.map(({ title }, index) => (
          <CustomTab label={title} key={index} {...a11yProps(index)} />
        ))}
      </CustomTabs>
      <Box sx={{ width: "100%" }}>
        {tabs.map(({ content, icon }, index) => (
          <TabPanel value={value} index={index} key={index}>
            {content}
          </TabPanel>
        ))}
      </Box>
    </Stack>
  );
};

export default CustomTabComponent;
