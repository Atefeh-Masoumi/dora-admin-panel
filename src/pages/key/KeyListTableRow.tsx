import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { keyTableStruct } from "./struct";
import PageLoading from "src/components/atoms/PageLoading";
import {
  VmKeyListResponse,
  useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation,
  useGetApiMyVmByProjectIdKeyListQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}
export const keyStatusIdentifier = (StatusId: number) => {
  switch (StatusId) {
    case 1:
      return {
        iconColor: "success",
        bgcolor: "success.light",
        typographyColor: "success.main",
        label: "فعال",
      };
    case 2:
      return {
        iconColor: "error",
        bgcolor: "error.light",
        typographyColor: "error.main",
        label: " غیر فعال ",
      };
    case 3:
      return {
        iconColor: "warning",
        bgcolor: "warning.light",
        typographyColor: "warning.main",
        label: "در حال انتظار",
      };
    case 4:
      return {
        iconColor: "error",
        bgcolor: "error.light",
        typographyColor: "error.main",
        label: "خطا در زیر ساخت ",
      };
    case 5:
      return {
        iconColor: "warning",
        bgcolor: "warning.light",
        typographyColor: "warning.main",
        label: "حذف شده",
      };
    default:
      return {
        iconColor: "disabled",
        bgcolor: undefined,
        typographyColor: undefined,
        label: "",
      };
  }
};
export const KeyListTableRow: FC<{ row: any }> = ({ row }) => {
  const { projectId } = useParams();

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKey, setSelectedKey] =
    useState<VmKeyListResponse | null>(null);

  const [deleteItem, { isLoading: deleteKeyRecordLoading }] =
    useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation();

  const { refetch } = useGetApiMyVmByProjectIdKeyListQuery(
    { projectId: Number(projectId) },
    { skip: !projectId }
  );

  const deleteKeyRecordHandler = () =>
    deleteItem({ 
      id: Number(selectedKey?.id),
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("کلید مورد نظر با موفقیت حذف شد");
        refetch();
        closeDialogHandler();
      })
      .catch(() => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKey(null);
  };

  const handleOpenDelete = (key: VmKeyListResponse) => {
    setSelectedKey(key);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      {deleteKeyRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {keyTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format && typeof value === "number"
            ? column.format(value)
            : value;
            const statusId = row.statusId;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={keyStatusIdentifier(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = keyStatusIdentifier(statusId).bgcolor?.split('.') || [];
                      return (palette as any)[color]?.[shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = keyStatusIdentifier(statusId).typographyColor?.split('.') || [];
                      return (palette as any)[color]?.[shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : (
                text || "-"
              )}
            </DorsaTableCell>
          );          
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="کلید"
        subTitle="برای حذف کلید موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKey?.name || ""}
        onSubmit={deleteKeyRecordHandler}
        submitLoading={deleteKeyRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(KeyListTableRow);
