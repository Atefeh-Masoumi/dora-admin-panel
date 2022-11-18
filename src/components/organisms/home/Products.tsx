import { Box, Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  BORDER_RADIUS_2,
  BORDER_RADIUS_4,
  BORDER_RADIUS_5,
} from "src/configs/theme";
import { homeProductsConstantListItems } from "./constants/homeProductsConstant";

export const Products: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "overlay",
        overflowX: "scroll",
        mb: 3,
        scrollbarWidth: "none",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        columnGap={{ xs: 1, lg: 1.5 }}
        sx={{ width: { xs: 0, lg: 0 } }}
      >
        {homeProductsConstantListItems.map(
          ({ title, text, Icon, bgcolor, link }, index) => (
            <Link to={link} key={index}>
              <Paper
                component={Stack}
                direction="row"
                alignItems="center"
                elevation={0}
                sx={{
                  minWidth: { xs: 240, lg: 343 },
                  px: { xs: 1.5, lg: 3 },
                  py: { xs: 2, lg: 3 },
                  borderRadius: { xs: BORDER_RADIUS_2, lg: BORDER_RADIUS_4 },
                }}
                columnGap={{ xs: 0.8, lg: 1.95 }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: { xs: 48, lg: 80 },
                    height: { xs: 48, lg: 80 },
                    bgcolor,
                    borderRadius: BORDER_RADIUS_5,
                  }}
                >
                  <Icon
                    sx={{
                      width: { xs: 35.5, lg: 58 },
                      height: { xs: 35.5, lg: 58 },
                    }}
                    mode="fill"
                  />
                </Stack>
                <Stack direction="column">
                  <Typography
                    fontWeight={600}
                    variant="title5"
                    color="primary"
                    maxWidth={170}
                    sx={{ mb: { xs: -0.5, lg: 0 } }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="text14"
                    color="rgba(110, 118, 138, 0.7)"
                    maxWidth={160}
                    noWrap
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {text}
                  </Typography>
                </Stack>
              </Paper>
            </Link>
          )
        )}
      </Stack>
    </Box>
  );
};
