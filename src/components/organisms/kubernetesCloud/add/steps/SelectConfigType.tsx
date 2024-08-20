import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FormControlLabel from "@mui/material/FormControlLabel";

enum PRODUCT_TYPE_ENUM {
  PRE_DEFINED = 1,
  CUSTOM = 2,
}

type SelectKuberCloudConfigTypeType = {
  isPredefined?: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
};

export const SelectKuberCloudConfigType: FC<SelectKuberCloudConfigTypeType> = ({
  isPredefined,
  setIsPredefined,
}) => {
  const handleConfigTypeOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const productType = event.target.value;
    setIsPredefined(Number(productType) === PRODUCT_TYPE_ENUM.PRE_DEFINED);
  };

  const configItemData = [
    {
      id: PRODUCT_TYPE_ENUM.PRE_DEFINED,
      label: "پیش فرض",
      description:
        "بهترین نسبت قیمت/عملکرد برنامه ها باید بتوانند سطوح مختلف تخصیص CPU را انجام دهند. برای استفاده مداوم از CPU مناسب نیست.",
      descriptionItems: [
        "وب سایت ها و برنامه های کاربردی با ترافیک متوسط",
        "استفاده از CPU کم تا متوسط",
      ],
    },
    {
      id: PRODUCT_TYPE_ENUM.CUSTOM,
      label: "سفارشی",
      description:
        "بهترین انتخاب برای تولید حیاتی و همچنین کاربردهای بالای CPU. عملکرد و زمان پاسخ قابل پیش بینی را ارائه می‌دهد.",
      descriptionItems: [
        "برنامه های کاربردی با ترافیک بالا",
        "مصرف بالای CPU پایدار",
      ],
    },
  ];

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={4}
      sx={{ px: 2 }}
    >
      <Typography fontSize={24} fontWeight="bold" align="center">
        لطفاً نوع سرور مورد نظر خود را انتخاب کنید
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        flexWrap="wrap"
        gap={2}
        justifyContent="space-between"
      >
        <Stack>
          <RadioGroup
            value={
              isPredefined
                ? PRODUCT_TYPE_ENUM.PRE_DEFINED
                : PRODUCT_TYPE_ENUM.CUSTOM
            }
            onChange={handleConfigTypeOnChange}
          >
            <Stack gap={2} direction={{ xs: "column", md: "row" }}>
              {configItemData.map((item, index) => (
                <Stack
                  key={index}
                  p={2}
                  px={3}
                  width={{ xs: "100%", md: "50%" }}
                  sx={{ bgcolor: "rgba(240, 247, 255, 1)", borderRadius: 1 }}
                >
                  <FormControlLabel
                    sx={{
                      mb: 2,
                      mx: 0,
                      width: "auto",
                      bgcolor: "white",
                      borderRadius: "5px",
                    }}
                    value={item.id}
                    control={<Radio />}
                    label={item.label}
                  />
                  <Divider sx={{ mb: 1 }} />
                  <Typography textAlign="justify" variant="text14">
                    {item.description}
                  </Typography>
                  <List>
                    {item.descriptionItems.map((descriptionItem, index) => (
                      <ListItem sx={{ pb: 0 }} key={index}>
                        <ListItemIcon sx={{ minWidth: 15 }}>
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ m: 0, minWidth: "max-content" }}
                          primaryTypographyProps={{
                            variant: "text13",
                          }}
                          primary={descriptionItem}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};
