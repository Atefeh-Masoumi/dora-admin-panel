import {
	Button,
	Dialog,
	DialogContent,
	DialogProps,
	DialogTitle,
	InputLabel,
	Stack,
	Radio,
	RadioGroup,
	FormControlLabel,
	Grid,
	Box,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import {
	CreateProjectModel,
	ProjectListResponse,
	useGetApiMyInfraDatacenterListQuery,
	useGetApiMyProjectListQuery,
	usePostApiMyCreateMutation,
} from "src/app/services/api.generated";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import DomainIcon from "@mui/icons-material/Domain";
import LoadingButton from "src/components/atoms/LoadingButton";

type CreateVmProjectDialogPropsType = DialogProps & {
	projectId?: ProjectListResponse["id"];
	name?: ProjectListResponse["name"];
};

export const CreateVmProjectDialog: FC<CreateVmProjectDialogPropsType> = ({
	projectId,
	name,
	...props
}) => {
	const [createVmProject, { isLoading: createVmProjectLoading }] =
		usePostApiMyCreateMutation();
	//   const [editVmProject, { isLoading: editVmProjectLoading }] =
	// 	usePutApiMyHostProjectEditByIdMutation();
	const { data: datacenterList } =
		useGetApiMyInfraDatacenterListQuery();

	const initialValues: CreateProjectModel = {
		name: name || "",
		datacenterId: (datacenterList && datacenterList[0].id) || 1,
		isPublic: true,
	};

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(5, "نباید کمتر از ۵ کارکتر باشد")
			.max(70, "نباید بیشتر از ۷۰ کارکتر باشد")
			.required("این بخش الزامی است"),
		// datacenterId: projectId
		//   ? yup.number().nullable()
		//   : yup.number().required("این بخش الزامی است"),
	});

	const { refetch } = useGetApiMyProjectListQuery();

	const onSubmit: formikOnSubmitType<CreateProjectModel> = (
		values,
		{ setSubmitting, resetForm }
	) => {
		const { name } = values;
		const API =
			createVmProject({
				createProjectModel: {
					...values,
					datacenterId: Number(values.datacenterId),
				},
			});

		API.unwrap()
			.then(() => {
				toast.success(
					"پروژه با موفقیت ایجاد شد"
				);
				refetch();
				closeDialogHandler({});
			})
			.catch(() => { })
			.finally(() => {
				setSubmitting(false);
			});
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit,
	});

	const closeDialogHandler = (event: {}) => {
		if (!props.onClose) return;
		props.onClose(event, "escapeKeyDown");
		formik.resetForm();
	};

	const dataCenterIconRenderHandler = (name: string) => {
		switch (name) {
			case "asiatech":
				return "icons/asiatech.svg";
			case "mobinnet":
				return "icons/mobinnet.png";
			case "fanhub":
				return "icons/fanhub.png";
			default:
				return "";
		}
	};

	return (
		<Dialog
			{...props}
			onClose={closeDialogHandler}
			fullWidth
		// components={{ Backdrop: BlurBackdrop }}
		// sx={{
		// "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 },
		// }}
		>
			<DialogTitle textAlign="left">
				{projectId ? "بروزرسانی پروژه" : "افزودن پروژه"}
			</DialogTitle>
			<DialogContent>
				<form onSubmit={formik.handleSubmit}>
					<Stack direction="column" rowGap={2}>
						<Stack direction="column" rowGap={1}>
							<InputLabel>نام پروژه</InputLabel>
							<AlphaNumericTextField
								formik={formik}
								id="name"
								fullWidth
								error={Boolean(formik.errors.name && formik.touched.name)}
								helperText={formik.touched.name && formik.errors.name}
								placeholder="نام موردنظر را وارد کنید"
							/>
						</Stack>
						{!projectId && (
							<Stack direction="column" rowGap={1}>
								<InputLabel>نام مرکز داده</InputLabel>
								<RadioGroup
									name="datacenterId"
									value={formik.getFieldProps("datacenterId").value}
									onChange={(event) =>
										formik.setFieldValue("datacenterId", event.target.value)
									}
								>
									<Grid container columnSpacing={1}>
										{datacenterList?.map(({ id, name, photoName }) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={id}
												sx={{ textAlign: "center" }}
												mt={1}
											>
												<FormControlLabel
													sx={{
														border: "1px solid #ccc",
														padding: "5px 0",
														borderRadius: BORDER_RADIUS_1,
														width: "100%",
														margin: { xs: " 5px 0", sm: "0 !important" },
													}}
													value={id}
													control={<Radio size="medium" />}
													label={
														<Stack
															direction="row"
															alignItems="center"
															spacing={1}
														>
															<img
																style={{ width: "100px", height: "100px" }}
																src={`/assets/${dataCenterIconRenderHandler(
																	photoName || ""
																)}`}
																alt={name || ""}
															/>
															<Box>{name}</Box>
														</Stack>
													}
												/>
											</Grid>
										))}
									</Grid>
								</RadioGroup>
							</Stack>
						)}
						{/* <Stack direction="column" rowGap={1}>
							<InputLabel>نوع پروژه</InputLabel>
							<RadioGroup
								name="isPublic"
								value={formik.getFieldProps("isPublic").value}
								onChange={(event) =>
									formik.setFieldValue("isPublic", event.target.value === "true")
								}
							>
								<Grid container columnSpacing={1}>
									<Grid
										item
										xs={12}
										sm={6}

										mt={1}
									>
										<FormControlLabel
											sx={{
												border: "1px solid #ccc",
												padding: "5px 0",
												borderRadius: BORDER_RADIUS_1,
												width: "100%",
												margin: { xs: " 5px 0", sm: "0 !important" },
											}}
											value="true"
											control={<Radio size="medium" />}
											label={
												<Stack direction="column" spacing={0.5}>
													<Box>پروژه عمومی</Box>
													<Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
														از طریق اینترنت قابل دسترسی است
													</Box>
												</Stack>
											}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={6}

										mt={1}
									>
										<FormControlLabel
											sx={{
												border: "1px solid #ccc",
												padding: "5px 0",
												borderRadius: BORDER_RADIUS_1,
												width: "100%",
												margin: { xs: " 5px 0", sm: "0 !important" },
											}}
											value="false"
											control={<Radio size="medium" />}
											label={
												<Stack direction="column" spacing={0.5}>
													<Box>پروژه خصوصی</Box>
													<Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
														فقط از طریق شبکه داخلی قابل دسترسی است
													</Box>
												</Stack>
											}
										/>
									</Grid>
								</Grid>
							</RadioGroup>
						</Stack> */}
						<Stack direction="row" justifyContent="end" spacing={1}>
							<Button
								variant="outlined"
								color="secondary"
								sx={{ px: 3, py: 0.8 }}
								onClick={closeDialogHandler}
							>
								انصراف
							</Button>
							<LoadingButton
								type="submit"
								loading={createVmProjectLoading}
								variant="contained"
								sx={{ px: 3, py: 0.8 }}
							>
								ذخیره
							</LoadingButton>
						</Stack>
					</Stack>
				</form>
			</DialogContent>
		</Dialog>
	);
};
