import { FC, createContext, useMemo, useState } from "react";
import {
  useGetApiMyStorageUserListByStorageHostIdQuery,
  usePostApiMyStorageUserCreateMutation,
} from "src/app/services/api.generated";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { Add } from "@mui/icons-material";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { accessKeyTableStruct } from "./tables/AccessKeyStruct";
import { AccessKeyTableRow } from "./tables/AccessKeyTableRow";
import { AddAccessKeyDialog } from "./dialogs/AddAccessKeyDialog";
import { useParams } from "react-router";

type AccessKeyListPropsType = {};

type AccessKeyContextValueType = {
  refetchUsersData: () => any;
};

export const AccessKeyContext = createContext<AccessKeyContextValueType>({
  refetchUsersData: () => null,
});

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

  const refetchOnClick = () => refetch();

  const createAccessKey = () => {
    callCreateAccessKey({
      createStorageUserModel: { storageHostId: id ? +id : 0 },
    })
      .unwrap()
      .then((res) => {
        setGeneratedKeys({
          accessKey: res.accessKey || "",
          secretKey: res.secretKey || "",
        });
        refetch();
        setShowDialog(true);
      });
  };

  return (
    <AccessKeyContext.Provider value={{ refetchUsersData: () => refetch() }}>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={3}
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
              لیست کلید های دسترسی
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              onClick={refetchOnClick}
              variant="outlined"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_5,
              }}
              startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
            >
              بازخوانی
            </Button>

            <Button
              onClick={() => createAccessKey()}
              variant="outlined"
              size="large"
              disabled={createAccessKeyIsLoading}
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_5,
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
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
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
      </Stack>
    </AccessKeyContext.Provider>
  );
};

export default AccessKeyList;
