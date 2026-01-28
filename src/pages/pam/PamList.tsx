import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import {
  useGetApiMySecurityByProjectIdPamHostListQuery,
  PamListResponse,
} from "src/app/services/api.generated";
import PamTableRow from "src/components/organisms/pam/pamlist/PamTableRow";
import { pamTableStruct } from "src/components/organisms/pam/pamlist/struct";
import { AddPamDialog } from "./AddPam";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const PamList: FC = () => {
  const { projectId } = useParams();
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedPam, setSelectedPam] =
    useState<PamListResponse | null>(null);

  const {
    data: PamList = [],
    isLoading: getpamListLoading,
    refetch,
    isFetching,
  } = useGetApiMySecurityByProjectIdPamHostListQuery({
    projectId: Number(projectId),
  });


  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const filteredList = useMemo(() => {
    if (PamList.length === 0) return PamList;
    return (
      PamList.filter((item) =>
        item.name?.trim().toLowerCase()?.includes(search.trim().toLowerCase())
      ) || []
    );
  }, [search, PamList]);

  const createPamOnClick = () => {
    setDialogType(DIALOG_TYPE_ENUM.CREATE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedPam(null);
  };


  return (
    <>
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
              لیست PAMها
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام  PAM"
            />
            <Button
              onClick={createPamOnClick}
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
              }
            >
              ایجاد PAM جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={pamTableStruct}
            RowComponent={PamTableRow}
            rows={filteredList}
            text="در حال حاضر  PAM وجود ندارد"
            isLoading={getpamListLoading}
            initialOrder={0}
          />
        </Box>
      </Stack>
      <AddPamDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
      
    </>
  );
};

export default PamList;

