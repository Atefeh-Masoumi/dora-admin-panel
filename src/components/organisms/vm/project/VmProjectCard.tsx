import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { e2p } from "src/utils/e2p.utils";

type detailsListType = {
  label: string;
  id: string;
  onClick?: (selectedRow: any) => any;
};

type VmProjectCardPropsType = {
  nameId?: string;
  statusId?: string;
  vmProjectData: any;
  onEditClick?: (item: any) => any;
  onDeleteClick: (item: any) => any;
  itemOnClick?: (item: any) => any;
  detailsList: detailsListType[];
  showStatus?: boolean;
  isProjectCard?: boolean;
};

export const VmProjectCard: FC<VmProjectCardPropsType> = ({
  vmProjectData,
  nameId = "name",
  statusId = "statusId",
  onEditClick,
  onDeleteClick,
  itemOnClick,
  detailsList,
  isProjectCard = false,
}) => {
  const isEditable = useMemo(() => {
    if (!vmProjectData[statusId]) return true;
    return vmProjectData[statusId] === 2;
  }, [vmProjectData, statusId]);

  console.log({ detailsList });
  return (
    <Stack
      direction="column"
      rowGap={3}
      sx={{
        cursor: itemOnClick ? "pointer" : "default",
        position: "relative",
        borderRadius: BORDER_RADIUS_1,
        backgroundColor: "#fff",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        // boxShadow:
        //   "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
      }}
      px={1}
      py={2}
      onClick={() => itemOnClick && itemOnClick(vmProjectData)}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        justifyContent={{ xs: "center", md: "space-between" }}
      >
        <Stack
          width={{ xs: "100%" }}
          alignItems="right"
          divider={<Divider orientation="vertical" flexItem />}
          columnGap={1}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar
            sx={{
              bgcolor: `${
                vmProjectData.isPublic
                  ? "success.main"
                  : "customColor.neutralVeryLight"
              }`,
            }}
          >
            {vmProjectData.isPublic ? (
              <PublicIcon
                sx={{ color: `customColor.neutralDark` }}
                fontSize="medium"
              />
            ) : (
              <PublicOffIcon
                sx={{ color: `customColor.neutralDark` }}
                fontSize="medium"
              />
            )}
          </Avatar>
          <Typography
            noWrap
            maxWidth={{ xs: "100%", md: "70%" }}
            textOverflow="ellipsis"
          >
            {vmProjectData[nameId] || "--"}
          </Typography>
        </Stack>
        <Stack
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {onEditClick && (
            <IconButton
              disabled={!isEditable}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick(vmProjectData);
              }}
            >
              <Edit />
            </IconButton>
          )}
          <IconButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDeleteClick(vmProjectData);
            }}
          >
            <TrashSvg />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: " row",
          justifyContent: "space-between",
          paddingRight: 2,
        }}
      >
        {detailsList.map((item, index) => (
          <Typography
            key={index}
            noWrap
            onClick={() => {
              if (!item.onClick) return;
              item.onClick(vmProjectData);
            }}
            color="text.light"
          >
            {item.label}
            {item.id === "isPublic" ? (
              <Chip
                color={"default"}
                label={e2p(vmProjectData[item.id] || "--")}
                sx={{ borderRadius: BORDER_RADIUS_1 }}
              />
            ) : isProjectCard && item.id === "hypervisorType" ? (
              <Chip
                color="default"
                label={e2p(vmProjectData[item.id] || "--")}
                sx={{ borderRadius: BORDER_RADIUS_1 }}
              />
            ) : (
              <Chip
                color="default"
                label={e2p(vmProjectData[item.id] || "--")}
                sx={{ borderRadius: BORDER_RADIUS_1 }}
              />
            )}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};
