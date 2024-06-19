import { Button, Grid, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState, type FC } from "react";
import { useGetApiMyPortalOfferListQuery } from "src/app/services/api.generated";
import { Cart } from "src/components/atoms/svg-icons/CartSvg";
import { PurchaseOrderOfferDialog } from "src/components/organisms/portal/orderOffer/dialog/PurchaseOrderOfferDialog";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";
import { e2p } from "src/utils/e2p.utils";

type OfferDetailType = {
  name: string;
  offerId: number | null;
};

const Sales: FC = () => {
  const [offerDetail, setOfferDetail] = useState<OfferDetailType>({
    name: "",
    offerId: null,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const { data: offerList, isLoading } = useGetApiMyPortalOfferListQuery();

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent="center"
    >
      {offerList?.map((offer) => {
        return (
          <Grid item xs={10} md={3} key={offer.id}>
            <Stack
              direction="column"
              py={5}
              spacing={2.5}
              justifyContent="center"
              alignItems="center"
              bgcolor="rgba(60, 138, 255, 1)"
              color="white"
              borderRadius={BORDER_RADIUS_1}
              px={3}
              minWidth="fit-content"
            >
              <Typography fontSize="1.5rem" textAlign={"center"}>
                {offer?.name}
              </Typography>
              <Stack
                direction="column"
                spacing={1}
                sx={{ textAlign: "center" }}
              >
                <Typography>
                  قابل پرداخت:{" "}
                  <Typography display="inline" fontWeight={600}>
                    {e2p(offer?.amount.toLocaleString())} ریال
                  </Typography>
                </Typography>
                <Typography>
                  هدیه: {e2p(offer?.freeAmount.toLocaleString())} ریال
                </Typography>
                <Typography sx={{ pt: 1 }}>
                  اعتبار:{" "}
                  {e2p((offer?.amount + offer?.freeAmount).toLocaleString())}
                  ریال
                </Typography>
              </Stack>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<Cart />}
                sx={{
                  color: "white",
                  border: "1px solid white",
                  py: 1,
                  "&:hover": { borderColor: "white" },
                }}
                onClick={() => {
                  setOpenDialog(true);
                  setOfferDetail({
                    name: String(offer?.name),
                    offerId: Number(offer?.id),
                  });
                }}
              >
                <Typography>ثبت سفارش</Typography>
              </Button>
            </Stack>
          </Grid>
        );
      })}
      <PurchaseOrderOfferDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        name={offerDetail.name}
        offerId={offerDetail.offerId}
      />
    </Grid>
  );
};

export default Sales;
