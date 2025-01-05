import { DatacenterIpListResponse, useDeleteApiMyDatacenterIpDeleteByIdMutation } from "src/app/services/api.generated";
import {
    CheckCircleOutline as CheckCircleOutlineIcon,
    Cancel as CancelIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { FC, useContext } from "react";
import { DeleteSvg } from "src/components/atoms/svg-icons/DeleteSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { useLazyGetApiMyDatacenterIpListByIdQuery } from "src/app/services/api";
import { EditServerContext } from "../rebuild/contexts/EditServerContext";
  

const IpRow: FC<DatacenterIpListResponse> = ({ ip, isPrimary, id }) => {
    const { serverId } = useContext(EditServerContext);
    const [getData, ] =
        useLazyGetApiMyDatacenterIpListByIdQuery();
    const [deleteIp, { isLoading }] =
      useDeleteApiMyDatacenterIpDeleteByIdMutation();
    const onClick = () => {
      id &&
        deleteIp({ id })
        .unwrap()
        .then((res) => {
          toast.success(" با موفقیت حذف شد");
          serverId && getData({id:serverId})
        })
        .catch((err) => {});
    };
  
    return (
      <Grid2
        container
        sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_1 }}
        alignItems="center"
      >
        <Grid2
          xs={6}
          sm={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography maxWidth={125} textOverflow="ellipsis">
            {ip}
          </Typography>
        </Grid2>
        <Grid2
          xs={2.8}
          sm={3.9}
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
        <Grid2
          xs={2.8}
          sm={3.9}
          container
          alignItems="center"
          justifyContent="center"
        >
          {isLoading ? (
            <IconButton disabled>
              <CircularProgress size={25} />
            </IconButton>
          ) : (
            <IconButton onClick={onClick}>
              <DeleteSvg />
            </IconButton>
          )}
        </Grid2>
      </Grid2>
    );
  };
  export default IpRow