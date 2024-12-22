import { FC, useState } from "react";
import { useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { useGetApiMyKubernetesCloudFirewallListByNamespaceIdQuery } from "src/app/services/api.generated";
import { CreateFirewallDialog } from "src/components/organisms/kubernetesCloud/dialog/CreateFirewallDialog";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { KubernetesCloudConfigMapTableRow } from "../../tables/KubernetesCloudConfigMapTableRow";
import { kubernetesCloudConfigMapTableStruct } from "../../tables/struct";

export const KubernetesCloudFirewall: FC = () => {
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<"DELETE" | "CREATE" | null>(
    null
  );

  const closeDialogs = () => {
    setDialogType(null);
  };

  const { kubernetesCloudId } = useParams();

  const { data = [], isLoading } =
    useGetApiMyKubernetesCloudFirewallListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudId) || 0,
      },
      { skip: !kubernetesCloudId }
    );

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.sourceIp) {
        result = item.sourceIp.toLowerCase().includes(search.toLowerCase());
      }
      return result;
    }) || [];

  return (
    <Stack
      bgcolor="white"
      py={2}
      px={3}
      borderRadius={BORDER_RADIUS_1}
      width="100%"
      direction="row"
      justifyContent="center"
    >
      <Stack width="100%">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "start", md: "center" }}
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography fontSize={18} color="secondary" whiteSpace="nowrap">
                  لیست Firewall
                </Typography>
                <Stack display={{ xs: "none", md: "flex" }}>
                  <SearchBox
                    placeholder="جستجو "
                    onChange={(text) => setSearch(text)}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack display={{ xs: "flex", md: "none" }} width="100%">
              <SearchBox
                placeholder="جستجو "
                onChange={(text) => setSearch(text)}
                fullWidth
              />
            </Stack>
          </Stack>
          <Stack display={{ xs: "none", md: "flex" }}>
            <Stack width="auto" direction="row">
              <Button
                variant="outlined"
                onClick={() => setDialogType("CREATE")}
                size="large"
                sx={{ whiteSpace: "nowrap", px: { xs: 0.2, md: 1.2 } }}
                startIcon={
                  <Add sx={{ "& path": { stroke: "#00a651" } }} />
                }
              >
                افزودن رول
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5}>
          <BaseTable
            struct={kubernetesCloudConfigMapTableStruct}
            RowComponent={KubernetesCloudConfigMapTableRow}
            rows={filteredList || []}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      <CreateFirewallDialog
        maxWidth="md"
        fullWidth
        open={dialogType === "CREATE"}
        onClose={closeDialogs}
        forceClose={() => setDialogType(null)}
      />
    </Stack>
  );
};
