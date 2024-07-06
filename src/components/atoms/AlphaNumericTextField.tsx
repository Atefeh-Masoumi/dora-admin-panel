import { ChangeEventHandler, FC, ReactNode, useCallback, useMemo } from "react";
import { TextField, TextFieldProps, styled } from "@mui/material";
import { e2p } from "src/utils/e2p.utils";
import { onlyNumber } from "src/utils/onlyNumber.utils";
import { p2e } from "src/utils/p2e.utils";
import { FormikProps } from "formik";
import { priceToPersian } from "src/utils/priceToPersian.utils";
import { onlyEnCharacter } from "src/utils/regex.utils";
import { toast } from "react-toastify";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/createEmotionCache";

const NoFlipTextField = styled(TextField)`
  /* @noflip */
  text-align: left;
`;

type AlphaNumericTextFieldPropsType = TextFieldProps & {
  id: string;
  isNumber?: boolean;
  isPrice?: boolean;
  formik: FormikProps<any>;
  enableE2p?: boolean;
};

export const AlphaNumericTextField: FC<AlphaNumericTextFieldPropsType> = ({
  id,
  isNumber = false,
  isPrice = false,
  formik,
  enableE2p = false,
  ...rest
}) => {
  const enhancedValue = useMemo(() => {
    let newValue = formik.values[id];
    if (isPrice) {
      newValue = priceToPersian(newValue);
    }
    if (enableE2p) {
      newValue = e2p(newValue || "");
    }
    return newValue;
  }, [enableE2p, formik.values, id, isPrice]);
  const enhancedOnChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    ({ target: { value } }) => {
      let newValue = value;
      if (enableE2p || isPrice) {
        newValue = p2e(newValue);
      }
      if (isNumber || isPrice) {
        newValue = onlyNumber(value);
      }
      const validChars = newValue.split("").filter((char) => {
        if (onlyEnCharacter.test(char)) {
          return char;
        } else {
          !toast.isActive("noneEnglishChar") &&
            toast.warning("لطفاً زبان سیستم خود را بر روی انگلیسی تنظیم کنید", {
              toastId: "noneEnglishChar",
            });
          return "";
        }
      });
      newValue = validChars.join("");
      formik.setFieldValue(id, newValue);
    },
    [enableE2p, formik, id, isNumber, isPrice]
  );

  return (
    <CacheProvider value={createEmotionCache("ltr")}>
      <NoFlipTextField
        {...(formik.getFieldProps(id),
        { onChange: enhancedOnChange, value: enhancedValue })}
        error={Boolean(formik.touched[id] && formik.errors[id])}
        helperText={formik.touched[id] && (formik.errors[id] as ReactNode)}
        {...rest}
      />
    </CacheProvider>
  );
};
