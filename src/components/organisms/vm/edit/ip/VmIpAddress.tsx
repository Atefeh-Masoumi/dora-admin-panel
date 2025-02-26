import { FC, useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  Stack,
  Skeleton,
  Button,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import {  useGetApiMyDatacenterIpListByIdQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import IpRow from "./IPRow";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import AddIpDialog from "./dialog/AddIpDialog";

const LoadingSkeleton: FC = () => (
  <Grid2
    container
    sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_1 }}
    alignItems="center"
    height={56}
  >
    <Grid2 size={{ xs:6, sm:4}} container alignItems="center" justifyContent="center">
      <Skeleton width={120} />
    </Grid2>
    <Grid2
      size={{xs:2.9 ,sm:4}}
      container
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton variant="circular" width={25} height={25} />
    </Grid2>
    <Grid2
     size={{ xs:2.9,sm:3.9}}
      container
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton variant="circular" width={25} height={25} />
    </Grid2>
  </Grid2>
);

export const VmIpAddress: FC = () => {
  // const { serverId } = useContext(EditServerContext);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { id } = useParams();
  const {data, refetch ,isLoading} = useGetApiMyDatacenterIpListByIdQuery({id:Number(id)})

  // const [getData, { isLoading }] = useLazyGetApiMyDatacenterIpListByIdQuery();
  // const [data, setData] =
  //   useState<GetApiMyDatacenterIpListByIdApiResponse | null>(null);
  // console.log(serverId);

  // useEffect(() => {
  //   if (serverId) {
  //     getData({ id: serverId })
  //       .unwrap()
  //       .then((res) => {
  //         res && setData(res);
  //       })
  //       .catch(() => {});
  //   }
  // }, [getData, serverId]);

  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };

  const closeDialogHandler = () => {
    setShowCreateDialog(false);
  };

  return (
    <>
      <Typography color="grey.700" fontSize={24} fontWeight={700}>
        آدرس IP سرور
      </Typography>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="end"
          gap={1}
        >
          <Button
            onClick={openCreateDialogHandler}
            variant="outlined"
            startIcon={<Add />}
          >
            افزودن IP
          </Button>
        </Stack>
        <br />
        <Grid2 container spacing={2} sx={{ p: 1 }}>
          <Grid2 size={{xs:12, md:6}}>
            <Paper
              component={Stack}
              direction="column"
              spacing={1}
              elevation={0}
              sx={{ p: 2.5, borderRadius: BORDER_RADIUS_1 }}
            >
              <Typography fontWeight={700} fontSize={18} align="right">
                IPv6
              </Typography>
              <Divider />
              <Grid2 container alignItems="center">
                <Grid2 size={{xs:6, sm:4}}>
                  <Typography color="grey.700" align="center">
                    آدرس IP
                  </Typography>
                </Grid2>
                <Grid2 size={{xs:3, sm:3.9}}>
                  <Typography color="grey.700" align="center">
                    Primary
                  </Typography>
                </Grid2>
                <Grid2 size={{xs:3, sm:3.9}} />
              </Grid2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                data
                  ?.filter((item) => !item.isV4)
                  .map((filteredItem, index) => {
                    return <IpRow key={index} {...filteredItem} refetch={refetch}/>;
                  })
              )}
            </Paper>
          </Grid2>
          <Grid2 size={{xs:12, md:6}}>
            <Paper
              component={Stack}
              direction="column"
              spacing={1}
              elevation={0}
              sx={{ p: 2.5, borderRadius: BORDER_RADIUS_1 }}
            >
              <Typography fontWeight={700} fontSize={18} align="right">
                IPv4
              </Typography>
              <Divider />
              <Grid2 container alignItems="center">
                <Grid2 size={{xs:6, sm:4}}>
                  <Typography color="grey.700" align="center">
                    آدرس IP
                  </Typography>
                </Grid2>
                <Grid2 size={{xs:3, sm:3.9}}>
                  <Typography color="grey.700" align="center">
                    Primary
                  </Typography>
                </Grid2>
                <Grid2 size={{xs:3, sm:3.9}} />
              </Grid2>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                data
                  ?.filter((item) => item.isV4)
                  .map((filteredItem, index) => {
                    return <IpRow key={index} {...filteredItem} refetch={refetch} />;
                  })
              )}
            </Paper>
          </Grid2>
        </Grid2>
      </Paper>
      <AddIpDialog
        maxWidth="xs"
        fullWidth
        vmId={Number(id)}
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
       refetch={refetch}
      />
    </>
  );
};
