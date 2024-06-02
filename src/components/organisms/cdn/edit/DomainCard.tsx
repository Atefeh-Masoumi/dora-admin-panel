import { FC, useMemo } from "react";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import CircleTickSvg from "src/components/atoms/svg-icons/CircleTickSvg";
import ClockSvg from "src/components/atoms/svg-icons/ClockSvg";
import { useNavigate } from "react-router";
import { useAppDispatch } from "src/app/hooks";
import { DnsListResponse } from "src/app/services/api.generated";
import { setSelectedDomainAction } from "src/app/slice/cdnSlice";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type DomainCardPropsType = { zoneItem: DnsListResponse };

export const DomainCard: FC<DomainCardPropsType> = ({ zoneItem }) => {
  const { zoneName, zoneStatusId } = zoneItem;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const cardClickHandler = () => {
    dispatch(setSelectedDomainAction(zoneItem));
    navigate(`/cdn/overview`);
  };

  const isActive = useMemo(() => zoneStatusId === 2, [zoneStatusId]);

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="space-between"
      borderRadius={BORDER_RADIUS_1}
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
            color: isActive ? "#40BF6A" : "#FB9D05",
            backgroundColor: isActive ? "rgba(64, 191, 106, 0.08)" : "#FCEDD5",
            borderRadius: "8px",
          }}
          label={isActive ? "Active" : "Pending"}
        />
        <Typography
          fontSize={18}
          color="rgba(110, 118, 138, 1)"
          whiteSpace="nowrap"
        >
          {zoneName}
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
          {isActive ? `${zoneName} is Active` : "Pending Name Server Update"}
        </Typography>
        {isActive ? (
          <CircleTickSvg sx={{ color: "white" }} />
        ) : (
          <ClockSvg sx={{ color: "white" }} />
        )}
      </Stack>
    </Stack>
  );
};
