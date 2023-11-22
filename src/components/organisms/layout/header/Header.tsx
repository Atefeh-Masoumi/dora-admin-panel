import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Popover,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { BORDER_RADIUS_4, BORDER_RADIUS_5 } from "src/configs/theme";
import MenuSvg from "src/components/atoms/svg/MenuSvg";
import CalculatorSvg from "src/components/atoms/svg/CalculatorSvg";
import HeadphoneSvg from "src/components/atoms/svg/HeadphoneSvg";
import MoreSvg from "src/components/atoms/svg/MoreSvg";
import { WalletMenu } from "src/components/organisms/header/WalletMenu";
import { Notifications } from "../../header/Notifications";
import { useNavigate } from "react-router";
import {
  ArrowForward as ArrowForwardIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";

type HeaderPropsType = {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  title?: string;
  link?: { text: string; url: string };
  isScrolled?: boolean;
  RightComponent?: FC;
};

const Header: FC<HeaderPropsType> = ({
  setShowSidebar,
  title,
  link,
  isScrolled,
  RightComponent,
}) => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >();

  const navigate = useNavigate();

  const goToCalculator = () => navigate("/cloud/calculator");

  const closeMenuHandler = () => setAnchorEl(null);
  const openMenuHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(currentTarget);

  const open = Boolean(anchorEl);
  const id = open ? "header menu" : undefined;

  const notPaidList:any = [];
  const desktopHeaderIcon = (
    <>
      <Notifications />
      <IconButton
        sx={{
          border: 1,
          borderRadius: { xs: 62, lg: 8 },
          borderColor: "rgba(110, 118, 138, 0.16)",
        }}
        onClick={goToCalculator}
      >
        <CalculatorSvg mode="default" sx={{ opacity: "0.8" }} />
      </IconButton>
      <IconButton
        sx={{
          border: 1,
          borderRadius: { xs: 62, lg: 8 },
          borderColor: "rgba(110, 118, 138, 0.16)",
        }}
        onClick={() => {
          closeMenuHandler();
          navigate("/cloud/supports");
        }}
      >
        <HeadphoneSvg mode="default" sx={{ opacity: "0.8" }} />
      </IconButton>
      <Badge
        badgeContent={notPaidList?.length}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        overlap="circular"
        color="primary"
      >
        <IconButton
          sx={{
            border: 1,
            borderRadius: { xs: 62, lg: 8 },
            borderColor: "rgba(110, 118, 138, 0.16)",
          }}
          onClick={() => {
            closeMenuHandler();
            navigate("/cloud/orders");
          }}
        >
          <ShoppingCartOutlinedIcon sx={{ color: "grey.700" }} />
        </IconButton>
      </Badge>
    </>
  );

  const mobileHeaderIcon = (
    <>
      <IconButton
        sx={{
          border: 1,
          borderRadius: { xs: 62, lg: 8 },
          borderColor: "rgba(110, 118, 138, 0.16)",
          display: { xs: "inline-flex", md: "none" },
        }}
        onClick={openMenuHandler}
      >
        <MoreSvg />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenuHandler}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            bgcolor: "white",
            py: 2,
            mt: 1,
          },
        }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Stack rowGap={2} px={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {desktopHeaderIcon}
          </Stack>
          <WalletMenu />
        </Stack>
      </Popover>
    </>
  );

  return (
    <AppBar
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "100vw",
        boxShadow: isScrolled ? 4 : 0,
        bgcolor: "white",
        overflow: "overlay",
      }}
    >
      <Toolbar sx={{ p: 0 + "!important" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: "100%",
            height: "100%",
            py: { xs: 1, lg: 2 },
            px: { xs: 1.5, lg: 3 },
            borderRadius: { xs: BORDER_RADIUS_5, lg: BORDER_RADIUS_4 },
            zIndex: 2,
          }}
        >
          <Stack direction="row" alignItems="center" columnGap={1}>
            {!link && (
              <IconButton
                size="small"
                sx={{
                  width: 34,
                  height: 34,
                  display: { xs: "block", lg: "none" },
                }}
                onClick={() => setShowSidebar(true)}
              >
                <MenuSvg />
              </IconButton>
            )}

            <Stack direction="row" alignItems="center" spacing={1}>
              {link && (
                <Button href={link.url} color="secondary">
                  <ArrowForwardIcon
                    color="secondary"
                    sx={{ width: { xs: 30, md: 40 } }}
                  />
                  <Typography
                    fontSize={16}
                    display={{ xs: "none", md: "flex" }}
                  >
                    {link.text}
                  </Typography>
                </Button>
              )}
              {title && (
                <Typography
                  variant="title5"
                  fontWeight={700}
                  whiteSpace="nowrap"
                  lineHeight={1}
                  color={({ palette }) => palette.grey[700]}
                >
                  {title}
                </Typography>
              )}
              {RightComponent && <RightComponent />}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            display={{ xs: "none", md: "inline-flex" }}
          >
            <WalletMenu />
            {desktopHeaderIcon}
          </Stack>
          {mobileHeaderIcon}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
