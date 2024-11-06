import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Popover,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useNavigate, useParams } from "react-router";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { BACK_URL_HINTS_ENUM } from "src/constant/backUrlHintsEnum";
import MenuSvg from "src/components/atoms/svg-icons/MenuSvg";
import MoreSvg from "src/components/atoms/svg-icons/MoreSvg";
import { CalculatorSvg } from "src/components/atoms/svg-icons/CalculatorSvg";
import { HeadphoneSvg } from "src/components/atoms/svg-icons/HeadphoneSvg";
import { Notifications } from "./Notifications";
import { ManageMenu } from "./ManageMenu";
import { useSearchParams } from "react-router-dom";

type HeaderPropsType = {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  title?: string;
  link?: { text: string; url: string | number };
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
  const [searchParams] = useSearchParams();
  const { id: kubernetesClusterID } = useParams();
  const { projectId } = useParams();
  const vpcId = searchParams.get("vpcId");
  const { kubernetesCloudId } = useParams();

  const goToCalculator = () => navigate("/portal/calculator");

  const closeMenuHandler = () => setAnchorEl(null);
  const openMenuHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(currentTarget);

  const open = Boolean(anchorEl);
  const id = open ? "header menu" : undefined;

  const desktopHeaderIcon = (
    <>
      <Notifications />
      <IconButton
        sx={{
          border: 1,
          borderRadius: BORDER_RADIUS_1,
          borderColor: "rgba(110, 118, 138, 0.16)",
        }}
        onClick={goToCalculator}
      >
        <CalculatorSvg fill="transparent" />
      </IconButton>
      <IconButton
        sx={{
          border: 1,
          borderRadius: BORDER_RADIUS_1,
          borderColor: "rgba(110, 118, 138, 0.16)",
        }}
        onClick={() => {
          closeMenuHandler();
          navigate("/portal/supports");
        }}
      >
        <HeadphoneSvg
          fill="transparent"
          mode="default"
          sx={{ width: "100%", height: "100%" }}
        />
      </IconButton>
    </>
  );

  const mobileHeaderIcon = (
    <>
      <IconButton
        sx={{
          border: 1,
          borderRadius: BORDER_RADIUS_1,
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
          <ManageMenu />
        </Stack>
      </Popover>
    </>
  );
  console.log({ vpcId });

  const backButtonOnClick = (url: string | number) => {
    let href: string | number = "";
    switch (url) {
      case BACK_URL_HINTS_ENUM.ADD_NODE:
        href = `/kubernetes-cluster/${kubernetesClusterID}`;
        break;
      case BACK_URL_HINTS_ENUM.ADD_DEPLOYMENT:
        navigate(-1);
        return;
      case BACK_URL_HINTS_ENUM.ADD_VM:
        href =
          !projectId || !vpcId
            ? `/vm/${projectId}/list`
            : `/vpc/${vpcId}/vpcVm?projectId=${projectId}&vpcId=${vpcId}`;
        break;
      case BACK_URL_HINTS_ENUM.EDIT_VM:
        href = !vpcId
          ? `/vm`
          : `/vpc/${vpcId}/vpcVm?projectId=${projectId}&vpcId=${vpcId}`;

        break;
      default:
        href = typeof url === "string" ? url : "";
        break;
    }
    if (href) {
      navigate(href);
    }
  };

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
        borderRadius: BORDER_RADIUS_1,
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
            borderRadius: BORDER_RADIUS_1,
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
                <Button
                  onClick={() => backButtonOnClick(link.url)}
                  // href={link.url}
                  color="secondary"
                >
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
            <ManageMenu />
            {desktopHeaderIcon}
          </Stack>
          {mobileHeaderIcon}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
