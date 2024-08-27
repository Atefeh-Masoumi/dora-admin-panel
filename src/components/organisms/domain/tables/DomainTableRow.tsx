import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  DomainListResponse,
  useDeleteApiMyDomainHostDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { domainTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const DomainTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedDomain, setSelectedDomain] =
    useState<DomainListResponse | null>(null);
  const navigate = useNavigate();
  const [deleteItem, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyDomainHostDeleteByIdMutation();

  const settingOnClick = () => navigate("/domain/" + row["id"]);

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedDomain(null);
  };

  const handleOpenDelete = (domain: DomainListResponse) => {
    setSelectedDomain(domain);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteDnsRecordHandler = () =>
    deleteItem({ id: Number(selectedDomain?.id) })
      .unwrap()
      .then((res) => {
        toast.success("دامنه با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {domainTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  {/* <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={goToOrderDetails}
                  >
                    <CreditCardIcon sx={{ color: "grey.700" }} />
                  </IconButton> */}
                  <IconButton
                    disabled={row.statusId !== 2}
                    sx={{ borderRadius: 1 }}
                    onClick={settingOnClick}
                  >
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton
                    disabled={row.statusId !== 2}
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  {column.id === "statusId" ? (
                    <Chip
                      clickable={false}
                      label={
                        id === 1
                          ? "پرداخت نشده"
                          : id === 2
                          ? "فعال"
                          : id === 3
                          ? "غیرفعال"
                          : id === 4
                          ? "منقضی شده"
                          : id === 5
                          ? "حذف شده"
                          : id === 6
                          ? "درانتظار انجام عملیات"
                          : id === 7
                          ? "بازسازی"
                          : id === 8
                          ? "خطا"
                          : id === 9
                          ? "بازسازی"
                          : id === 10
                          ? "خاموش"
                          : id === 11
                          ? "در صف انتظار"
                          : "ناموفق"
                      }
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          id === 6 ||
                          id === 7 ||
                          id === 8 ||
                          id === 9 ||
                          id === 10 ||
                          id === 11
                            ? "warning.light"
                            : id === 2
                            ? "success.light"
                            : "error.light",
                        color:
                          id === 6 ||
                          id === 7 ||
                          id === 8 ||
                          id === 9 ||
                          id === 10 ||
                          id === 11
                            ? "warning.main"
                            : id === 2
                            ? "success.main"
                            : "error.main",
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : (
                    text
                  )}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="DNS"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedDomain?.domainName || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(DomainTableRow);
