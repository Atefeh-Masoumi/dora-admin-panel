import { ChangeEvent, FC } from "react";
import { MenuItem, Skeleton } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { useGetApiV2CdnZoneListQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setSelectedDomainAction } from "src/app/slice/cdnSlice";

export const DomainSelect: FC = () => {
  const { data: domains, isLoading } = useGetApiV2CdnZoneListQuery();

  const selectedDomain = useAppSelector((state) => state.cdn.selectedDomain);

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!domains || domains.length === 0) return;
    const newValue = Number(event.target.value);
    const selectedItem = domains?.find((item) => item.id === newValue);
    dispatch(setSelectedDomainAction(selectedItem || null));
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
        value={selectedDomain?.id?.toString() || ""}
        onChange={handleChange}
        sx={{
          minWidth: 150,
          width: 200,
          display: { xs: "none", sm: "inline-flex" },
        }}
        size="small"
      >
        {domains &&
          domains.map(({ id, zoneName }, index) => (
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
              {zoneName}
            </MenuItem>
          ))}
      </DorsaTextField>
    );
  }
};
