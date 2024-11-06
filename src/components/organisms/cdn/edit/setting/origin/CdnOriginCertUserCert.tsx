import { Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useGetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdQuery } from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { TextLoading } from "src/components/molecules/TextLoading";
import { CreateOriginUserCertDialog } from "../dialogs/CreateOriginUserCertDialog";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";
import EmptyTableSvg from "src/components/atoms/svg-icons/EmptyTableSvg.svg";

type CdnOriginCertUserCertPropsType = {
  dnsId: number;
  loading?: boolean;
};

export const CdnOriginCertUserCert: FC<CdnOriginCertUserCertPropsType> = ({
  dnsId,
  loading,
}) => {
  const { data: userCert, isLoading } =
    useGetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdQuery({
      dnsCdnHostId: dnsId,
    });

  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Stack bgcolor="white" borderRadius={BORDER_RADIUS_1} p={2} width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>گواهی کاربر</Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: 1.5, border: 1 }}
          startIcon={
            <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
          }
          onClick={handleOpen}
        >
          {userCert ? "تمدید گواهی" : "افزودن"}
        </Button>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", my: 2 }} />
      {userCert ? (
        <Stack spacing={2} px={1} color="secondary.main">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">صادرکننده گواهی:</Typography>
            {isLoading ? (
              <TextLoading num={9} />
            ) : (
              <Typography variant="text15">{userCert?.issuer}</Typography>
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">پایان اعتبار:</Typography>
            {isLoading ? (
              <TextLoading num={8} />
            ) : (
              <Typography variant="text15">
                {userCert?.expirationDate
                  ? ConvertToJalali(String(userCert?.expirationDate))
                  : "---"}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">دامنه‌ها:</Typography>
            {isLoading ? (
              <TextLoading num={9} />
            ) : (
              <Typography variant="text15">{userCert?.commonName}</Typography>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="center">
          <img
            src={EmptyTableSvg}
            alt="Empty Card"
            style={{ maxWidth: "160px", maxHeight: "100px" }}
          />
        </Stack>
      )}
      <CreateOriginUserCertDialog
        openDialog={open}
        handleClose={handleClose}
        dnsId={dnsId}
      />
    </Stack>
  );
};
