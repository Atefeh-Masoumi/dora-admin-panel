import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type ChooseInfoPropsType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export const ChooseInfo: FC<ChooseInfoPropsType> = ({
  name,
  setName,
  password,
  setPassword,
}) => {
  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

  const passwordInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPassword(e.target.value);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" my={4}>
      <DorsaTextField
        value={name}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام سرور ابری (Server Name)"
        dir="ltr"
      />
      <DorsaTextField
        value={password}
        onChange={passwordInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="رمز عبور سرور ابری (Password)"
        dir="ltr"
      />
    </Stack>
  );
};
