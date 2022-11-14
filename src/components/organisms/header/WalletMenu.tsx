import React, { FC, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinearProgress, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WalletSvg from "../../atoms/svg/WalletSvg";
import { InvoiceSvg } from "../../atoms/svg/InvoiceSvg";
import { DepositDialog } from "src/pages/wallet/DepositDialog";
import { useGetApiV2PortalWalletGetBalanceQuery } from "src/app/services/api.generated";
import { useNavigate } from "react-router";
import { CalculateSvg } from "src/components/atoms/svg/CalculateSvg";
import { TransactionSvg } from "src/components/atoms/svg/TransactionSvg";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.secondary.main,
    // boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      backgroundColor: "rgba(243, 244, 246, 1)",
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const items = [
  {
    value: "deposit",
    label: "افزایش موجودی",
    icon: AddIcon,
    function: true,
  },
  {
    value: "wallet",
    label: "گزارش کیف پول",
    icon: WalletSvg,
    link: "/wallet",
  },
  {
    value: "invoice",
    label: "فاکتور های فروش",
    icon: InvoiceSvg,
    link: "/wallet/salesInvoice",
  },
  {
    value: "transaction",
    label: "گزارش تراکنش ها",
    icon: TransactionSvg,
    link: "/wallet/report",
  },
  {
    value: "calculations",
    label: "گزارش محاسبات",
    icon: CalculateSvg,
    link: "/wallet/bills",
  },
];

export const WalletMenu: FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const { data: balance, isLoading } = useGetApiV2PortalWalletGetBalanceQuery();
  const separateBalance = balance
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleDeposit = () => setOpenDeposit(true);
  const [openDeposit, setOpenDeposit] = useState(false);
  const closeDeposit = () => setOpenDeposit(false);

  return (
    <Stack>
      <Button
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<ExpandMoreIcon sx={{ fontSize: "1.5em !important" }} />}
        color="secondary"
        sx={{ backgroundColor: "rgba(110, 118, 138, 0.06)", py: 1.3 }}
        fullWidth
      >
        {isLoading ? (
          <Stack width={30}>
            <LinearProgress />
          </Stack>
        ) : (
          <Stack direction="row" spacing={0.5}>
            <Typography sx={{ direction: "rtl" }}>{`${
              separateBalance || 0
            }`}</Typography>
            <Typography> ریال </Typography>
          </Stack>
        )}
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem
            key={item.value}
            disableRipple
            sx={{ borderRadius: 1, m: 1, py: 2 }}
            onClick={() => {
              item.function ? handleDeposit() : handleClose();
              item.link ? navigate(item.link) : handleClose();
              handleClose();
            }}
          >
            <item.icon fontSize="large" />
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
      </StyledMenu>
      <DepositDialog openDialog={openDeposit} handleClose={closeDeposit} />
    </Stack>
  );
};
