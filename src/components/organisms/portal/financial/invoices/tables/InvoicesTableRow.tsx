import { LoadingButton } from "@mui/lab";
import { Button, Chip, Stack } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { usePostApiMyPortalInvoicePayMutation } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { invoicesTableStruct } from "./struct";

const InvoicesTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();

  const [invoicePayment, { isLoading: invoicePaymentLoading }] =
    usePostApiMyPortalInvoicePayMutation();

  const payInvoice: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (row["invoiceStatusId"] !== 3 || !row["id"]) return;

    invoicePayment({ payInvoiceModel: { id: row["id"] } })
      .unwrap()
      .then(() => {
        toast.success(".پرداخت با موفقیت انجام شد");
        navigate("/portal/wallet/invoice");
      });
  };

  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.usedCode}>
      {invoicesTableStruct.map((column) => {
        const value = row[column.id];
        const text =
          column.format && typeof value === "number"
            ? column.format(value)
            : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ py: 2.9, px: 1, whiteSpace: "nowrap" }}
          >
            {column.id === "title" ? (
              <Stack
                sx={{
                  maxWidth: 232,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {text}
              </Stack>
            ) : (
              <Stack>
                {column.id === "invoiceStatus" ? (
                  <>
                    {row["invoiceStatusId"] === 3 ? (
                      <LoadingButton
                        variant="outlined"
                        loading={invoicePaymentLoading}
                        onClick={payInvoice}
                      >
                        پرداخت
                      </LoadingButton>
                    ) : (
                      <Chip
                        label={text}
                        sx={{
                          cursor: "pointer",
                          backgroundColor:
                            row["invoiceStatusId"] === 1
                              ? "success.light"
                              : "error.light",
                          color:
                            row["invoiceStatusId"] === 1
                              ? "success.main"
                              : "error.main",
                          py: 2.2,
                          borderRadius: 1,
                          fontSize: "14px",
                        }}
                      />
                    )}
                  </>
                ) : column.id === "totalPrice" ||
                  column.id === "vat" ||
                  column.id === "discount" ||
                  column.id === "invoicePrice" ? (
                  <Stack>{text} ریال</Stack>
                ) : column.id === "view" ? (
                  <Button
                    onClick={() =>
                      navigate(
                        `/portal/financial?tab=invoice&invoice-id=${row.id}`
                      )
                    }
                    variant="text"
                  >
                    مشاهده
                  </Button>
                ) : (
                  text
                )}
              </Stack>
            )}
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};

export default withTableRowWrapper(InvoicesTableRow);
