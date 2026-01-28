import {  IconButton, Stack, Chip } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  PamListResponse,
  useDeleteApiMySecurityByProjectIdPamHostDeleteAndIdMutation,
  useGetApiMySecurityByProjectIdPamHostListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { pamTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  REVERT = "REVERT",
  DELETE = "DELETE",
}
const pamStatusList = (statusId: number) => {
    switch (statusId) {
      case 1:
        return {
          id: 1,
          label: "فعال",
          bgcolor: "success.light",
          color: "success.main",
        };
      case 2:
        return {
          id: 2,
          label: "غیرفعال",
          bgcolor: "error.light",
          color: "error.main",
        };
      case 3:
        return {
          id: 3,
          label: "حذف شده",
          bgcolor: "warning.light",
          color: "warning.main",
        };
      case 4:
        return {
          id: 4,
          label: "درانتظار",
          bgcolor: "warning.light",
          color: "warning.main",
        };
      case 5:
        return {
          id: 5,
          label: "ناموفق",
          bgcolor: "error.light",
          color: "error.main",
        };
      default:
        return {
          id: 0,
          label: "نامشخص",
          bgcolor: "error.light",
          color: "error.main",
        };
    }
  };
const PamTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedPam, setSelectedPam] = useState<PamListResponse | null>(null);
  const { projectId } = useParams();
  const { refetch } = useGetApiMySecurityByProjectIdPamHostListQuery({
    projectId: Number(projectId),
  });
const [deletePam, { isLoading: deletePamLoading }] =
    useDeleteApiMySecurityByProjectIdPamHostDeleteAndIdMutation();

  const handleOpenDelete = (pam: PamListResponse) => {
    setSelectedPam(pam);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };
 
   const deletePamHandler = () => {
     if (!selectedPam?.id) return;
     deletePam({
       id: selectedPam.id,
       projectId: Number(projectId),
     })
       .unwrap()
       .then(() => {
         toast.success("PAM مورد نظر با موفقیت حذف شد");
         closeDialogHandler();
         refetch();
       })
       .catch(() => {});
   };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedPam(null);
  };
  
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {pamTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const statusId = row.statusId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  justifyContent="end"
                  spacing={0.6}
                  maxWidth="100%"
                >
                  <IconButton
                    sx={{ borderRadius: 1, ml: "auto" }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={pamStatusList(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] =
                        pamStatusList(statusId).bgcolor.split(".");
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] =
                        pamStatusList(statusId).color.split(".");
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : (
                <>{text}</>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="PAM "
        subTitle="برای حذف  PAM موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedPam?.name || ""}
        onSubmit={deletePamHandler}
        submitLoading={deletePamLoading}
      />
    </Fragment>
  );
};



export default withTableRowWrapper(PamTableRow);

