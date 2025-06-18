import {  useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation } from "src/app/services/api.generated";
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
import { useParams } from "react-router";

type IpRowProps = {
  refetch: () => void;
  ipAddress: string | null;
  isPrimary?: boolean;
  id: number;
}

const IpRow: FC<IpRowProps> = ({ ipAddress,isPrimary, id, refetch }) => {
  const [deleteIp, { isLoading }] = useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State to control the dialog
  
  const {projectId} = useParams();
  const handleDelete = () => {
    if (id) {
      deleteIp({  projectId: Number(projectId),vmHostId: Number(id),id })
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
            {ipAddress}
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