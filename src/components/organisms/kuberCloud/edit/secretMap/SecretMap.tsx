import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery } from "src/app/services/api.generated";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { CreateSecretMapDialog } from "../../dialog/CreateSecretMapDialog";
import { KubernetesCloudSecretMapTableRow } from "../../tables/KubernetesCloudSecretMapTableRow";
import { kubernetesCloudSecretMapTableStruct } from "../../tables/struct";

type KubernetesCloudSecretMapPropsType = {};

export const KubernetesCloudSecretMap: FC<
  KubernetesCloudSecretMapPropsType
> = () => {
  const { id: kubernetesCloudId } = useParams();
  const [openAddSecretMapDialog, setOpenAddSecretMapDialog] =
    useState<boolean>(false);

  const { data = [], isLoading } =
    useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  function handleOpenAddSecretMapDialog() {
    setOpenAddSecretMapDialog(true);
  }

  function handleCloseAddSecretMapDialog() {
    setOpenAddSecretMapDialog(false);
  }

  return (
    <Stack
      bgcolor="white"
      py={3}
      px={3}
      width="100%"
      borderRadius={3}
      direction="column"
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        rowGap={3}
      >
        <Typography fontSize={18} color="secondary">
          لیست Secret
        </Typography>
        <Button
          onClick={handleOpenAddSecretMapDialog}
          variant="outlined"
          size="large"
          sx={{
            whiteSpace: "nowrap",
            px: 1.2,
            borderRadius: BORDER_RADIUS_1,
          }}
          startIcon={
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 24,
                height: 24,
                border: ({ palette }) => "1px solid " + palette.primary.main,
                borderRadius: BORDER_RADIUS_1,
              }}
            >
              <Add
                fontSize="small"
                sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }}
              />
            </Stack>
          }
        >
          افزودن Secret
        </Button>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
      <Box width="100%" sx={{ pt: 1.5 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data &&
                  data.length > 0 &&
                  kubernetesCloudSecretMapTableStruct.map((item, index) => {
                    return (
                      <TableCell align="center" key={index}>
                        {item.label}
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <Stack spacing={1} px={2}>
                  {[...Array(10)].map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={50}
                      sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                    />
                  ))}
                </Stack>
              ) : data && data?.length === 0 ? (
                <EmptyTable text={"در حال حاضر Secret وجود ندارد"} />
              ) : (
                <>
                  {data?.map((item, index) => {
                    return (
                      <KubernetesCloudSecretMapTableRow
                        rowBgColor={
                          (index + 1) % 2 === 0 ? "" : "rgba(240, 247, 255, 1)"
                        }
                        key={index}
                        row={item}
                      />
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CreateSecretMapDialog
        openDialog={openAddSecretMapDialog}
        onClose={handleCloseAddSecretMapDialog}
      />
    </Stack>
  );
};
