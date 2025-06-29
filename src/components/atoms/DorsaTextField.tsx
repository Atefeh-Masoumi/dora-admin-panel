import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

type DorsaTextFieldProps = {
  mode?: "white" | "black";
  error?: boolean;
  password?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // Add this line
};

export const DorsaTextField = styled(TextField)<DorsaTextFieldProps>(
  ({ mode = "black", error, inputProps }) => ({
    "&> .MuiInputBase-root": {
      ...(!error && {
        backgroundColor:
          mode === "black"
            ? "rgba(110, 118, 138, 0.06)"
            : "rgba(255, 255, 255, 0.25)",
        color: mode === "black" ? "secondary" : "white",
        "& fieldset": { border: "none" },
      }),
      fontSize: "14px",
      ...inputProps,
    },
  })
);
