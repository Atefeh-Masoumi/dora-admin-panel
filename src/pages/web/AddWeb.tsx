// import { FC, useContext } from "react";
// import { Box, Grid, Paper, Stack, Typography, Divider } from "@mui/material";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";
// import { AddWebContext } from "src/components/organisms/web/add/contexts/AddWebContext";
// import { SelectDomain } from "src/components/organisms/web/add/steps/SelectDomain";
// import { SelectDataCenter } from "src/components/organisms/web/add/steps/SelectDataCenter";
// import { SelectConfig } from "src/components/organisms/web/add/steps/SelectConfig";
// import { usePostApiMyWebHostCreateMutation } from "src/app/services/api.generated";
// import ServiceReceipt, {
//   ReceiptTypeEnum,
// } from "src/components/molecules/ServiceReceipt";

// const AddWeb: FC = () => {
//   const { domainName, dataCenter, serverConfig, term } =
//     useContext(AddWebContext);

//   const navigate = useNavigate();

//   const [createWeb, { isLoading }] = usePostApiMyWebHostCreateMutation();

//   const submitHandler = () => {
//     let validationErrorMessage = "";

//     if (term !== true) {
//       validationErrorMessage = "به علت عدم تائید قوانین امکان ثبت وجود ندارد.";
//     } else if (!dataCenter || !dataCenter.id) {
//       validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
//     } else if (!serverConfig || !serverConfig.id) {
//       validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
//     } else if (!domainName) {
//       validationErrorMessage = "لطفا نام دامنه را انتخاب کنید";
//     } else if (domainName.length < 3) {
//       validationErrorMessage = "نام دامنه نباید کمتر از سه حرف باشد";
//     }

//     if (validationErrorMessage !== "") {
//       toast.error(validationErrorMessage);
//     } else {
//       createWeb({
//         createWebHostModel: {
//           domainName: domainName,
//           datacenterId: dataCenter?.id || 0,
//           productBundleId: serverConfig?.id || 0,
//         },
//       })
//         .unwrap()
//         .then((res) => {
//           toast.success("سرویس هاست وب با موفقیت ایجاد شد");
//           navigate("/web");
//         });
//     }
//   };

//   return (
//     <>
//       <Typography
//         variant="title6"
//         color="secondary"
//         fontWeight="700"
//         sx={{ mb: 3 }}
//       >
//         ایجاد هاست وب جدید
//       </Typography>
//       <Box sx={{ my: 0 }}>
//         <Grid container>
//           <Grid xs={12} md={8} item>
//             <Stack
//               component={Paper}
//               sx={{
//                 position: "relative",
//                 width: { xs: "100%" },
//                 px: { xs: 1.8, lg: 2 },
//                 py: { xs: 1.8, lg: 2.25 },
//               }}
//             >
//               <Grid container gap={2}>
//                 <Grid xs={12} item>
//                   <SelectDomain />
//                   <Divider sx={{ margin: "50px 10px" }} />
//                 </Grid>
//                 <Grid xs={12} item>
//                   <SelectDataCenter />
//                   <Divider sx={{ margin: "50px 10px" }} />
//                 </Grid>
//                 <Grid xs={12} item>
//                   <SelectConfig />
//                 </Grid>
//               </Grid>
//             </Stack>
//           </Grid>
//           <Grid
//             id="relative-left-col-factor"
//             px={{ md: 2, xs: 0 }}
//             py={{ md: 0, xs: 2 }}
//             xs={12}
//             md={4}
//             item
//             style={{ position: "relative", textAlign: "center" }}
//           >
//             <Box sx={{ position: "sticky", top: 0 }}>
//               <ServiceReceipt
//                 submitHandler={() => submitHandler()}
//                 submitButtonIsLoading={isLoading}
//                 receiptItemName={serverConfig?.id ? serverConfig.name : "سرور"}
//                 receiptItemNumber={serverConfig?.id ? "۱" : "---"}
//                 reciptItemPrice={Math.floor(
//                   serverConfig?.price || 0
//                 ).toLocaleString("fa-IR")}
//                 totalPrice={Math.floor(
//                   (serverConfig?.price || 0) * 1.1
//                 ).toLocaleString("fa-IR")}
//                 vat={Math.floor(
//                   (serverConfig?.price || 0) * 0.1
//                 ).toLocaleString("fa-IR")}
//                 receiptType={ReceiptTypeEnum.PREDEFINED_BUNDLE}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//         <Stack
//           direction="row"
//           justifyContent="center"
//           alignItems="center"
//           spacing={1}
//           px={1.7}
//         ></Stack>
//       </Box>
//     </>
//   );
// };

// export default AddWeb;
