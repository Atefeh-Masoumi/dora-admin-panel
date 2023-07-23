import { FC } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Copy } from "src/components/atoms/svg/CopySvg";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";

type boxRowType = {
  title: string;
  value?: string | number | undefined | null;
  component?: any;
  isLoading: boolean;
  clipBoardText: string;
};

const BoxRow: FC<boxRowType> = ({
  title,
  value,
  component,
  isLoading,
  clipBoardText,
}) => (
  <Stack direction="row" alignItems="center">
    <Box
      sx={{
        flexShrink: 0,
      }}
    >
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText(clipBoardText);
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

type AddAccessKeyDialogPropsType = {
  onClose: () => void;
  accessKeyProp: string;
  secretKeyProp: string;
};

export const AddAccessKeyDialog: FC<AddAccessKeyDialogPropsType> = ({
  onClose,
  accessKeyProp,
  secretKeyProp,
}) => {
  return (
    <Dialog
      open
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2.5, maxWidth: "850px" },
      }}
    >
      <DialogTitle>نمایش کلید دسترسی</DialogTitle>
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Grid2
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
          <Grid2 xs={12} md={8}>
            <BoxRow
              title="Access Key"
              clipBoardText={accessKeyProp}
              component={
                <DorsaTextField
                  defaultValue={accessKeyProp}
                  InputProps={{ readOnly: true }}
                  sx={{
                    pt: 1,
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
              clipBoardText={secretKeyProp}
              component={
                <DorsaTextField
                  defaultValue={secretKeyProp}
                  InputProps={{ readOnly: true }}
                  sx={{
                    pt: 1,
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
          </Grid2>
        </Grid2>
      </Stack>
    </Dialog>
  );
};
