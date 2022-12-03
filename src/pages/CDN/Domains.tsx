import { FC, useState, useEffect, Fragment } from "react";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { SearchBox } from "src/components/molecules/SearchBox";
import { Add } from "src/components/atoms/svg/AddSvg";
import { DomainCard } from "src/components/organisms/cdn/DomainCard";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { useGetUserV2CdnZoneListQuery } from "src/app/services/api.generated";

const DomainManagement: FC = () => {
  const { data: zoneList, isLoading } = useGetUserV2CdnZoneListQuery();
  const [search, setSearch] = useState("");

  const filteredList = zoneList?.filter((zone) =>
    zone.zoneName?.includes(search)
  );

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <Fragment>
      <Stack borderRadius={2} bgcolor="white" p={{ xs: 1.8, lg: 3 }}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          px={{ xs: 2, md: 2 }}
          sx={{
            paddingBottom: windowDimenion.winWidth < 650 ? "10px" : "0",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="text1"
              color="rgba(110, 118, 138, 1)"
              whiteSpace="nowrap"
            >
              لیست دامنه ها
            </Typography>
            {windowDimenion.winWidth >= 650 ? (
              <SearchBox
                onChange={(text) => setSearch(text)}
                placeholder="جستجو در نام دامنه"
              />
            ) : (
              <></>
            )}
          </Stack>
          <Button
            variant="outlined"
            href="/dash/cdn/addDomain"
            size="large"
            sx={{ whiteSpace: "nowrap", px: 1.2 }}
            startIcon={
              <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
            }
          >
            افزودن دامنه جدید
          </Button>
        </Stack>
        {windowDimenion.winWidth < 650 ? (
          <SearchBox placeholder="جستجو در نام دامنه" />
        ) : (
          <></>
        )}
      </Stack>
      {filteredList && filteredList?.length <= 0 && (
        <Stack py={3}>
          <Stack bgcolor="white" borderRadius={3}>
            <EmptyTable text="دامنه ای وجود ندارد" />
          </Stack>
        </Stack>
      )}
      <Grid container justifyContent="end" spacing={3} py={3}>
        {isLoading ? (
          <Fragment>
            {[...Array(12)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                <Skeleton
                  variant="rectangular"
                  height={125}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {filteredList?.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                <DomainCard zoneItem={item} />
              </Grid>
            ))}
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
};

export default DomainManagement;
