import { Stack } from "@mui/material";
import { FC } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { kubernetesCloudIngressTablrStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesCloudIngressTableRow: FC<{ row: any }> = ({
  row,
}) => {
  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesCloudIngressTablrStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={0.6}
                  maxWidth="fit-content"
                >
                  {/* <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
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
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton> */}
                </Stack>
              ) : (
                <>
                  {column.id === "createDate" || column.id === "modifyDate"
                    ? ConvertToJalali(text)
                    : text || "__"}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      {/* <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="سرویس Deployment"
        subTitle="برای حذف Deployment, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedDeployment?.name || ""}
        onSubmit={deleteDeploymentRecordHandler}
        submitLoading={deleteDeploymentRecordLoading}
      /> */}
    </>
  );
};
