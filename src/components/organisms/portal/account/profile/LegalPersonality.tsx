import { Chip, Stack, Typography } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useGetApiMyAccountCustomerGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { ConvertToJalaliWithoutTime } from "src/utils/convertToJalali";
import { e2p } from "src/utils/e2p.utils";

type LegalPersonalityDetailPropsType = {};

export const LegalPersonalityDetail: FC<
  LegalPersonalityDetailPropsType
> = () => {
  const [customerInfo, setCustomerInfo] = useState<any>([]);
  const { data, isLoading: customerInfoLoading } =
    useGetApiMyAccountCustomerGetQuery();

  console.log();

  useEffect(() => {
    if (data) {
      setCustomerInfo([
        {
          title: "نام :",
          value: data?.name ?? "",
        },
        {
          title: "نوع اکانت:",
          value: data?.isLegal ? "حقوقی" : "حقیقی",
        },
        {
          title: data?.isLegal ? "تاریخ ثبت :" : "تاریخ تولد :",
          value:
            ConvertToJalaliWithoutTime(String(data?.registrationDate)) ?? "",
        },

        {
          title: data?.isLegal ? "شناسه ملی :" : "کد ملی :",
          value: data?.nationalId ?? "",
        },

        {
          title: "تاریخ ایجاد :",
          value: ConvertToJalaliWithoutTime(String(data?.createDate)) ?? "",
        },

        {
          title: "شماره تماس :",
          value: `0${data?.phone?.slice(-10)}` ?? "",
        },
        {
          title: "تاریخ آخرین ویرایش :",
          value: ConvertToJalaliWithoutTime(String(data?.modifyDate)) ?? "",
        },
        {
          title: data?.isLegal ? "شماره ثبت :" : "شماره شناسنامه ‌:",
          value: data?.registrationNumber ?? "---",
        },
        // {
        //   id: "status",
        //   title: "وضعیت :",
        //   value: data?.status ?? "",
        // },
      ]);
    }
  }, [data]);

  return (
    <>
      {customerInfoLoading && <PageLoading />}
      <Stack
        direction={{ xs: "column", md: "row" }}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        {customerInfo &&
          customerInfo.map((item: any, index: any) => {
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
                    {/* {item.id && item.id === "status" ? (
                      <Chip
                        label={item.value}
                        size="medium"
                        sx={{
                          color:
                            item.value &&
                            (item.value === "فعال" ||
                              item.value === "تایید شده")
                              ? "success.main"
                              : "warning.main",
                          bgcolor:
                            item.value &&
                            (item.value === "فعال" ||
                              item.value === "تایید شده")
                              ? "success.light"
                              : "warning.light",
                        }}
                      />
                    ) : (
                      <Typography>{e2p(item.value || "")}</Typography>
                    )} */}
                    <Typography>{e2p(item.value || "")}</Typography>
                  </>
                </Stack>
              </Fragment>
            );
          })}
      </Stack>
    </>
  );
};
