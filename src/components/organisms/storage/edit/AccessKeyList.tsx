import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  useGetApiMyStorageUserListByStorageHostIdQuery,
  usePostApiMyStorageUserCreateMutation,
} from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { AddAccessKeyDialog } from "./dialogs/AddAccessKeyDialog";
import { accessKeyTableStruct } from "./tables/AccessKeyStruct";
import { AccessKeyTableRow } from "./tables/AccessKeyTableRow";

type AccessKeyListPropsType = {};

type AccessKeyContextValueType = {
  refetchUsersData: () => any;
};

const AccessKeyList: FC<AccessKeyListPropsType> = () => {
  const { id } = useParams();

  const {
    data,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetApiMyStorageUserListByStorageHostIdQuery({
    storageHostId: id ? +id : 0,
  });

  const [callCreateAccessKey, { isLoading: createAccessKeyIsLoading }] =
    usePostApiMyStorageUserCreateMutation();

  const [showDialog, setShowDialog] = useState(false);

  const closeDialog = () => setShowDialog(false);

  const [generatedKeys, setGeneratedKeys] = useState({
    accessKey: "",
    secretKey: "",
  });

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const createAccessKey = () => {
    callCreateAccessKey({
      createStorageUserModel: { storageHostId: id ? +id : 0 },
    })
      .unwrap()
      .then((res: any) => {
        setGeneratedKeys({
          accessKey: res.accessKey || "",
          secretKey: res.secretKey || "",
        });
        refetch();
        setShowDialog(true);
      });
  };

  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12} md={10}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{
            borderRadius: BORDER_RADIUS_1,
            p: { xs: 2.5 },
            height: "100%",
          }}
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
              <Typography align="center" fontWeight={700} fontSize={18}>
                لیست کلید های دسترسی
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                onClick={() => createAccessKey()}
                variant="outlined"
                size="large"
                disabled={createAccessKeyIsLoading}
                sx={{
                  whiteSpace: "nowrap",
                  px: 1.2,
                  borderRadius: BORDER_RADIUS_1,
                  width: "220px",
                }}
                startIcon={
                  createAccessKeyIsLoading ? (
                    <></>
                  ) : (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: 24,
                        height: 24,
                        border: ({ palette }) =>
                          "1px solid " + palette.primary.main,
                        borderRadius: BORDER_RADIUS_1,
                      }}
                    >
                      <Add
                        fontSize="small"
                        sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }}
                      />
                    </Stack>
                  )
                }
              >
                {createAccessKeyIsLoading ? (
                  <Skeleton variant="text" width="220px" />
                ) : (
                  " ایجاد کلید دسترسی جدید"
                )}
              </Button>
            </Stack>
          </Stack>
          <Divider />
          <Box width="100%" sx={{ pt: 1.5 }}>
            <BaseTable
              struct={accessKeyTableStruct}
              RowComponent={AccessKeyTableRow}
              rows={data || []}
              text="در حال حاضر کلید دسترسی وجود ندارد"
              isLoading={isLoading}
              initialOrder={9}
            />
          </Box>
          {showDialog && (
            <AddAccessKeyDialog
              onClose={closeDialog}
              accessKeyProp={generatedKeys.accessKey}
              secretKeyProp={generatedKeys.secretKey}
            />
          )}
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default AccessKeyList;
