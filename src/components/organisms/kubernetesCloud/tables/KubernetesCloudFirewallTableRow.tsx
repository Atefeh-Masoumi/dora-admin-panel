import {
    IconButton,
    Stack,
  } from "@mui/material";
  import { FC, Fragment, useState } from "react";
  import { toast } from "react-toastify";
  import {
    KuberCloudFirewallListResponse,
    useDeleteApiMyKubernetesCloudFirewallDeleteByIdMutation,
  } from "src/app/services/api.generated";
  import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
  import { DeleteDialog } from "src/components/molecules/DeleteDialog";
  import { kubernetesCloudFireWallTableStruct } from "./struct";
  import { ConvertToJalali } from "src/utils/convertToJalali";
  import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
  
  enum DIALOG_TYPE_ENUM {
    CREATE = "CREATE",
    DELETE = "DELETE",
    EDIT = "EDIT",
  }
  
  export const KubernetesCloudFirewallTableRow: FC<{
    row: any;
    rowBgColor: any;
  }> = ({ row, rowBgColor }) => {
    // const [open, setOpen] = useState(false);
    const id = row.id!;
    // const configList = row.configMaps! || [];
  
    const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
    const [
      selectedKubernetesCloudFirewall,
      setSelectedKubernetesCloudFirewall,
    ] = useState<KuberCloudFirewallListResponse | null>(null);
  
    const [deleteFirewall, { isLoading: deleteFirewallLoading }] =
      useDeleteApiMyKubernetesCloudFirewallDeleteByIdMutation();
  
    const deleteDnsRecordHandler = () =>
      deleteFirewall({ id: Number(selectedKubernetesCloudFirewall?.id) })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت حذف شد");
          closeDialogHandler();
        })
        .catch((err) => {});
  
    const closeDialogHandler = () => {
      setDialogType(null);
      setSelectedKubernetesCloudFirewall(null);
    };
  
    const handleOpenDeleteModal = (config: KuberCloudFirewallListResponse) => {
      setSelectedKubernetesCloudFirewall(config);
      setDialogType(DIALOG_TYPE_ENUM.DELETE);
    };
  
  
    return (
      <Fragment key={id}>
        <DorsaTableRow
          tabIndex={-1}
          sx={{
            backgroundColor: "white !important",
            "& > *": { borderBottom: "unset" },
            "&:nth-of-type(4n+1)": {
              backgroundColor: "rgba(240, 247, 255, 1) !important",
            },
          }}
        >
          {kubernetesCloudFireWallTableStruct.map((column, index) => {
            const value = row[column.id];
            const text = column.format ? column.format(value) : value;
            // const id = row["statusId"];
            return (
              <DorsaTableCell
                key={index}
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
                  
                    <IconButton
                      sx={{ borderRadius: 1 }}
                      color="error"
                      onClick={() => handleOpenDeleteModal(row)}
                    >
                      <TrashSvg />
                    </IconButton>
                    
                  </Stack>
                ) : (
                  <>
                    {column.id === "createDate"
                      ? ConvertToJalali(text)
                      : text || "__"}
                  </>
                )}
              </DorsaTableCell>
            );
          })}
        </DorsaTableRow>
  
        <DeleteDialog
          open={dialogType === DIALOG_TYPE_ENUM.DELETE}
          onClose={closeDialogHandler}
          keyTitle="Firewall"
          subTitle="برای حذف Firewall, عبارت امنیتی زیر را وارد کنید."
          securityPhrase={selectedKubernetesCloudFirewall?.sourceIp?.toString() || ""}
          onSubmit={deleteDnsRecordHandler}
          submitLoading={deleteFirewallLoading}
        />
       
      </Fragment>
    );
  };
  