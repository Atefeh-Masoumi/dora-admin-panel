import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import image1 from "src/assets/images/image1.png";
import { useLocation } from "react-router";

type SpecialOfferPropsType = {};

export const SpecialOffer: FC<SpecialOfferPropsType> = () => {
  const { pathname } = useLocation();

  const isCollapsed = pathname !== "/" && pathname !== "/api";

  return (
    <Stack
      display="none"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        display: { xs: "none", lg: "flex" },
        width: 232,
        minHeight: 222,
        px: 1,
        py: 2,
        bgcolor: ({ palette }) => palette.primary.main,
        borderRadius: BORDER_RADIUS_4,
        opacity: isCollapsed ? "0" : "100%",
        transition: isCollapsed
          ? "opacity 0s ease-out"
          : "opacity 0.5s ease-in",
      }}
    >
      <img src={image1} alt="" style={{ width: "90px", height: "90px" }} />
      <Typography fontWeight={700} fontSize="18px" color="white">
        فروش ویژه
      </Typography>
      <Typography fontSize="12px" color="white">
        برنامه فروش و تخفیفات ویژه بهاری ابر درسا
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderColor: "white",
          color: "white",
          "&:hover": {
            borderColor: "white",
            color: "white",
          },
        }}
        href="/sales"
      >
        مشاهده پلن‌ها
      </Button>
    </Stack>
  );
};
