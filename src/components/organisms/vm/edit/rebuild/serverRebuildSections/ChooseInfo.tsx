import { FC, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikProps } from "formik";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  error: {
    "& .MuiOutlinedInput-root.Mui-error": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Change the border color to red on error
        backgroundColor: "rgba(110, 118, 138, 0.06)",
      },
    },
  },
});

type ChooseInfoPropsType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  formik: FormikProps<any>;
};

export const ChooseInfo: FC<ChooseInfoPropsType> = ({
  name,
  setName,
  password,
  setPassword,
  formik,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" my={4}>
      <DorsaTextField
        sx={{ minWidth: 300 }}
        label="نام سرور ابری (Server Name)"
        dir="ltr"
        focused
        {...formik.getFieldProps("serverName")}
        error={Boolean(formik.errors.serverName && formik.touched.serverName)}
        className={classes.error}
      />
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        sx={{ minWidth: 300 }}
        label={`رمز عبور سرور ابری (Password)`}
        dir="ltr"
        focused
        {...formik.getFieldProps("password")}
        error={Boolean(formik.errors.password && formik.touched.password)}
        className={classes.error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};
