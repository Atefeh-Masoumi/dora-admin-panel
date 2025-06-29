import { Done } from "@mui/icons-material";
import {
  Box,
  Button,
  Input,
  ListSubheader,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useCustomCreateIssueMutation,
  useLazyGetApiMyPortalCustomerProductListByProductIdQuery,
} from "src/app/services/api";
import {
  GetApiMyPortalCustomerProductListByProductIdApiResponse,
  IssueSubjectShortListResponse,
  useGetApiMyPortalBusinessUnitListQuery,
  useGetApiMyPortalProductListQuery,
  usePostApiMyPortalIssueCreateMutation,
  usePostApiMyPortalIssueSubjectSelectListMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";
import { Add } from "src/components/atoms/svg-icons/AddSvg";

const dropzoneOptions = { accept: "image/* , .pdf", multiple: true };

const priorityLevel = [
  { id: 1, name: "مهم" },
  { id: 2, name: "خیلی مهم" },
  { id: 3, name: "ضروری" },
];

const AddTicket: FC = () => {
  const navigate = useNavigate();

  const [businessUnitId, setBusinessUnitId] = useState<number>();
  const [ticketPriorityLevel, setTicketPriorityLevel] = useState<number>(1);
  const { data: businessUnits, isLoading: loadingUnits } =
    useGetApiMyPortalBusinessUnitListQuery();

  const [apiCloudCustomerProductList, setApiCloudCustomerProductList] =
    useState<GetApiMyPortalCustomerProductListByProductIdApiResponse | null>(
      null
    );

  const [selectedApiCloudCustomerProduct, setSelectedApiCloudCustomerProduct] =
    useState<number>(0);

  const [
    callGetApiCloudCustomerProductList,
    { isLoading: getApiCloudHostLoading },
  ] = useLazyGetApiMyPortalCustomerProductListByProductIdQuery();

  const [productId, setProductId] = useState<number>();
  const { data: products, isLoading: loadingProducts } =
    useGetApiMyPortalProductListQuery();

  const [title, setTitle] = useState<number>();

  const [content, setContent] = useState("");

  const [selectList] = usePostApiMyPortalIssueSubjectSelectListMutation();

  useEffect(() => {
    selectList({
      issueSubjectSelectListModel: {
        productId: productId,
        businessUnitId: businessUnitId,
      },
    })
      .unwrap()
      .then((res: SetStateAction<IssueSubjectShortListResponse[]>) =>
        res !== undefined &&
        setList(res)
      );

    if (productId) {
      callGetApiCloudCustomerProductList({ productId: Number(productId) })
        .unwrap()
        .then(
          (
            res: SetStateAction<GetApiMyPortalCustomerProductListByProductIdApiResponse | null>
          ) => {
            setApiCloudCustomerProductList(res);
          }
        );
    }
  }, [
    businessUnitId,
    productId,
    callGetApiCloudCustomerProductList,
    selectList,
  ]);

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File>();
  const [list, setList] = useState<IssueSubjectShortListResponse[]>([]);

  const [upload] = useCustomCreateIssueMutation();
  const [createissue, {isLoading }] = usePostApiMyPortalIssueCreateMutation();
  

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => setFile(file);
    reader.onerror = () => {
      toast.error(`file error: ${reader.error}`);
    };
    setUploading(true);
  };

  const abortController = useRef<AbortController |  null>(null);

  if (!abortController.current) {
    abortController.current = new AbortController();
  }

  const submit = () => {
    if (!businessUnitId || !content || !title) {
      toast.error("لطفا تمام فیلد ها را پر کنید");
      return;
    }
    let formData = new FormData();
    formData.append("content", content);
    formData.append("businessUnitId", businessUnitId.toString());
    formData.append("issueSubjectId", title.toString());
    formData.append("issuePriorityId", ticketPriorityLevel?.toString()!);
    productId && formData.append("productId", productId.toString());
    
    if (selectedApiCloudCustomerProduct !== 0) {
      formData.append(
        "customerProductId",
        selectedApiCloudCustomerProduct.toString()
      );
    }
    !!file && formData.append("attachment", file as Blob)
    
    // upload({
    //   body: formData as any,
    //   abortController: abortController.current,
    // })
      createissue({
        createIssueModel: formData as any
      })
      .unwrap()
      .then((res:any) => {
        toast.success("تیکت با موفقیت اضافه شد");
        navigate("/portal/supports");
      })
      .catch((res: any) => {
        if (res.status === 401 || res.status === 404) {
          toast.error("مشکلی پیش آمده");
        } else {
          toast.error(res?.data[""][0]);
        }
      });
  };

  return (
    <Stack py={3} spacing={2}>
      <Typography variant="title6" color="secondary" fontWeight="700">
        ثبت تیکت جدید
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        bgcolor="white"
        py={2}
        borderRadius={3}
      >
        <Stack
          alignItems="center"
          maxWidth="578px"
          spacing={1.5}
          width="100%"
          py={2}
          px={1}
        >
          {/* Units */}
          <Box component="form" width="100%">
            {loadingUnits || !businessUnits ? (
              <Stack>
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
            ) : (
              <DorsaTextField
                select
                fullWidth
                label="واحد *"
                value={businessUnitId || ""}
                onChange={(e) => setBusinessUnitId(+e.target.value)}
              >
                {businessUnits.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "#F3F4F6",
                      m: 0.5,
                      py: 1.5,
                      color: "secondary",
                      "&: focus": {
                        color: "rgba(60, 138, 255, 1)",
                        backgroundColor: "rgba(60, 138, 255, 0.1)",
                      },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </DorsaTextField>
            )}
          </Box>
          {/* Product */}
          <Box component="form" width="100%">
            {loadingProducts || !products ? (
              <Stack>
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
            ) : (
              <DorsaTextField
                select
                fullWidth
                label="محصول *"
                value={productId || ""}
                onChange={(e) => setProductId(+e.target.value)}
              >
                {products.map((product) => (
                  <MenuItem
                    key={product.id}
                    value={product.id}
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "#F3F4F6",
                      m: 0.5,
                      py: 1.5,
                      color: "secondary",
                      "&: focus": {
                        color: "rgba(60, 138, 255, 1)",
                        backgroundColor: "rgba(60, 138, 255, 0.1)",
                      },
                    }}
                  >
                    {product.name}
                  </MenuItem>
                ))}
              </DorsaTextField>
            )}
          </Box>
          {/* related projects */}
          <Box component="form" width="100%">
            {getApiCloudHostLoading ? (
              <Stack>
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
            ) : (
              <DorsaTextField
                select
                fullWidth
                label="محصولات کاربر"
                value={selectedApiCloudCustomerProduct || ""}
                onChange={(e) =>
                  setSelectedApiCloudCustomerProduct(+e.target.value)
                }
              >
                {(!apiCloudCustomerProductList ||
                  apiCloudCustomerProductList?.length === 0) && (
                  <ListSubheader>
                    <Typography sx={{ py: 1.6 }}>
                      داده ای موجودی نیست
                    </Typography>
                  </ListSubheader>
                )}
                {apiCloudCustomerProductList?.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "#F3F4F6",
                      m: 0.5,
                      py: 1.5,
                      color: "secondary",
                      "&: focus": {
                        color: "rgba(60, 138, 255, 1)",
                        backgroundColor: "rgba(60, 138, 255, 0.1)",
                      },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </DorsaTextField>
            )}
          </Box>
          {/* Title */}
          <DorsaTextField
            select
            fullWidth
            label="عنوان *"
            value={title || ""}
            onChange={(e) => setTitle(+e.target.value)}
          >
            {list.length === 0 && (
              <ListSubheader>
                <Typography sx={{ py: 1.6 }}>داده ای موجودی نیست</Typography>
              </ListSubheader>
            )}
            {list.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#F3F4F6",
                  m: 0.5,
                  py: 1.5,
                  color: "secondary",
                  "&: focus": {
                    color: "rgba(60, 138, 255, 1)",
                    backgroundColor: "rgba(60, 138, 255, 0.1)",
                  },
                }}
              >
                {option.name}
              </MenuItem>
            ))}
          </DorsaTextField>
          {/* Priority */}
          <Box component="form" width="100%">
            <DorsaTextField
              select
              fullWidth
              label="اولویت تیکت *"
              value={ticketPriorityLevel || ""}
              onChange={(e) => setTicketPriorityLevel(+e.target.value)}
            >
              {priorityLevel.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "#F3F4F6",
                    m: 0.5,
                    py: 1.5,
                    color: "secondary",
                    "&: focus": {
                      color: "rgba(60, 138, 255, 1)",
                      backgroundColor: "rgba(60, 138, 255, 0.1)",
                    },
                  }}
                >
                  {option.name}
                </MenuItem>
              ))}
            </DorsaTextField>
          </Box>
          <DorsaTextField
            onChange={(e) => setContent(e.target.value)}
            label="متن تیکت *"
            fullWidth
            multiline
            rows={4}
          />
          <Stack
            direction="row"
            borderRadius={1.5}
            border={1}
            borderColor="rgba(110, 118, 138, 0.24)"
            alignItems="center"
            p={1}
            spacing={1}
            width="100%"
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              width="100%"
              px={1.5}
              spacing={0.6}
            >
              <Typography
                color="rgba(110, 118, 138, 0.6)"
                whiteSpace="nowrap"
                fontSize="12px"
              >
                فرمت های مجاز jpg, png, jpeg, pdf
              </Typography>
              <Typography
                color="rgba(110, 118, 138, 0.6)"
                whiteSpace="nowrap"
                fontSize="12px"
              >
                حداکثر حجم فایل: ۲۵ مگابایت
              </Typography>
            </Stack>
            <Button
              color="primary"
              variant="contained"
              component="label"
              startIcon={
                <Add
                  sx={{
                    "& path": { stroke: "rgba(255, 255, 255, 1)" },
                    marginBottom: "2px",
                  }}
                />
              }
              sx={{ px: 2 }}
            >
              <Typography fontSize="15px" fontWeight="500">
                انتخاب
              </Typography>
              <Input
                inputProps={{ ...dropzoneOptions }}
                onChange={handleFileChange}
                sx={{ display: "none" }}
                type="file"
              />
            </Button>
          </Stack>
          {uploading && (
            <Stack
              direction="row"
              borderRadius={1.5}
              alignItems="center"
              bgcolor="rgba(60, 138, 255, 1)"
              p={2}
              width="100%"
              justifyContent="space-between"
              color="white"
            >
              <Typography fontSize="14px">{file?.name}</Typography>
              <Done />
            </Stack>
          )}

          <Stack
            direction="row"
            spacing={1}
            maxWidth="400px"
            width="100%"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              size="large"
              fullWidth
              color="secondary"
              sx={{ px: 4, py: { xs: 0, md: 1.5 } }}
              href="/portal/supports"
            >
              انصراف
            </Button>
            <LoadingButton
              loading={isLoading}
              onClick={submit}
              fullWidth
              variant="contained"
              size="large"
              sx={{ px: 5, py: 1.5 }}
            >
              ارسال تیکت
            </LoadingButton>
            
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddTicket;
