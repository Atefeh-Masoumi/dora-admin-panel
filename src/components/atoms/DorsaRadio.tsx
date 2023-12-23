import { styled } from "@mui/material/styles";
import { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  formControlLabelClasses,
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  "&": {
    border: "1px solid #dedede",
    borderRadius: "50px",
    borderColor: checked && theme.palette.primary.main,
    backgroundColor: "#f9f9f9",
    marginBottom: "10px",
  },
  [`& .${formControlLabelClasses.label}`]: {
    color: checked && theme.palette.primary.main,
  },
}));

export default function DorsaRadio(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}
