import { useEffect, useState, useRef, FC, SetStateAction } from "react";
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
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AxiosProgressEvent } from "axios";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Add } from "src/components/atoms/svg/AddSvg";
import {
  SupportSubjectListResponse,
  useGetPortalPanelBusinessUnitListQuery,
  useGetPortalPanelProductCategoryListQuery,
  usePostPortalPanelSupportSubjectSelectListMutation,
  GetPortalPanelHostProductListByProductCategoryIdApiResponse,
} from "src/app/services/api.generated";
import {
  useCustomCreateSupportMutation,
  useLazyGetPortalPanelHostProductListByProductCategoryIdQuery,
} from "src/app/services/api";

const dropzoneOptions = { accept: "image/* , .pdf", multiple: true };

const AddTicket: FC = () => {
  const navigate = useNavigate();

  const [unit, setUnit] = useState<number>();
  const { data: businessUnits, isLoading: loadingUnits } =
    useGetPortalPanelBusinessUnitListQuery();

  const [portalPanelHostProductList, setPortalPanelHostProductList] =
    useState<GetPortalPanelHostProductListByProductCategoryIdApiResponse | null>(
      null
    );

  const [selectedPortalPanelHostProduct, setSelectedPortalPanelHostProduct] =
    useState<number>(0);

  const [
    callGetPortalPanelHostProductList,
    { isLoading: getPortalPanelHostLoading },
  ] = useLazyGetPortalPanelHostProductListByProductCategoryIdQuery();

  const [category, setCategory] = useState<number>();
  const { data: categories, isLoading: loadingCategories } =
    useGetPortalPanelProductCategoryListQuery();

  const [title, setTitle] = useState<number>();

  const [content, setContent] = useState("");

  const [selectList] = usePostPortalPanelSupportSubjectSelectListMutation();

  useEffect(() => {
    selectList({
      supportSubjectSelectListModel: {
        productCategoryId: category,
        businessUnitId: unit,
      },
    })
      .unwrap()
      .then((res: SetStateAction<SupportSubjectListResponse[]>) =>
        setList(res)
      );
    if (category) {
      callGetPortalPanelHostProductList({ productCategoryId: Number(category) })
        .unwrap()
        .then((res) => {
          setPortalPanelHostProductList(res);
        });
    }
  }, [unit, category, selectList]);

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File>();
  const [list, setList] = useState<SupportSubjectListResponse[]>([]);

  const [upload] = useCustomCreateSupportMutation();

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

  const [uploadProcessEvent, setUploadProcessEvent] = useState<
    { loaded: number; total: number } | undefined
  >();

  const abortController = useRef<AbortController | undefined>();

  abortController.current = new AbortController();

  const submit = () => {
    if (!unit || !content || !title || !category) {
      toast.error("لطفا تمام فیلد ها را پر کنید");
      return;
    }
    let formData = new FormData();
    formData.append("content", content);
    formData.append("businessUnitId", "" + unit);
    formData.append("supportSubjectId", "" + title);
    formData.append("productCategoryId", "" + category);
    if (selectedPortalPanelHostProduct !== 0) {
      formData.append("hostProductId", "" + selectedPortalPanelHostProduct);
    }
    formData.append("attachment", file as Blob);
    upload({
      body: formData as any,
      abortController: abortController.current,
      onUploadProgress: (progressEvent: AxiosProgressEvent) =>
        setUploadProcessEvent({
          loaded: progressEvent.loaded,
          total: progressEvent.total || 100,
        }),
    })
      .unwrap()
      .then(() => {
        toast.success("تیکت با موفقیت اضافه شد");
        navigate("/portal/supports");
      })
      .catch((res: any) => {
        if (res.status === 401 || res.status === 404) {
          toast.error("مشکلی پیش آمده");
        } else {
          toast.error(res.data[""][0]);
        }
      });
  };

  const uploadPercent = uploadProcessEvent
    ? Math.round((uploadProcessEvent.loaded * 100) / uploadProcessEvent.total)
    : 0;

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
                inputProps={{ fontSize: "20px !important" }}
                select
                fullWidth
                label="واحد *"
                value={unit || ""}
                onChange={(e) => setUnit(+e.target.value)}
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
            {loadingCategories || !categories ? (
              <Stack>
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
            ) : (
              <DorsaTextField
                inputProps={{ fontSize: "20px !important" }}
                select
                fullWidth
                label="محصول *"
                value={category || ""}
                onChange={(e) => setCategory(+e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
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
                    {category.name}
                  </MenuItem>
                ))}
              </DorsaTextField>
            )}
          </Box>
          {/* related projects */}
          <Box component="form" width="100%">
            {getPortalPanelHostLoading ? (
              <Stack>
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
            ) : (
              <DorsaTextField
                inputProps={{ fontSize: "20px !important" }}
                select
                fullWidth
                label="محصولات کابر"
                value={selectedPortalPanelHostProduct || ""}
                onChange={(e) =>
                  setSelectedPortalPanelHostProduct(+e.target.value)
                }
              >
                {(!portalPanelHostProductList ||
                  portalPanelHostProductList?.length === 0) && (
                  <ListSubheader>
                    <Typography sx={{ py: 1.6 }}>
                      داده ای موجودی نیست
                    </Typography>
                  </ListSubheader>
                )}
                {portalPanelHostProductList?.map((option) => (
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
            inputProps={{ fontSize: "20px !important" }}
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
              variant="outlined"
              component="label"
              startIcon={
                <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
              }
              sx={{ px: 2 }}
            >
              <Typography fontSize="14px" fontWeight="400">
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
              <Typography fontSize="14px">
                میزان پیشرفت ({uploadPercent}%)
              </Typography>
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
              // loading={loadingCreate}
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
