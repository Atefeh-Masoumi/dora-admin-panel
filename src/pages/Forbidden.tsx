import { FC } from "react";
import { Button, Typography, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockImage from "src/assets/images/Lock.svg";

const Forbidden: FC = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <Container>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="column" justifyContent="center">
          <Stack
            sx={{ margin: "0 auto", display: "flex", flexDirection: "row" }}
          >
            <Typography
              sx={{
                fontSize: "110px !important",
                fontWeight: "bold",
                color: "#a4a4a4",
              }}
            >
              ۳
            </Typography>
            <img
              src={LockImage}
              alt="page not found"
              style={{ width: "100px", height: "100px", margin: "0" }}
            />
            <Typography
              sx={{
                fontSize: "110px !important",
                fontWeight: "bold",
                color: "#a4a4a4",
              }}
            >
              ۴
            </Typography>
          </Stack>

          <Stack
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
            columnGap={3}
          >
            <Typography
              align="center"
              sx={{ fontSize: "20px !important", marginBottom: "10px" }}
            >
              متاسفیم, شما به این صفحه دسترسی ندارید.
            </Typography>
            <Button
              size="large"
              sx={{
                minWidth: "50%",
                fontWeight: "500",
              }}
              variant="contained"
              onClick={goHome}
            >
              بازگشت به خانه
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Forbidden;
