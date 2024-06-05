import { DeleteOutline } from "@mui/icons-material";
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
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { e2p } from "src/utils/e2p.utils";

type detailsListType = {
  label: string;
  id: string;
  onClick?: (selectedRow: any) => any;
};

type DomainCardPropsType = {
  nameId?: string;
  statusId?: string;
  domainData: any;
  onEditClick?: (item: any) => any;
  onDeleteClick: (item: any) => any;
  itemOnClick?: (item: any) => any;
  detailsList: detailsListType[];
  showStatus?: boolean;
  isDomainCard?: boolean;
};

export const DomainCard: FC<DomainCardPropsType> = ({
  domainData,
  nameId = "zoneName",
  statusId = "zoneStatusId",
  onDeleteClick,
  itemOnClick,
  detailsList,
  isDomainCard = false,
}) => {
  const isActive = useMemo(
    () => domainData?.statusId === 2,
    [domainData?.statusId]
  );

  return (
    <Stack
      direction="column"
      rowGap={3}
      sx={{
        cursor: itemOnClick ? "pointer" : "default",
        position: "relative",
        borderRadius: BORDER_RADIUS_1,
        backgroundColor: "#fff",
      }}
      px={1}
      py={2}
      onClick={() => itemOnClick && itemOnClick(domainData)}
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
            {domainData[nameId] || "--"}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          width={{ xs: "100%", md: "fit-content" }}
          justifyContent="end"
          columnGap={{ xs: 0, md: 1 }}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            color="error"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDeleteClick(domainData);
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
              alignItems={"center"}
              width="100%"
              direction={isDomainCard ? "row" : "column"}
              key={index}
              rowGap={0.8}
              columnGap={1}
            >
              <Typography
                noWrap
                onClick={() => {
                  if (!item.onClick) return;
                  item.onClick(domainData);
                }}
              >
                {isDomainCard ? (
                  <Chip
                    label={item.label || "--"}
                    sx={{
                      bgcolor: ({ palette }) =>
                        isActive ? palette.success.light : palette.error.light,
                      color: ({ palette }) =>
                        isActive ? palette.success.main : palette.error.main,
                      borderRadius: BORDER_RADIUS_1,
                    }}
                  />
                ) : (
                  e2p(domainData[item.id as any] || "--")
                )}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
