import { Box } from "@mui/material";
import { type FC } from "react";
import { useGetApiMyPortalProfileGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import CustomTabComponent, {
  tabsType,
} from "src/components/organisms/CustomTab";
import Wallet from "./walletTransaction/Index";
import CustomerBills from "./customerBill/Index";
import Invoices from "./invoice/Index";
import Payments from "./payment/Index";

const tabs: tabsType[] = [
  { title: "محاسبات", content: <CustomerBills /> },
  { title: "کیف پول", content: <Wallet /> },
  { title: "فاکتورها", content: <Invoices /> },
  { title: "پرداخت ها", content: <Payments /> },
];

const Financial: FC = () => {
  const { isLoading } = useGetApiMyPortalProfileGetQuery();

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
