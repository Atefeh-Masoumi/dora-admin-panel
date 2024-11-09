import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import {
  DatacenterListResponse,
  useGetApiMyDatacenterListQuery,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { AddVpcContext } from "../contexts/AddVpcContext";
import asiatechImage from "src/assets/images/asiatech.png";
import mobinNetImage from "src/assets/images/mobinnet.png";
import DomainIcon from "@mui/icons-material/Domain";

type SelectKuberDataCenterPropsType = {};

export const SelectVpcDataCenter: FC<SelectKuberDataCenterPropsType> = () => {
  const { dataCenter, setDataCenter } = useContext(AddVpcContext);

  const { data: dataCenterList, isLoading } = useGetApiMyDatacenterListQuery();

  const dataCenterOnClick = (dataCenter: DatacenterListResponse) => {
    setDataCenter(dataCenter);
  };

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, width: "100%", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={4}>
        <Typography fontSize={24} fontWeight="bold" alignItems="center">
          مرکز داده را انتخاب کنید
        </Typography>
        <Stack
          justifyContent="center"
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ width: "100%" }}
        >
          {isLoading &&
            [...Array(2)].map((_, index) => (
              <Stack
                key={index}
                direction="row"
                sx={{
                  width: { xs: "100%", sm: 200 },
                  height: 96,
                  transition: "150ms",
                  borderRadius: BORDER_RADIUS_1,
                  border: "1px solid rgba(110, 118, 138, 0.12)",
                  overflow: "hidden",
                  p: 1,
                  cursor: "pointer",
                }}
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Skeleton variant="circular" width={44} height={44} />
                <Skeleton width="30%" />
              </Stack>
            ))}
          {dataCenterList &&
            dataCenterList.map((dataCenterItem) => {
              const { id, name } = dataCenterItem;
              const isSelected = dataCenter ? dataCenter.id === id : false;
              return (
                <Stack
                  key={id}
                  direction="row"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: 96,
                    transition: "150ms",
                    borderRadius: BORDER_RADIUS_1,
                    border: ({ palette }) =>
                      `2px solid ${
                        isSelected
                          ? palette.primary.main
                          : "rgba(110, 118, 138, 0.12)"
                      }`,
                    overflow: "hidden",
                    p: 1,
                    cursor: "pointer",
                  }}
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  onClick={() => dataCenterOnClick(dataCenterItem)}
                >
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      transition: "150ms",
                      filter: isSelected ? "grayscale(0)" : "grayscale(100%)",
                      height: "41px",
                      overflow: "hidden",
                      display: "flex",
                      margin: "0 auto",
                    }}
                  >
                    <DomainIcon />
                  </Stack>
                  <Typography
                    noWrap
                    color={isSelected ? "primary.main" : "secondary.main"}
                    sx={{ transition: "150ms" }}
                    fontWeight="bold"
                    fontSize={20}
                  >
                    {name}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </Stack>
    </Paper>
  );
};
