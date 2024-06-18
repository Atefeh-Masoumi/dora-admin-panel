import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { e2p } from "src/utils/e2p.utils";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";

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

  return (
    <Stack
      direction="column"
      rowGap={3}
      sx={{
        cursor: itemOnClick ? "pointer" : "default",
        position: "relative",
        borderRadius: "10px",
        backgroundColor: "#fff",
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
              <ModeEdit />
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
            <DeleteOutline />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: " row",
          justifyContent: "space-between",
        }}
      >
        {detailsList.map((item, index) => (
          <Typography
            noWrap
            onClick={() => {
              if (!item.onClick) return;
              item.onClick(vmProjectData);
            }}
            color="text.light"
          >
            {item.label}{" "}
            {item.id === "isPublic" ? (
              <Chip
                color={"default"}
                label={e2p(vmProjectData[item.id] || "--")}
              />
            ) : (
              isProjectCard && (
                <Chip
                  color="default"
                  label={e2p(vmProjectData[item.id] || "--")}
                />
              )
            )}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};
