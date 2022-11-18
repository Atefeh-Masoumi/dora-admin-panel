import { FC } from "react";
import { Button, Typography, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFoundImage from "src/assets/images/404.svg";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack
      component={Stack}
      sx={{
        width: "100%",
        height: "100%",
      }}
      textAlign="center"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ width: "100%", maxWidth: "1000px" }}>
        <Stack direction="column" rowGap={5}>
          <Box>
            <Typography fontWeight="bold" fontSize={30} align="center">
              صفحه مورد نظر پیدا نشد
            </Typography>
            <Typography fontSize={20} align="center">
              به نظر میرسد صفحه مورد نظر شما وجود ندارد
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnGap={3}
          >
            <Button
              onClick={() => navigate(-1)}
              size="large"
              sx={{
                minWidth: "150px",
              }}
              variant="contained"
            >
              بازگشت
            </Button>
            <Button
              size="large"
              sx={{
                minWidth: "150px",
              }}
              variant="contained"
              href="/dash/index"
            >
              خانه
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          <img src={notFoundImage} alt="page not found" />
        </Box>
      </Box>
    </Stack>
  );
};

export default NotFound;
