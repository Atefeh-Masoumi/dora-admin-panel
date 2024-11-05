import { FC, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { useGetApiMyPortalProductBundleVmListQuery } from "src/app/services/api.generated";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  setNodeTypeAction,
  setVmPasswordAction,
} from "src/app/slice/createNodeSlice";
import { kubernetesNodeType } from "src/constant/kubernetesNodeType";
import KuberNodeConfigTableRow from "./table/KuberNodeConfigTableRow";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type NodeConfigPropsType = {};

export const NodeConfig: FC<NodeConfigPropsType> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const nodeType = useAppSelector((store) => store.createNode.nodeType);
  const vmPassword = useAppSelector((store) => store.createNode.vmPassword);

  const nodeTypeButtonOnClick = (nodeTypeId: number) => {
    dispatch(setNodeTypeAction(nodeTypeId));
  };

  const { data: configsList, isLoading } =
    useGetApiMyPortalProductBundleVmListQuery();

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

  const inputOnChange = (event: any) => {
    dispatch(setVmPasswordAction(event.target.value));
  };

  return (
    <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, overflow: "hidden" }}>
      <Stack rowGap={4} alignItems="center">
        <Typography>کانفیگ نود خود را انتخاب کنید</Typography>
        <Stack direction="row" columnGap={2}>
          {[...Array(2)].map((_, index) => {
            const realIdx = index + 1;  
            return (
              <Button
                key={realIdx}
                variant={nodeType === realIdx ? "contained" : "outlined"}
                onClick={() => nodeTypeButtonOnClick(realIdx)}
              >
                {kubernetesNodeType(realIdx).label}
              </Button>
            );
          })}
        </Stack>
        <Divider flexItem />
        <Box sx={{ overflow: "overlay", width: "100%" }}>{table}</Box>
        <Divider flexItem />
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ px: 2 }}
          >
            <ExclamationMarkCircleSvg
              sx={{
                transform: "rotate(180deg)",
                "&>path:first-of-type": {
                  opacity: 1,
                  stroke: ({ palette }) => palette.grey[700],
                  strokeWidth: 1,
                  fill: "transparent",
                },
              }}
            />
            <Typography
              align="center"
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              نام کاربری برای سیستم عامل ویندوز Administrator و برای لینوکس root
              می باشد
            </Typography>
          </Stack>
          <DorsaTextField
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={vmPassword}
            onChange={inputOnChange}
            sx={{ minWidth: 300 }}
            label="رمز عبور ماشین مجازی نود کلاستر (Password)"
            inputProps={{ dir: "ltr" }}
          />
          <Stack justifyContent="center" spacing={1}>
            <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
              رمز عبور می‌بایست:
            </Typography>
            <Typography
              fontSize={14}
              sx={{ color: ({ palette }) => palette.grey[700], opacity: 0.9 }}
            >
              حداقل ۸ کاراکتر باشد
              <br />
              ترکیبی از حروف کوچک و بزرگ باشد
              <br />
              شامل اعداد باشد
              <br />
              شامل کاراکترهای خاص (نمادها) باشد
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
