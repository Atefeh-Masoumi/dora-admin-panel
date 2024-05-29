import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { e2p } from "src/utils/e2p.utils";

type detailsListType = {
  label: string;
  id: string;
  onClick?: (selectedRow: any) => any;
};

type ServiceListCardPropsType = {
  nameID?: string;
  statusId?: string;
  vmProjectData: any;
  onEditClick?: (item: any) => any;
  onDeleteClick: (item: any) => any;
  itemOnClick?: (item: any) => any;
  detailsList: detailsListType[];
  showStatus?: boolean;
  isProjectCard?: boolean;
};

export const AddProjectCard: FC<ServiceListCardPropsType> = ({
  vmProjectData,
  nameID = "name",
  statusId = "statusId",
  onEditClick,
  onDeleteClick,
  itemOnClick,
  detailsList,
  showStatus = true,
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
          <Avatar sx={{ bgcolor: "customColor.neutralVeryLight" }}>
            <FolderOpenIcon
              sx={{ color: "customColor.neutralDark" }}
              fontSize="medium"
            />
          </Avatar>
          <Typography
            noWrap
            maxWidth={{ xs: "100%", md: "70%" }}
            textOverflow="ellipsis"
          >
            {vmProjectData[nameID] || "--"}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          width={{ xs: "100%", md: "fit-content" }}
          justifyContent="end"
          columnGap={{ xs: 0, md: 1 }}
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
      <Box width="100%" sx={{ overflowX: "auto" }}>
        <Stack columnGap={4} alignItems="start" justifyContent="space-between">
          {detailsList.map((item, index) => (
            <Stack
              width="100%"
              direction={isProjectCard ? "row" : "column"}
              key={index}
              rowGap={0.8}
              columnGap={1}
            >
              <Typography noWrap color="text.light">
                {item.label}
              </Typography>
              <Typography
                noWrap
                onClick={() => {
                  if (!item.onClick) return;
                  item.onClick(vmProjectData);
                }}
              >
                {isProjectCard ? (
                  <Chip label={e2p(vmProjectData[item.id as any] || "--")} />
                ) : (
                  e2p(vmProjectData[item.id as any] || "--")
                )}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
