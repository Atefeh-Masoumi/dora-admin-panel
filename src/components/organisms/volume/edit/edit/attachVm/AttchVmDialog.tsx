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
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Dispatch, FC, MouseEventHandler } from "react";
import { useParams } from "react-router";
import {
  useGetApiMyVmByProjectIdHostShortListQuery,
  useGetApiMyVmByProjectIdVolumeNodeGetQuery,
} from "src/app/services/api.generated";
import LoadingButton from "src/components/atoms/LoadingButton";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type AttchVmDialogType = DialogProps & {
  loading: boolean;
  onSubmit: () => void;
  setHostId: Dispatch<React.SetStateAction<number | null>>;
  forceClose: () => void;
};

export const AttchVmDialog: FC<AttchVmDialogType> = ({
  loading,
  onSubmit,
  setHostId,
  forceClose,
  ...props
}) => {
  const { blockstorageId, projectId } = useParams();

  const { data: blockstorageSpecification } =
    useGetApiMyVmByProjectIdVolumeNodeGetQuery(
      { projectId: Number(projectId), vmVolumeHostId: Number(blockstorageId) },
      { skip: !blockstorageId }
    );

  const { data: vmlist, isLoading } =
    useGetApiMyVmByProjectIdHostShortListQuery({
      projectId: Number(projectId),
    });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
  };

  return (
    <Dialog {...props}
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
          ) : (
            <Select
              onChange={(event) => setHostId(Number(event.target.value))}
              fullWidth
              defaultValue=""
            >
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
          >
            اتصال
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

