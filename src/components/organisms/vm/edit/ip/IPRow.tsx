import { DatacenterIpListResponse, useDeleteApiMyDatacenterIpDeleteByIdMutation } from "src/app/services/api.generated";
import {
    CheckCircleOutline as CheckCircleOutlineIcon,
    Cancel as CancelIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { FC, useState } from "react";
import { DeleteSvg } from "src/components/atoms/svg-icons/DeleteSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { Grid2 } from "@mui/material";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { IPDeleteDialog } from "./dialog/IPDeleteDialog";

interface IpRowProps extends DatacenterIpListResponse {
  refetch: () => void;
}

const IpRow: FC<IpRowProps> = ({ ip, isPrimary, id, refetch }) => {
  const [deleteIp, { isLoading }] = useDeleteApiMyDatacenterIpDeleteByIdMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control the dialog

  const handleDelete = () => {
    if (id) {
      deleteIp({ id })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت حذف شد");
          refetch(); 
        })
        .catch((err) => {
          toast.error("حذف انجام نشد");
        })
        .finally(() => {
          setIsDeleteDialogOpen(false); 
        });
    }
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Grid2
        container
        sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_1 }}
        alignItems="center"
      >
        <Grid2 size={{xs:6,sm:4}} 
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography maxWidth={125} textOverflow="ellipsis">
            {ip}
          </Typography>
        </Grid2>
        <Grid2 size={{xs:2.8,sm:3.9}}
          
          container
          alignItems="center"
          justifyContent="center"
        >
          {isPrimary ? (
            <CheckCircleOutlineIcon sx={{ color: "grey.700" }} />
          ) : (
            <CancelIcon sx={{ color: "grey.700" }} />
          )}
        </Grid2>
        <Grid2 size={{xs:2.8,sm:3.9}}
          container
          alignItems="center"
          justifyContent="center"
        >
          {isLoading ? (
            <IconButton disabled>
              <CircularProgress size={25} />
            </IconButton>
          ) : (
            <IconButton onClick={openDeleteDialog}>
              <DeleteSvg />
            </IconButton>
          )}
        </Grid2>
      </Grid2>

      <IPDeleteDialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="حذف IP"
        message="آیا از حذف این IP اطمینان دارید؟ این عمل غیرقابل بازگشت است."
      />
    </>
  );
};

export default IpRow;