import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyObjectStorageHostListQuery,
  usePostApiMyObjectStorageHostCreateMutation,
} from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { AddStorageContext } from "src/components/organisms/storage/add/contexts/AddStorageContext";
import { SelectConfig } from "src/components/organisms/storage/add/steps/SelectConfig";
import { SelectDataCenter } from "src/components/organisms/storage/add/steps/SelectDataCenter";
import { ServerInfo } from "src/components/organisms/storage/add/steps/ServerInfo";
import { SelectConfigType } from "src/components/organisms/vm/add/steps/SelectConfigType";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

const mapConfig = {
  disk: "Disk",
};

const AddStorageService: FC = () => {
  const {
    dataCenter,
    serverConfig,
    name,
    isPredefined,
    setIsPredefined,
    customConfig,
  } = useContext(AddStorageContext);

  const navigate = useNavigate();

  const [createStorageService, { isLoading }] =
    usePostApiMyObjectStorageHostCreateMutation();

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.STORAGE,
    });

  const { refetch } = useGetApiMyObjectStorageHostListQuery();

  const mapCustomConfig = useMemo(() => {
    return [
      {
        numberOfItem: customConfig.disk || 0,
        name: mapConfig.disk || "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.CloudDisk)
            ?.price || 0,
      },
    ];
  }, [customConfig, productItems]);

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (!name) {
      validationErrorMessage = "لطفا نام سرویس را انتخاب کنید";
    } else if (name.length < 3) {
      validationErrorMessage = "نام سرویس نمی تواند کمتر از سه حرف باشد";
    } else if (isPredefined && (!serverConfig || !serverConfig.id)) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      // TODO: add "storageHostTypeId";
      createStorageService({
        createStorageHostModel: {
          name: name,
          isPublic: false,
          datacenterId: dataCenter?.id || 0,
          productBundleId: serverConfig?.id || 0,
          isPredefined: isPredefined,
          disk: customConfig.disk,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("سرویس فضای ابری با موفقیت ایجاد شد");
          navigate("/storage");
          refetch();
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد فضای ابری جدید
      </Typography>
      <Box sx={{ my: 0 }}>
        <Grid container>
          <Grid xs={12} md={8} item>
            <Stack
              // component={Paper}
              sx={{
                position: "relative",
                width: { xs: "100%" },
                px: { xs: 1.8, lg: 2 },
                py: { xs: 1.8, lg: 2.25 },
              }}
            >
              <Grid container gap={2}>
                <Grid xs={12} item>
                  <SelectDataCenter />
                  {/* <Divider sx={{ margin: "50px 10px" }} /> */}
                </Grid>
                <Grid xs={12} item>
                  <SelectConfigType
                    isPredefined={isPredefined}
                    setIsPredefined={setIsPredefined}
                  />
                  {/* <Divider sx={{ margin: "50px 10px" }} /> */}
                </Grid>
                <Grid xs={12} item>
                  <SelectConfig />
                  {/* <Divider sx={{ margin: "50px 10px" }} /> */}
                </Grid>
                <Grid xs={12} item>
                  <ServerInfo />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            id="relative-left-col-factor"
            px={{ md: 2, xs: 0 }}
            py={{ md: 0, xs: 2 }}
            xs={12}
            md={4}
            item
            style={{ position: "relative", textAlign: "center" }}
          >
            <Box sx={{ position: "sticky", top: 0 }}>
              <ServiceReceipt
                customConfig={mapCustomConfig}
                receiptType={
                  isPredefined
                    ? ReceiptTypeEnum.PREDEFINED_BUNDLE
                    : ReceiptTypeEnum.CUSTOM
                }
                submitHandler={() => submitHandler()}
                submitButtonIsLoading={isLoading}
                receiptItemName={serverConfig?.id ? serverConfig.name : "سرور"}
                receiptItemNumber={serverConfig?.id ? "۱" : "---"}
                reciptItemPrice={Math.floor(
                  serverConfig?.price || 0
                ).toLocaleString("fa-IR")}
                totalPrice={Math.floor(
                  (serverConfig?.price || 0) * 1.1
                ).toLocaleString("fa-IR")}
                vat={Math.floor(
                  (serverConfig?.price || 0) * 0.1
                ).toLocaleString("fa-IR")}
              />
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          px={1.7}
        ></Stack>
      </Box>
    </>
  );
};

export default AddStorageService;
