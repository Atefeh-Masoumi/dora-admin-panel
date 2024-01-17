import { FC, useMemo } from "react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { useGetApiMyCloudProductBundleVmListQuery } from "src/app/services/api.generated";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setNodeTypeAction } from "src/app/slice/createNodeSlice";
import { kubernetesNodeType } from "src/constant/kubernetesNodeType";
import { KuberNodeConfigTableRow } from "./table/KuberNodeConfigTableRow";

type NodeConfigPropsType = {};

export const NodeConfig: FC<NodeConfigPropsType> = () => {
  const dispatch = useAppDispatch();

  const nodeType = useAppSelector((store) => store.createNode.nodeType);

  const nodeTypeButtonOnClick = (nodeTypeId: number) => {
    dispatch(setNodeTypeAction(nodeTypeId));
  };

  const { data: configsList, isLoading } =
    useGetApiMyCloudProductBundleVmListQuery();

  const table = useMemo(
    () => (
      <BaseTable
        struct={productBundleTableStruct}
        RowComponent={KuberNodeConfigTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [configsList, isLoading]
  );

  return (
    <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, overflow: "hidden" }}>
      <Stack rowGap={2} alignItems="center">
        <Typography>کانفیگ نود خود را انتخاب کنید</Typography>
        <Stack direction="row" columnGap={2}>
          {[...Array(2)].map((_, index) => (
            <Button
              key={index}
              variant={nodeType === index ? "contained" : "outlined"}
              onClick={() => nodeTypeButtonOnClick(index)}
            >
              {kubernetesNodeType(index).label}
            </Button>
          ))}
        </Stack>
        <Divider flexItem />
        <Box sx={{ overflow: "overlay", width: "100%" }}>{table}</Box>
      </Stack>
    </Paper>
  );
};
