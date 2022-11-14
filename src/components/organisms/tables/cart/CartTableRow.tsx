import { FC, MouseEventHandler } from "react";
import { IconButton, Stack } from "@mui/material";
import { cartTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { useNavigate } from "react-router";
import { DeleteSvg } from "src/components/atoms/svg/DeleteSvg";
import { usePutApiV2PortalOrderCancelByIdMutation } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { toast } from "react-toastify";

export const CartTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();

  const [deleteOrder, { isLoading: deleteOrderLoading }] =
    usePutApiV2PortalOrderCancelByIdMutation();

  const deleteOrderHandler = () => {
    if (!row.id || isNaN(Number(row.id))) return;
    deleteOrder({ id: Number(row.id) })
      .unwrap()
      .then(() =>
        toast.success("محصول مورد نظر با موفقیت از سبد خرید شما حذف شد")
      );
  };

  const deleteButtonClickHandler: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    e.preventDefault();
    deleteOrderHandler();
  };

  const goToOrderDetails = () => navigate(`/cart/${row.id}`);

  return (
    <>
      {deleteOrderLoading && <PageLoading />}
      <DorsaTableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.usedCode}
        sx={{ cursor: "pointer" }}
        onClick={goToOrderDetails}
      >
        {cartTableStruct.map((column) => {
          const value = row[column.id];
          const text =
            column.format && typeof value === "number"
              ? column.format(value)
              : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 5, whiteSpace: "nowrap" }}
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
                <Stack>{text}</Stack>
              )}
            </DorsaTableCell>
          );
        })}
        <DorsaTableCell align="center" sx={{ px: 5, whiteSpace: "nowrap" }}>
          <IconButton onClick={deleteButtonClickHandler}>
            <DeleteSvg />
          </IconButton>
        </DorsaTableCell>
      </DorsaTableRow>
    </>
  );
};
