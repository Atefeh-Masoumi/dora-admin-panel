import type { FC } from "react";
import { Input, InputAdornment } from "@mui/material";
import { Search } from "src/components/atoms/svg-icons/SearchSvg";

interface SearchBoxProps  {
  placeholder: string;
  search?: string;
  onChange?: (text: string) => void;
  fullWidth?: boolean;
}

export const SearchBox: FC<SearchBoxProps> = ({
  placeholder,
  search,
  onChange,
  fullWidth,
  ...props
}) => {
  return (
    <Input
      {...props}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      value={search}
      disableUnderline={true}
      fullWidth={fullWidth}
      sx={{
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
