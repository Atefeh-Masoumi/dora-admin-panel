import { IconButton, Stack, Chip } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  SiemListResponse,
  useDeleteApiMySecurityByProjectIdSiemHostDeleteAndIdMutation,
  useGetApiMySecurityByProjectIdSiemHostListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { siemTableStruct } from "./struct";
import { EditOutlined } from "@mui/icons-material";
import { EditSiemDialog } from "../dialog/EditSiemDialg";

enum DIALOG_TYPE_ENUM {
  EDIT = "EDIT",
  DELETE = "DELETE",
}
const StatusList = (statusId: number) => {
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
const SiemTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSiem, setSelectedsiem] = useState<SiemListResponse | null>(null);
  const { projectId } = useParams();
  const { refetch } = useGetApiMySecurityByProjectIdSiemHostListQuery({
    projectId: Number(projectId),
  });
  const [deleteSiem, { isLoading: deleteSiemLoading }] =
    useDeleteApiMySecurityByProjectIdSiemHostDeleteAndIdMutation();

  const handleOpenDelete = (siem: SiemListResponse) => {
    setSelectedsiem(siem);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };
  const handleOpenEdit = (siem: SiemListResponse) => {
    setSelectedsiem(siem);
    setDialogType(DIALOG_TYPE_ENUM.EDIT)
  }

  const deleteSiemHandler = () => {
    if (!selectedSiem?.id) return;
    deleteSiem({
      id: selectedSiem.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("SIEM مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
        refetch();
      })
      .catch(() => { });
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedsiem(null);
  };
  const getStatusConfig = (enabled: boolean) => {
    if (enabled) {
      return {
        bgcolor: "success.light",
        typographyColor: "success.main",
        label: "فعال",
      };
    }

    return {
      bgcolor: "error.light",
      typographyColor: "error.main",
      label: "غیرفعال",
    };
  };
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {siemTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const statusId = row.statusId;
          const status = getStatusConfig((value === true));
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
                  <IconButton
                    sx={{ borderRadius: 1, ml: "auto" }}
                    color="error"
                    onClick={() => handleOpenEdit(row)}
                  >
                    <EditOutlined />
                  </IconButton>

                </Stack>

              ) : column.id === "statusId" ? (
                <Chip
                  label={StatusList(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] =
                        StatusList(statusId).bgcolor.split(".");
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] =
                        StatusList(statusId).color.split(".");
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : column.id === "osLogEnabled" || column.id === "idsLogEnabled" || column.id === "trafficAnalysisLogEnabled" || column.id === "serviceLogEnabled" ? (
                <Chip
                  size="small"
                  label={status.label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = status.bgcolor.split(".");
                      return (palette as any)[color]?.[shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = status.typographyColor.split(".");
                      return (palette as any)[color]?.[shade];
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
        keyTitle="SIEM "
        subTitle="برای حذف  SIEM موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedSiem?.name || ""}
        onSubmit={deleteSiemHandler}
        submitLoading={deleteSiemLoading}
      />
      <EditSiemDialog
        open={dialogType === DIALOG_TYPE_ENUM.EDIT}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
        data = {selectedSiem}
      />
    </Fragment>
  );
};



export default withTableRowWrapper(SiemTableRow);

