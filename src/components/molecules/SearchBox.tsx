import type { FC } from "react";
import { Input, InputAdornment } from "@mui/material";
import { Search } from "src/components/atoms/svg-icons/SearchSvg";

export const SearchBox: FC<{
  placeholder: string;
  search?: string;
  onChange?: (text: string) => void;
  fullWidth?: boolean;
}> = ({ placeholder, search, onChange, fullWidth }, props) => {
  return (
    <Input
      {...props}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      value={search}
      disableUnderline={true}
      fullWidth={fullWidth}
      sx={{
        ...props.sx,
        backgroundColor: "rgba(110, 118, 138, 0.06)",
        p: 1,
        borderRadius: 1,
        color: "secondary",
      }}
      startAdornment={
        <InputAdornment position="start">
          <Search
            sx={{
              "& path": { stroke: ({ palette }) => palette.secondary.main },
            }}
          />
        </InputAdornment>
      }
    />
  );
};
