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
import { useGetApiMyKubernetesCloudIngressListQuery } from "src/app/services/api.generated";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { CreateConfigMapDialog } from "../../dialog/CreateConfigMapDialog";
import { KubernetesCloudConfigMapTableRow } from "../../tables/KubernetesCloudConfigMapTableRow";
import { kubernetesCloudConfigMapTableStruct } from "../../tables/struct";
import { SearchBox } from "src/components/molecules/SearchBox";

type KubernetesCloudIngressPropsType = {};

export const KubernetesCloudIngress: FC<
  KubernetesCloudIngressPropsType
> = () => {
  const [openAddIngressDialog, setOpenAddIngressDialog] =
    useState<boolean>(false);
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useGetApiMyKubernetesCloudIngressListQuery();

  function handleOpenAddIngressDialog() {
    setOpenAddIngressDialog(true);
  }

  function handleCloseAddIngressDialog() {
    setOpenAddIngressDialog(false);
  }

  return (
    <Stack
      bgcolor="white"
      py={3}
      px={3}
      width="100%"
      borderRadius={BORDER_RADIUS_1}
      direction="column"
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        rowGap={3}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
        >
          <Typography fontSize={18} color="secondary">
            لیست اینگرس
          </Typography>
          <SearchBox
            onChange={(text) => setSearch(text)}
            placeholder="جستجو در نام سرویس"
          />
        </Stack>
        <Button
          onClick={handleOpenAddIngressDialog}
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
          افزودن
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
                  kubernetesCloudConfigMapTableStruct.map((item, index) => {
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
                <EmptyTable text={"در حال حاضر Configmap وجود ندارد"} />
              ) : (
                <>
                  {data?.map((item, index) => {
                    return (
                      <KubernetesCloudConfigMapTableRow
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
      <CreateConfigMapDialog
        openDialog={openAddIngressDialog}
        onClose={handleCloseAddIngressDialog}
      />
    </Stack>
  );
};
