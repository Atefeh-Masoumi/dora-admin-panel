import { FC, useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { East as EastIcon } from "@mui/icons-material";
import { AuthCard } from "src/components/organisms/account/AuthCard";
import { useNavigate } from "react-router";
import { useAppSelector } from "src/app/hooks";

type AuthTemplatePropsType = {
  title: string;
  children: any;
};

export const AuthTemplate: FC<AuthTemplatePropsType> = ({
  title,
  children,
}) => {
  const navigate = useNavigate();

  const token = useAppSelector((store) => store.auth?.accessToken);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <Box
      p={{ xs: 2, sm: 3, md: 4 }}
      bgcolor="rgba(229, 229, 229, 0.8)"
      // height="100vh"
      minHeight="100vh"
    >
      <Grid container spacing={2} height="100%">
        <Grid item xs={12} md={6}>
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" justifyContent="start" width="100%">
              <Button
                startIcon={<EastIcon />}
                color="secondary"
                href="https://dorsa.cloud"
              >
                بازگشت به خانه
              </Button>
            </Stack>
            <Stack spacing={4} alignItems="center" width="100%">
              <Typography fontSize={24} fontWeight={700}>
                {title}
              </Typography>
              <Stack
                bgcolor="white"
                py={3.5}
                px={{ xs: 1.5, sm: 2.5 }}
                spacing={2}
                borderRadius={3}
                sx={{ width: "100%", maxWidth: "450px" }}
              >
                {children}
              </Stack>
            </Stack>
            <div />
          </Stack>
        </Grid>
        <Grid
          item
          xs={6}
          display={{ xs: "none", md: "unset" }}
          minHeight="95vh"
        >
          <AuthCard />
        </Grid>
      </Grid>
    </Box>
  );
};
