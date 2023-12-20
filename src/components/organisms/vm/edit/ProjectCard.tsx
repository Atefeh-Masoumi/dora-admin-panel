import { FC, MouseEventHandler, useState } from "react";
import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch } from "src/app/hooks";
import { VmProjectList } from "src/app/services/api.generated";
import { Delete, Edit } from "@mui/icons-material";
import { DeleteVmProjectDialog } from "../projects/dialogs/DeleteVmProjectDialog";
import { EditProjectDialog } from "../projects/EditProjectDialog";
import { setSelectVmProjectAction } from "src/app/slice/vmProjectSlice";

type VmProjectCardPropsType = { vmItem: VmProjectList };

export const VmProjectCard: FC<VmProjectCardPropsType> = ({ vmItem }) => {
  const { name, vmCount, createDate, id } = vmItem;
  const [openDeleteProjectDialog, setOpenDeleteProjectDialog] = useState(false);
  const [openEditProjectDialog, setOpenEditProjectDialog] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const cardClickHandler = () => {
    dispatch(setSelectVmProjectAction(vmItem));
    navigate("/vm/list");
  };

  const openDeleteProjectDialogHandler: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDeleteProjectDialog(true);
  };
  const closeDeleteProjectDialogHandler = () => {
    setOpenDeleteProjectDialog(false);
  };

  const openEditProjectDialogHandler: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setSelectVmProjectAction(vmItem));
    event.preventDefault();
    event.stopPropagation();
    setOpenEditProjectDialog(true);
  };
  const closeEditProjectDialogHandler = () => {
    setOpenEditProjectDialog(false);
    dispatch(setSelectVmProjectAction(null));
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        borderRadius={2}
        spacing={2}
        p={2.5}
        bgcolor="white"
        sx={{
          "&: hover": {
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            cursor: "pointer",
          },
        }}
        onClick={cardClickHandler}
        overflow="hidden"
      >
        <Stack
          direction="row-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Chip
            sx={{
              color: "#40BF6A",
              backgroundColor: "rgba(64, 191, 106, 0.08)",
              borderRadius: "8px",
            }}
            label="فعال"
          />
          <Typography
            fontSize={18}
            color="rgba(110, 118, 138, 1)"
            whiteSpace="nowrap"
          >
            {name}
          </Typography>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14" }} />
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>تعداد سرورهای مجازی: </Typography>
          <Typography sx={{ pr: 2 }}>{vmCount}</Typography>
        </Stack>
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>تاریخ ایجاد سرور:</Typography>
          <Typography>{createDate}</Typography>
        </Stack>
        <Divider />
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="center"
          columnGap={2}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={openDeleteProjectDialogHandler}
            endIcon={<Delete color="error" />}
          >
            حذف پروژه
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={openEditProjectDialogHandler}
            endIcon={<Edit color="info" />}
          >
            ویرایش پروژه
          </Button>
        </Stack>
      </Stack>
      <DeleteVmProjectDialog
        openDialog={openDeleteProjectDialog && !!id}
        handleClose={closeDeleteProjectDialogHandler}
        id={id!}
      />
      <EditProjectDialog
        open={openEditProjectDialog && !!id}
        onClose={closeEditProjectDialogHandler}
      />
    </>
  );
};
