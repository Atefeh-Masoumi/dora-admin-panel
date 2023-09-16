import { ChangeEvent, FC, useContext } from "react";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { GlobalEdit } from "src/components/atoms/svg/GlobalEdit";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { AddZoneContext } from "src/components/organisms/cdn/add/contexts/AddContext";

type SelectDomainPropsType = {};

export const SelectDomain: FC<SelectDomainPropsType> = () => {
  const { domainName, setDomainName, term, setTerm } =
    useContext(AddZoneContext);

  const domainNameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDomainName(e.target.value);

  const termInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.checked);

  return (
    <Stack p={{ xs: 0, md: 2 }} spacing={1}>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ borderRadius: 3, bgcolor: "white" }}
      >
        <Stack spacing={1} py={1} px={1} alignItems="center">
          <Stack
            borderRadius="100%"
            border="18px solid rgba(60, 138, 255, 0.04)"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                width: { xs: "90px", md: "166px" },
                height: { xs: "90px", md: "166px" },
                borderRadius: "100%",
                backgroundColor: "rgba(60, 138, 255, 0.1)",
              }}
              p={3}
            >
              <GlobalEdit
                sx={{ width: "100%", height: "100%", color: "primary.main" }}
              />
            </Stack>
          </Stack>
          <Typography variant="text14" color="secondary">
            لطفا آدرس دامنه خود را بدون www وارد کنید
          </Typography>

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
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={{ xs: 1, md: 0 }}
            width="100%"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <FormControlLabel
                color="secondary.main"
                label="با شرایط و قوانین استفاده از سایت و حریم خصوصی موافقم"
                control={
                  <Checkbox
                    value={term}
                    checked={term}
                    sx={{ p: 0, borderRadius: 0 }}
                    onChange={termInputChangeHandler}
                  />
                }
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
