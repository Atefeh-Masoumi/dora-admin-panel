import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import image1 from "src/assets/images/image1.png";

type SpecialOfferPropsType = {};

export const SpecialOffer: FC<SpecialOfferPropsType> = () => {
  return (
    <Stack
      display="none"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        display: { xs: "none", lg: "flex" },
        width: 200,
        minHeight: 180,
        mt: 1,
        p: 1,
        bgcolor: ({ palette }) => palette.primary.main,
        borderRadius: BORDER_RADIUS_1,
      }}
    >
      <img src={image1} alt="offer" style={{ width: "75px", height: "75px" }} />
      <Typography fontWeight={700} fontSize="18px" color="white" sx={{ m: 1 }}>
        فروش ویژه
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
        href="/portal/sales"
      >
        مشاهده پلن‌ها
      </Button>
    </Stack>
  );
};
