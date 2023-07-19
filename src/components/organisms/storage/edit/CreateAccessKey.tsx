import { FC, useMemo } from "react";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import { Copy } from "src/components/atoms/svg/CopySvg";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type boxRowType = {
  title: string;
  value?: string | number | undefined | null;
  component?: any;
  isLoading: boolean;
};

const BoxRow: FC<boxRowType> = ({ title, value, component, isLoading }) => (
  <Stack direction="row" alignItems="center">
    <Box
      sx={{
        flexShrink: 0,
      }}
    >
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText("$$$");
          toast.success("کد کپی شد", { position: "bottom-left" });
        }}
      >
        <Copy
          sx={{
            "& path": {
              stroke: ({ palette }) => palette.secondary.main,
            },
          }}
        />
      </IconButton>
    </Box>

    {isLoading ? (
      <Skeleton width={150} height={24} />
    ) : component ? (
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {component}
      </Box>
    ) : (
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{ color: ({ palette }) => palette.grey[700], direction: "rtl" }}
        >
          {value || ""}
        </Typography>
      </Box>
    )}
    <Box
      sx={{
        flexShrink: 0,
        width: "100px",
      }}
    >
      <Typography
        sx={{
          textAlign: "right",
          color: ({ palette }) => palette.grey[700],
        }}
      >
        :{title}
      </Typography>
    </Box>
  </Stack>
);

type CreateAccessKeyPropsType = {};

export const CreateAccessKey: FC<CreateAccessKeyPropsType> = () => {
  const { id } = useParams();
  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12} md={8}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            کلید دسترسی (Access Key)
          </Typography>
          <Divider />
          <BoxRow
            title="Access Key"
            component={
              <DorsaTextField
                defaultValue={"39tg8uyea4r5htiosd8yg3w465tsgdfxsdhkw"}
                InputProps={{ readOnly: true }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontSize: {
                      xs: "12px",
                      xl: "18px",
                    },
                  },
                }}
                inputProps={{ dir: "ltr" }}
              />
            }
            isLoading={false}
          />
          <BoxRow
            title="Secret Key"
            component={
              <DorsaTextField
                defaultValue={"39tg8uyea4r5htiosd8yghkw"}
                InputProps={{ readOnly: true }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    fontSize: {
                      textAlign: "center",
                      xs: "12px",
                      xl: "18px",
                    },
                  },
                }}
                inputProps={{ dir: "ltr" }}
              />
            }
            isLoading={false}
          />
          <Stack py={3} px={3} alignItems="center" justifyContent="center">
            <LoadingButton
              loading={false}
              variant="contained"
              onClick={() => null}
              sx={{
                width: { xs: "100%", sm: "auto" },
                px: { sm: 4 },
                py: 1,
              }}
            >
              ایجاد
            </LoadingButton>
          </Stack>
        </Paper>
      </Grid2>
    </Grid2>
  );
};
