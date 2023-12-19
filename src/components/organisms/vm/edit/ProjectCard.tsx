import { FC } from "react";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import CircleTickSvg from "src/components/atoms/svg/CircleTickSvg";
import { useNavigate } from "react-router";
import { useAppDispatch } from "src/app/hooks";
import { VmProjectList } from "src/app/services/api.generated";
import { setSelectVmProjectsAction } from "src/app/slice/vmProjectSlice";

type VmProjectCardPropsType = { vmItem: VmProjectList };

export const VmProjectCard: FC<VmProjectCardPropsType> = ({ vmItem }) => {
  const { name, vmCount, createDate } = vmItem;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const cardClickHandler = () => {
    dispatch(setSelectVmProjectsAction(vmItem));
    navigate("/vm/list");
  };

  return (
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
        direction="row"
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
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
      >
        <Typography
          fontSize={14}
          color="#6E768A66"
          whiteSpace="nowrap"
          sx={{ pt: "4px" }}
        >
          "فعال"
        </Typography>
        <CircleTickSvg sx={{ color: "white" }} />
      </Stack>
    </Stack>
  );
};
