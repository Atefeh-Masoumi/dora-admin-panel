import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  Grid,
  Checkbox,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
  selectClasses,
  outlinedInputClasses,
} from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { AddDomainContext } from "src/components/organisms/domain/add/contexts/AddContext";
import { Box } from "@mui/system";
import DorsaRadio from "src/components/atoms/DorsaRadio";
import { ProductItemListResponse } from "src/app/services/api.generated";
import { useLazyGetApiMyPortalProductItemListByProductIdQuery } from "src/app/services/api";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type SelectDomainPropsType = {};

export const SelectDomain: FC<SelectDomainPropsType> = () => {
  const { domainName, setDomainName } = useContext(AddDomainContext);
  const { productId, setProductId } = useContext(AddDomainContext);
  const { authCode, setAuthCode } = useContext(AddDomainContext);
  const { term, setTerm } = useContext(AddDomainContext);
  const { extObject, setExtObject } = useContext(AddDomainContext);

  const [bundleList, setBundleList] = useState<ProductItemListResponse[]>([]);
  const [getBundleList, { isLoading: getBundleListIsLoading }] =
    useLazyGetApiMyPortalProductItemListByProductIdQuery();

  useEffect(() => {
    getBundleList({
      productId: productId!,
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        setBundleList(res);
      })
      .catch();

    setExtObject({ id: "", name: "", price: 0 });
  }, [getBundleList, productId, setExtObject]);

  const termInputChangeHandler = () => setTerm(!term);

  const typeChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setProductId(parseInt(value));
    if (parseInt(value) === 10) {
      setAuthCode("Auth Code");
    } else {
      setAuthCode("");
    }
  };

  const domainNameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDomainName(e.target.value);

  const authCodeInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAuthCode(e.target.value);

  const extInputChangeHandler = (e: SelectChangeEvent<number>) => {
    if (bundleList.length <= 0) return;
    const bundleObj = bundleList.find(
      (item) => item.id === Number(e.target.value!)
    );

    setExtObject({
      id: bundleObj?.id || "",
      name: bundleObj?.name || "",
      price: bundleObj?.price || 0,
    });
  };

  return (
    <Box
      sx={{
        p: { xs: 0, md: 2 },
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ borderRadius: BORDER_RADIUS_1, bgcolor: "white" }}
      >
        <Grid
          xs={12}
          lg={4}
          item
          sx={{ p: { xs: 2, lg: 0 }, mr: { xs: -3, lg: 0 } }}
        >
          <RadioGroup
            name={"productId"}
            value={productId.toString()}
            onChange={typeChangeHandler}
          >
            <DorsaRadio
              sx={{ width: { xs: "100%", lg: "100%" } }}
              value="10"
              control={<Radio />}
              label="ثبت دامنه"
            />
            <DorsaRadio
              sx={{ width: { xs: "100%", lg: "100%" } }}
              value="11"
              control={<Radio />}
              label="انتقال دامنه"
            />
          </RadioGroup>
        </Grid>
        <Grid xs={12} lg={8} item container spacing={1}>
          <Grid item xs={4}>
            <FormControl sx={{ direction: "rtl" }} required fullWidth>
              <InputLabel>tld</InputLabel>
              <Select
                value={extObject.id || ""}
                label="Ext"
                sx={{
                  [`& .${selectClasses.select}`]: {
                    background: "white",
                    borderRadius: BORDER_RADIUS_1,
                    paddingBottom: "15px",
                  },
                  [`& .${outlinedInputClasses.notchedOutline}`]: {
                    border: "none",
                    backgroundColor: "rgba(110, 118, 138, 0.06)",
                  },
                  // "&:hover": {
                  //   [`& .${outlinedInputClasses.notchedOutline}`]: {},
                  // },
                }}
                onChange={extInputChangeHandler}
                renderValue={() => (
                  <Box display="flex" alignItems="center">
                    {getBundleListIsLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      extObject.name || bundleList[0].name || ""
                    )}
                  </Box>
                )}
              >
                {bundleList?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      sx={{ direction: "rtl" }}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <DorsaTextField
              value={domainName}
              onKeyDown={(e) =>
                e.key === "Enter" && { domainNameInputChangeHandler }
              }
              onChange={domainNameInputChangeHandler}
              placeholder="example.com"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
          <Grid item xs={12}>
            {productId === 11 && (
              <DorsaTextField
                value={authCode}
                onKeyDown={(e) =>
                  e.key === "Enter" && { authCodeInputChangeHandler }
                }
                onChange={authCodeInputChangeHandler}
                placeholder="کد انتقال"
                fullWidth
                inputProps={{ dir: "ltr" }}
              />
            )}
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          onClick={termInputChangeHandler}
          columnGap={1}
          sx={{ cursor: "pointer" }}
          width="fit-content"
          mt={3}
          mr="auto"
        >
          <Checkbox
            value={term}
            checked={term}
            sx={{ p: 0, borderRadius: BORDER_RADIUS_1 }}
          />
          <Typography align="left">
            با شرایط و قوانین استفاده از سایت و حریم خصوصی موافقم
          </Typography>
        </Stack>
      </Grid>
    </Box>
  );
};
