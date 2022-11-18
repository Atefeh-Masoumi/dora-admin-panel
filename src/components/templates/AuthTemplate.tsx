import { FC, useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { East as EastIcon } from "@mui/icons-material";
import { AuthCard } from "src/components/organisms/auth/AuthCard";
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
      navigate("/dash/index");
    }
  }, [navigate, token]);

  return (
    <Box p={4} bgcolor="rgba(229, 229, 229, 0.8)" height="100vh">
      <Grid container spacing={2} height="100%">
        <Grid item xs={12} md={6}>
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" justifyContent="start" width="100%">
              <Button startIcon={<EastIcon />} color="secondary" href="./">
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
                px={2.5}
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
        <Grid item xs={6} display={{ xs: "none", md: "unset" }} height="100%">
          <AuthCard />
        </Grid>
      </Grid>
    </Box>
  );
};
