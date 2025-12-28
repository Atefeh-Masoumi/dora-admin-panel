import {
    Divider,
    Radio,
    RadioGroup,
    Stack,
    Typography,
  } from "@mui/material";
  import { ChangeEvent, FC, useContext, useEffect } from "react";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";
  
  enum PRODUCT_TYPE_ENUM {
    OLD = 1,
    NEW = 2,
  }
  
  type SelectConfigTypeType = {
    onChangeType?: (type: PRODUCT_TYPE_ENUM) => void;
    defaultType?: PRODUCT_TYPE_ENUM;
  };
  
  export const SelectFirewalType: FC<SelectConfigTypeType> = ({
    defaultType,
  }) => {
    const { usedFirewall, setUsedFirewall } = useContext(AddServerContext);

    useEffect(() => {
      if (defaultType !== undefined) {
        setUsedFirewall(defaultType === PRODUCT_TYPE_ENUM.OLD);
      }
    }, [defaultType, setUsedFirewall]);

    const handleConfigTypeOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      const productType = Number(event.target.value) as PRODUCT_TYPE_ENUM;
      setUsedFirewall(productType === PRODUCT_TYPE_ENUM.OLD);
      // onChangeType?.(productType);
    };
  
    const configItemData = [
      {
        id: PRODUCT_TYPE_ENUM.OLD,
        label: " استفاده از فایروال های موجود",
        description:
         "استفاده از فایروال‌های موجود به شما این امکان را می‌دهند که به راحتی سرورهای خود را ایمن  کنید."
      },
      {
        id: PRODUCT_TYPE_ENUM.NEW,
        label: "ایجاد فایروال جدید",
        description:
         "فایروال‌ جدید با محدود کردن یا مجاز  کردن ترافیک بر اساس قوانین میتوانید سرورهای خود را ایمن  کنید."
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
          لطفاً فایروال مورد نظر خود را انتخاب کنید
          
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
                usedFirewall
                  ? PRODUCT_TYPE_ENUM.OLD
                  : PRODUCT_TYPE_ENUM.NEW
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
                    
                  </Stack>
                ))}
              </Stack>
            </RadioGroup>
          </Stack>
        </Stack>
      </Stack>
    );
  };
  