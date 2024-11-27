import { Box } from "@mui/material";
import { type FC } from "react";
import { useGetApiMyAccountProfileGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import CustomTabComponent, {
  tabsType,
} from "src/components/molecules/DorsaTab";
import Wallet from "./WalletTransactions";
import CustomerBills from "./CustomerBills";
import Invoices from "./Invoices";
import Payments from "./Payments";
import { AccountSvg } from "src/components/atoms/svg-icons/AccountSvg";
import Commission from "./Commission";

const tabs: tabsType[] = [
  {
    title: "محاسبات",
    icon: AccountSvg,
    content: <CustomerBills />,
    path: "customer-bill",
  },
  { title: "کیف پول", icon: AccountSvg, content: <Wallet />, path: "wallet" },
  {
    title: "فاکتورها",
    icon: AccountSvg,
    content: <Invoices />,
    path: "invoice",
  },
  {
    title: "پرداخت ها",
    icon: AccountSvg,
    content: <Payments />,
    path: "payment",
  },
  {
    title: "کمیسیون",
    icon: AccountSvg,
    content: <Commission />,
    path: "commission",
  },
];

const Financial: FC = () => {
  const { isLoading } = useGetApiMyAccountProfileGetQuery();

  return (
    <>
      {isLoading && <PageLoading />}
      <Box sx={{ my: 1 }}>
        <CustomTabComponent tabs={tabs} />
      </Box>
    </>
  );
};

export default Financial;
