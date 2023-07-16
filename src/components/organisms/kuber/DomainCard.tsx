import { FC, useMemo, useState } from "react";
import { Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import CircleTickSvg from "src/components/atoms/svg/CircleTickSvg";
import ClockSvg from "src/components/atoms/svg/ClockSvg";
import { KubeNamespaceListResponse } from "src/app/services/api.generated";
import { setSelectedDomainAction } from "src/app/slice/cdnSlice";
import { MonitorSvg } from "src/components/atoms/svg/MonitorSvg";
import { Setting } from "src/components/atoms/svg/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { useLazyGetPortalKubeNamespaceGetLoginSessionByIdQuery } from "src/app/services/api";
import { useNavigate } from "react-router";
import { DeleteNamespaceDialog } from "./dialogs/DeleteNamespaceDialog";

type DomainCardPropsType = { item: KubeNamespaceListResponse };

export const DomainCard: FC<DomainCardPropsType> = ({ item }) => {
  const { id, datacenter, name, statusId, createDate, expireDate, status } =
    item;

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/kube/" + id);

  const [getUrl, { isLoading: getUrlLoading }] =
    useLazyGetPortalKubeNamespaceGetLoginSessionByIdQuery();

  const monitorOnClick = () =>
    getUrl({ id: id || 0 })
      .unwrap()
      .then((res) => {
        if (res.location) {
          let a = document.createElement("a");
          a.href = res.location.toString();
          a.target = "_blank";
          a.click();
        }
      });

  const isActive = useMemo(() => statusId === 2, [statusId]);

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="space-between"
      borderRadius={2}
      spacing={2}
      p={2.5}
      bgcolor="white"
      //   sx={{
      //     "&: hover": {
      //       backgroundColor: "rgba(255, 255, 255, 0.4)",
      //       cursor: "pointer",
      //     },
      //   }}
      //   onClick={cardClickHandler}
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
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor:
              statusId === 6 || statusId === 7
                ? "warning.light"
                : statusId === 2
                ? "success.light"
                : "error.light",
            color:
              statusId === 6 || statusId === 7
                ? "warning.main"
                : statusId === 2
                ? "success.main"
                : "error.main",
            py: 2.2,
            fontSize: "14px",
          }}
          label={status}
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
        justifyContent="flex-start"
        width="100%"
      >
        <Typography
          fontSize={12}
          color="#6E768A66"
          whiteSpace="nowrap"
          sx={{ pt: "4px" }}
        >
          {"تاریخ ایجاد: " + createDate}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="space-between"
        width="100%"
      >
        <Stack direction="row" alignItems="center">
          {datacenter}
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconButton
            disabled={statusId !== 2}
            sx={{
              borderRadius: 1,
            }}
            onClick={monitorOnClick}
          >
            <MonitorSvg />
            {statusId !== 2 && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -40%)",
                  fontSize: "30px",
                  color: "red",
                }}
              >
                &#10005;
              </div>
            )}
          </IconButton>

          <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
            <Setting
              sx={{
                "&> path": {
                  stroke: ({ palette }) => palette.grey[700],
                },
              }}
            />
          </IconButton>
          <IconButton
            sx={{ borderRadius: 1 }}
            color="error"
            onClick={handleOpenDelete}
          >
            <TrashSvg />
          </IconButton>
        </Stack>
      </Stack>
      <DeleteNamespaceDialog
        id={id || 0}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Stack>
  );
};
