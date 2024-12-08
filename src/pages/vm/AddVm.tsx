import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyHostProjectGetByIdQuery,
  usePostApiMyVmHostCreateMutation,
} from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";
import { SelectConfig } from "src/components/organisms/vm/add/steps/SelectConfig";
import { SelectConfigType } from "src/components/organisms/vm/add/steps/SelectConfigType";
import { SelectNetworkIpForVpc } from "src/components/organisms/vm/add/steps/SelectNetworkIpForVpc";
import { SelectOS } from "src/components/organisms/vm/add/steps/SelectOS";
import { ServerInfo } from "src/components/organisms/vm/add/steps/ServerInfo";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";
import { VM_PUBLICITY_TYPE } from "src/constant/vmTypeEnum.constant";
import { passwordValidationRegex } from "src/utils/regexUtils";

// const mapConfig = {
//   cpu: "CPU",
//   memory: "Memory",
//   disk: "Disk",
//   ipv4: "IPV4",
//   ipv6: "IPV6",
//   rackUnitSpace: "Rack Space Unit",
//   powerAmp: "Power (A)",
//   ipv4Count: "IPV4",
//   networkPort10G: "Network 10G Port",
//   networkPort1G: "Network 1G Port",
// };

const AddVm: FC = () => {
  const [selectedIp, setSelectedIp] = useState<string | number | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<
    string | number | null
  >(null);
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const vmType = searchParams.get("vmType");

  const {
    osVersion,
    serverConfig,
    serverName,
    serverPassword,
    isPredefined,
    setIsPredefined,
    customConfig,
  } = useContext(AddServerContext);

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });

  const { data: vmProjectData } = useGetApiMyHostProjectGetByIdQuery({
    id: Number(projectId),
  });

  const navigate = useNavigate();

  const [createCloudServer, { isLoading: createHostIsLoading }] =
    usePostApiMyVmHostCreateMutation();

  const mapCustomConfig = useMemo(() => {
    return [
      {
        numberOfItem: customConfig.memory || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VMemory)?.name ||
          "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VMemory)
            ?.price || 1,
      },
      {
        numberOfItem: customConfig.cpu || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VCpu)?.name ||
          "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VCpu)?.price ||
          1,
      },
      {
        numberOfItem: customConfig.disk || 25,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VDisk)?.name ||
          "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VDisk)?.price ||
          25,
      },
      {
        numberOfItem: customConfig.IPV4 || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.Ipv4)?.name ||
          "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.Ipv4)?.price ||
          1,
      },
    ];
  }, [customConfig, productItems]);

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!osVersion || !osVersion.id) {
      validationErrorMessage = "لطفا ورژن سیستم عامل را انتخاب کنید";
    } else if (isPredefined && (!serverConfig || !serverConfig.id)) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (!serverName) {
      validationErrorMessage = "لطفا نام سرور را انتخاب کنید";
    } else if (serverName.trim().length < 5 || serverName.length > 50) {
      validationErrorMessage =
        "طول کارکترهای بخش نام سرور ابری باید بین ۵ تا ۵۰ کارکتر باشد";
    } else if (!passwordValidationRegex.test(serverPassword)) {
      validationErrorMessage = "رمز عبور نامعتبر است";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      createCloudServer({
        createVmModel: {
          name: serverName,
          password: serverPassword,
          publicKey: null,
          imageId: osVersion?.id || 0,
          isPredefined: isPredefined,
          productBundleId: serverConfig?.id || 0,
          cpu: customConfig.cpu,
          memory: customConfig.memory,
          disk: customConfig.disk,
          vmProjectId: Number(projectId),
          vpcHostNetworkId: Number(selectedNetwork),
          ipAddress: String(selectedIp),
          storageClassTypeId: 1,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("ماشین مجازی با موفقیت ایجاد گردید");
          navigate(-1);
        })
        .catch(() => {});
    }
  };

  const handleSelectedIpOnChange = (ip: string | number | null) => {
    setSelectedIp(ip);
  };

  const handleSelectedNetworkOnChange = (network: string | number | null) => {
    setSelectedNetwork(network);
  };

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد سرور ابری
      </Typography>
      <Box sx={{ my: 0 }}>
        <Grid container>
          <Grid xs={12} md={8} item>
            <Stack
              component={Paper}
              sx={{
                position: "relative",
                width: { xs: "100%" },
                px: { xs: 1.8, lg: 2 },
                py: { xs: 1.8, lg: 2.25 },
              }}
            >
              {Number(vmType) === VM_PUBLICITY_TYPE.VPC_VM && (
                <Grid xs={12} item>
                  <SelectNetworkIpForVpc
                    handleSelectedNetwork={handleSelectedNetworkOnChange}
                    handleSelectedIp={handleSelectedIpOnChange}
                  />
                  <Divider sx={{ mt: 3, mb: 3 }} />
                </Grid>
              )}
              <Grid container gap={2}>
                <Grid xs={12} item>
                  <SelectOS
                    datacenterId={vmProjectData?.datacenterId}
                    hypervisorTypeId={vmProjectData?.hypervisorTypeId}
                  />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectConfigType
                    isPredefined={isPredefined}
                    setIsPredefined={setIsPredefined}
                  />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectConfig />
                  <Divider sx={{ margin: "50px 10px" }} />
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
                submitButtonIsLoading={createHostIsLoading}
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

export default AddVm;
