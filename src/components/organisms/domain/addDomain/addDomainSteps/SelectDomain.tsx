import { ChangeEvent, FC, useContext } from "react";
import { Radio, RadioGroup, Grid, Autocomplete } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { AddDomainContext } from "src/components/organisms/domain/addDomain/context/AddDomainContext";
import { Box } from "@mui/system";
import DorsaRadio from "src/components/atoms/DorsaRadio";

const useDomainArray = [
  { name: "com", value: "com" },
  { name: "net", value: "net" },
  { name: "org", value: "org" },
  { name: "zone", value: "zone" },
];

type SelectDomainPropsType = {};

export const SelectDomain: FC<SelectDomainPropsType> = () => {
  const { domainName, setDomainName } = useContext(AddDomainContext);
  const { ext, setExt } = useContext(AddDomainContext);
  const { typeId, setTypeId } = useContext(AddDomainContext);
  const { authCode, setAuthCode } = useContext(AddDomainContext);

  const typeChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setTypeId(parseInt(value));
    if (parseInt(value) === 1) {
      setAuthCode("Auth Code")
    } else {
      setAuthCode("")
    }
  }

  const domainNameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDomainName(e.target.value);

  const authCodeInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAuthCode(e.target.value);

  const extInputChangeHandler = (_event: any, newValue: { name: string; value: string; } | null) => {
    if (!newValue) return;
    setExt((newValue && newValue.value) || "")
  };

  return (
    <Box sx={{ p: { xs: 0, md: 2 }, mx: "auto", maxWidth: "500px", textAlign: "center" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ borderRadius: 1, bgcolor: "white" }}
      >
        <Grid xs={12} lg={4} item sx={{ p: { xs: 2, lg: 0 }, mr: { xs: -3, lg: 0 } }}>
          <RadioGroup
            name={"typeId"}
            value={typeId.toString()}
            onChange={typeChangeHandler}
          >
            <DorsaRadio sx={{ width: { xs: "100%", lg: "100%" }, }} value="1" control={<Radio />} label="ثبت دامنه" />
            <DorsaRadio sx={{ width: { xs: "100%", lg: "100%" }, }} value="2" control={<Radio />} label="انتقال دامنه" />
          </RadioGroup>
        </Grid>
        <Grid xs={12} lg={8} item container spacing={1}>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              disableClearable
              value={
                useDomainArray.find(
                  (option: { name: string; value: string; }) => option.value === ext
                )
              }
              options={useDomainArray}
              getOptionLabel={(option: { name: string; value: string; }) => (option && option.name) || ""}
              onChange={extInputChangeHandler}
              renderInput={(params) => <DorsaTextField {...params} label="دامنه" />}
            />
          </Grid>
          <Grid item xs={8}>
            <DorsaTextField
              value={domainName}
              onKeyDown={(e) => e.key === "Enter" && { domainNameInputChangeHandler }}
              onChange={domainNameInputChangeHandler}
              placeholder="example.com"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
          </Grid>
          <Grid item xs={12}>
            {typeId === 2 && (
              <DorsaTextField
                value={authCode}
                onKeyDown={(e) => e.key === "Enter" && { authCodeInputChangeHandler }}
                onChange={authCodeInputChangeHandler}
                placeholder="کد انتقال"
                fullWidth
                inputProps={{ dir: "ltr" }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
