import { Chip, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { useGetApiMyAccountCustomerGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { e2p } from "src/utils/e2p.utils";

type LegalPersonalityDetailPropsType = {};

export const LegalPersonalityDetail: FC<
  LegalPersonalityDetailPropsType
> = () => {
  const { data, isLoading: customerInfoLoading } =
    useGetApiMyAccountCustomerGetQuery();

  const customerInfo = [
    {
      title: "نام :",
      value: data?.name ?? "",
    },
    {
      title: "تاریخ ثبت/تولد :",
      value: data?.registrationDate ?? "",
    },

    {
      title: "شناسه/کد ملی :",
      value: data?.nationalId ?? "",
    },

    {
      title: "تاریخ ایجاد :",
      value: data?.createDate?.split(" ")[0] ?? "",
    },

    {
      title: "شماره تماس :",
      value: `0${data?.phone?.slice(-10)}` ?? "",
    },
    {
      title: "تاریخ آخرین ویرایش :",
      value: data?.modifyDate?.split(" ")[0] ?? "",
    },
    {
      title: "شماره شناسنامه/ثبت :",
      value: data?.registrationNumber ?? "",
    },
    {
      id: "status",
      title: "وضعیت :",
      value: data?.status ?? "",
    },
  ];

  return (
    <>
      {customerInfoLoading && <PageLoading />}
      <Stack
        direction={{ xs: "column", md: "row" }}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        {customerInfo.map((item, index) => {
          return (
            <Fragment key={index}>
              <Stack
                justifyContent="space-between"
                direction={"row"}
                sx={{
                  width: { xs: "90%", md: "45%" },
                  py: 2,
                  mx: { md: 2 },
                }}
              >
                <>
                  <Typography
                    sx={{
                      textAlign: "right",
                      opacity: "0.7",
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.id && item.id === "status" ? (
                    <Chip
                      label={item.value}
                      size="medium"
                      sx={{
                        color:
                          item.value &&
                          (item.value === "فعال" || item.value === "تایید شده")
                            ? "success.main"
                            : "warning.main",
                        bgcolor:
                          item.value &&
                          (item.value === "فعال" || item.value === "تایید شده")
                            ? "success.light"
                            : "warning.light",
                      }}
                    />
                  ) : (
                    <Typography>{e2p(item.value || "")}</Typography>
                  )}
                </>
              </Stack>
            </Fragment>
          );
        })}
      </Stack>
    </>
  );
};
