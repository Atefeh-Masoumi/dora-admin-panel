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
import { ChangeEvent, FC, useContext } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AddServerContext } from "../contexts/AddVmContext";

export const SelectConfigType: FC = () => {
  const { isPredefined, setIsPredefined } = useContext(AddServerContext);
  const handleConfigTypeOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPredefined(!isPredefined);
  };

  const configItemData = [
    {
      id: 1,
      label: "پیش فرض",
      description:
        "بهترین نسبت قیمت/عملکرد برنامه ها باید بتوانند سطوح مختلف تخصیص CPU را انجام دهند. برای استفاده مداوم از CPU مناسب نیست.",
      descriptionItems: [
        "وب سایت ها و برنامه های کاربردی با ترافیک متوسط",
        "استفاده از CPU کم تا متوسط",
      ],
    },
    {
      id: 2,
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
            value={isPredefined ? 1 : 2}
            onChange={handleConfigTypeOnChange}
          >
            <Stack gap={2} direction={{ xs: "column", md: "row" }}>
              {configItemData.map((item, index) => (
                <Stack
                  key={index}
                  p={2}
                  width={{ xs: "100%", md: "50%" }}
                  sx={{ bgcolor: "rgba(240, 247, 255, 1)", borderRadius: 2 }}
                >
                  <FormControlLabel
                    value={item.id}
                    control={<Radio />}
                    label={item.label}
                  />
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="text14">{item.description}</Typography>
                  <List>
                    {item.descriptionItems.map((descriptionItem, index) => (
                      <ListItem sx={{ pb: 0 }} key={index}>
                        <ListItemIcon sx={{ minWidth: 15 }}>
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ m: 0 }}
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
