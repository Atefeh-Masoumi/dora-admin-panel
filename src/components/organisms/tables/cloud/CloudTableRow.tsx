import { FC, Fragment, useState } from "react";
import { cloudTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Chip, IconButton, Stack } from "@mui/material";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { MonitorSvg } from "src/components/atoms/svg/MonitorSvg";
import { Setting } from "src/components/atoms/svg/SettingSvg";
import { DeleteCloudDialog } from "../../cloudServer/DeleteCloudDialog";
import { useNavigate } from "react-router";
import { usePostApiV2VmVmKmsGetMutation } from "src/app/services/api.generated";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import { useLazyGetApiV2VmVmPayByIdQuery } from "src/app/services/api";
import PageLoading from "src/components/atoms/PageLoading";

export const CloudTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [getUrl, { isLoading: getUrlLoading }] =
    usePostApiV2VmVmKmsGetMutation();
  // const [getOrderId, { isLoading: getOrderIdLoading }] =
  //   useLazyGetApiV2VmVmPayByIdQuery();

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/cloud/" + row["id"]);
  // const goToOrderDetails = () => {
  //   if (!row["id"] || isNaN(Number(row["id"]))) return;
  //   getOrderId({ id: Number(row["id"]) })
  //     .unwrap()
  //     .then((res) => {
  //       if (!res) return;
  //       navigate("/cart/" + res);
  //     });
  // };
  const monitorOnClick = () =>
    getUrl({
      getKmsModel: {
        id: row["id"],
        typeId: 2,
      },
    })
      .unwrap()
      .then((res) => {
        if (res) {
          let a = document.createElement("a");
          a.target = "_blank";
          a.href = "/console/wmks-sdk.html?url=" + res;
          a.click();
        }
      });

  return (
    <Fragment>
      {getUrlLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {cloudTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const isActive = row["statusId"] === 2;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  {/* <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={goToOrderDetails}
                  >
                    <CreditCardIcon sx={{ color: "grey.700" }} />
                  </IconButton> */}
                  <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ borderRadius: 1 }} onClick={monitorOnClick}>
                    <MonitorSvg />
                  </IconButton>
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={handleOpenDelete}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  {column.id === "statusId" ? (
                    <Chip
                      clickable={false}
                      label={isActive ? "فعال" : "غیرفعال"}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: isActive
                          ? "success.light"
                          : "error.light",
                        color: isActive ? "success.main" : "error.main",
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : (
                    text
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteCloudDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
