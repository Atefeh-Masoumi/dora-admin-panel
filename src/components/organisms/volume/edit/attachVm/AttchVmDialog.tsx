import {
  Button,
  Dialog,
  Select,
  MenuItem,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogContent,
  Skeleton,
  Typography,
  Stack,
} from "@mui/material";
import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import { useGetApiMyVmByProjectIdHostShortListQuery } from "src/app/services/api.generated";
import LoadingButton from "src/components/atoms/LoadingButton";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type AttchVmDialogType = DialogProps & {
  loading: boolean;
  onSubmit: () => void;
  setHostId: Dispatch<React.SetStateAction<number | null>>;
};

export const AttchVmDialog: FC<AttchVmDialogType> = ({
  loading,
  onSubmit,
  setHostId,
  open,
  onClose,
  ...props
}) => {
  const { projectId } = useParams();
  const [selectedHost, setSelectedHost] = useState<number | "">("");

  const { data: vmlist = [], isLoading } =
    useGetApiMyVmByProjectIdHostShortListQuery(
      { projectId: Number(projectId) },
      { skip: !open }
    );

  useEffect(() => {
    if (!open) {
      setSelectedHost("");
      setHostId(null);
    }
  }, [open, setHostId]);

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!onClose) return;
    onClose(event, "backdropClick");
  };
 const handleChange = (value: number) => {
   setSelectedHost(value);
   setHostId(value);
 };
 const handleClose = () => {
   onClose?.({}, "backdropClick");
 };
  return (
    <Dialog
      {...props}
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
    >
      <DialogTitle fontWeight={"700"}>اتصال به سرور ابری</DialogTitle>
      <DialogContent
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: 4,
        }}
      >
        <Stack width={"100%"} justifyContent={"start"}>
          <Typography>لیست سرور ابری *</Typography>
          {isLoading ? (
            <Skeleton width="100%" height={37} sx={{ transform: "none" }} />
          ) : vmlist.length === 0 ? (
            <Typography color="error.main">سرور ابری یافت نشد</Typography>
          ) : (
            <Select
              value={selectedHost}
              onChange={(e) => handleChange(Number(e.target.value))}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                انتخاب سرور ابری
              </MenuItem>
              {vmlist?.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 3, py: 0.8 }}
            onClick={cancelBtnOnClick}
          >
            انصراف
          </Button>
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            sx={{ px: 3, py: 0.8 }}
            onClick={onSubmit}
            disabled={!selectedHost}
          >
            اتصال
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
