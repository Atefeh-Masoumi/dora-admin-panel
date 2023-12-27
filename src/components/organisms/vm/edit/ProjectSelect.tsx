import { ChangeEvent, FC } from "react";
import { MenuItem, Skeleton } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setSelectVmProjectAction } from "src/app/slice/vmProjectSlice";
import { useGetApiMyVmProjectListQuery } from "src/app/services/api.generated";

export const ProjectSelect: FC = () => {
  const { data: vmProjects, isLoading } = useGetApiMyVmProjectListQuery();

  const selectVmProjects = useAppSelector(
    (state) => state.vmProject.selectedVmProject
  );

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!vmProjects || vmProjects.length === 0) return;
    const newValue = Number(event.target.value);
    const selectedItem = vmProjects?.find((item) => item.id === newValue);
    dispatch(setSelectVmProjectAction(selectedItem || null));
  };

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={200}
        height={37}
        sx={{ borderRadius: BORDER_RADIUS_5 }}
      />
    );
  } else {
    return (
      <DorsaTextField
        inputProps={{ fontSize: "20px !important" }}
        select
        value={selectVmProjects?.id?.toString() || ""}
        onChange={handleChange}
        sx={{
          minWidth: 150,
          width: 200,
          display: { xs: "none", sm: "inline-flex" },
        }}
        size="small"
      >
        {vmProjects &&
          vmProjects.map(({ id, name }, index) => (
            <MenuItem
              key={index}
              value={id}
              sx={{
                borderRadius: 1,
                backgroundColor: "#F3F4F6",
                m: 0.5,
                py: 1.5,
                color: "secondary",
                "&: focus": {
                  color: "rgba(60, 138, 255, 1)",
                  backgroundColor: "rgba(60, 138, 255, 0.1)",
                },
              }}
            >
              {name}
            </MenuItem>
          ))}
      </DorsaTextField>
    );
  }
};
