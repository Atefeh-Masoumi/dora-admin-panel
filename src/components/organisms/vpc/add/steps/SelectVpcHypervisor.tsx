import { Skeleton, Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import {
  HypervisorTypeListResponse,
  useGetApiMyHostHypervisorListQuery,
} from "src/app/services/api.generated";
import openstackImage from "src/assets/images/openstack.png";
import vmwareImage from "src/assets/images/vmwareLogo.png";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { AddVpcContext } from "../contexts/AddVpcContext";

type SelectVpcHypervisorPropsType = {};

export const SelectVpcHypervisor: FC<SelectVpcHypervisorPropsType> = () => {
  const { hypervisor, setHypervisor, dataCenter } = useContext(AddVpcContext);
  const isActive = Boolean(dataCenter?.id);

  const { data: hypervisorList, isLoading } =
    useGetApiMyHostHypervisorListQuery();

  const dataCenterOnClick = (hypervisor: HypervisorTypeListResponse) => {
    setHypervisor(hypervisor);
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4}>
      <Typography fontSize={24} fontWeight="bold" alignItems="center">
        زیرساخت را انتخاب کنید
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
        {hypervisorList &&
          hypervisorList.map((hypervisorItem) => {
            const { id, name } = hypervisorItem;
            const isSelected = hypervisor ? hypervisor.id === id : false;
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
                      isSelected && isActive
                        ? palette.primary.main
                        : "rgba(110, 118, 138, 0.12)"
                    }`,
                  overflow: "hidden",
                  p: 1,
                  cursor: isActive ? "pointer" : "not-allowed",
                  opacity: isActive ? 1 : 0.5,
                }}
                alignItems="center"
                justifyContent="center"
                spacing={1}
                onClick={() => dataCenterOnClick(hypervisorItem)}
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
                    src={id === 1 ? vmwareImage : openstackImage}
                    alt=""
                    style={{
                      verticalAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Stack>
                <Typography
                  noWrap
                  color={
                    isSelected && isActive ? "primary.main" : "secondary.main"
                  }
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
