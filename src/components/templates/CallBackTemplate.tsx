import { FC } from "react";
import { Container, Stack } from "@mui/material";
import { customBreakpoints } from "src/configs/theme";

type breakpointsType = keyof typeof customBreakpoints;

const containerMaxWidthDefault: breakpointsType = "xs";

export const sidebarWidth = 240;

export type CallBackTemplatePropsType = {
  children?: any;
  containerMaxWidth?: breakpointsType;
};

export const CallBackTemplate: FC<CallBackTemplatePropsType> = ({
  children,
  containerMaxWidth = containerMaxWidthDefault,
}) => {
  return (
    <Stack
      p={2}
      height="100vh"
      width="100vw"
      bgcolor="#F5F5F5"
      justifyContent="center"
      alignItems="center"
      overflow="overlay"
    >
      <Container maxWidth={containerMaxWidth}>{children}</Container>
    </Stack>
  );
};
