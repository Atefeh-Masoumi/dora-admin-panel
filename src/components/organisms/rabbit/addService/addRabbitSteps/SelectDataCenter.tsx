import { useContext, FC } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import {
  DatacenterListResponse,
  useGetUserV2VmDatacenterListQuery,
} from "src/app/services/api.generated";
import { AddRabbitContext } from "src/components/organisms/rabbit/addService/context/AddRabbitContext";
import asiatechImage from "src/assets/images/asiatech.png";
import mobinNetImage from "src/assets/images/mobinnet.jpg";

type SelectDataCenterPropsType = {};

export const SelectDataCenter: FC<SelectDataCenterPropsType> = () => {
  const { dataCenter, setDataCenter } = useContext(AddRabbitContext);

  const { data: dataCenterList, isLoading } =
    useGetUserV2VmDatacenterListQuery();

  const dataCenterOnClick = (dataCenter: DatacenterListResponse) =>
    setDataCenter(dataCenter);

  return (
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
                borderRadius: BORDER_RADIUS_4,
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
                  borderRadius: BORDER_RADIUS_4,
                  border: ({ palette }) =>
                    `2px solid ${isSelected
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
                  }}
                >
                  <img
                    src={id === 1 ? asiatechImage : mobinNetImage}
                    alt=""
                    style={{
                      verticalAlign: "center",
                      width: "100%",
                      height: id === 2 ? "70%" : "100%",
                    }}
                  />
                </Stack>
                <Typography
                  noWrap
                  color={isSelected ? "primary.main" : "secondary.main"}
                  sx={{ transition: "150ms" }}
                  fontWeight="bold"
                >
                  {name}
                </Typography>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
