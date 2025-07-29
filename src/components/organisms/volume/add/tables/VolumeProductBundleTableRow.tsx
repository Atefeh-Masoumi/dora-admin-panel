import { Checkbox, IconButton, Stack } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { ProductBundleBlockStorageListResponse } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import CircleTickSvg from "src/components/atoms/svg-icons/CircleTickSvg";
import { AddVolumeContext } from "../contexts/AddVolumeContext";

const VolumeProductBundleTableRow: FC<{ row: ProductBundleBlockStorageListResponse }> = ({ row }) => {
  const { predefinedConfig, setPredefinedConfig } = useContext(AddVolumeContext);

  const isChecked = useMemo(
    () => predefinedConfig?.id === row.id,
    [row, predefinedConfig?.id]
  );
  const onCheckboxClick = () => {
    if (predefinedConfig?.id === row.id) {
      setPredefinedConfig(null);
      return;
    }
    setPredefinedConfig(row);
  };

  return (
    <DorsaTableRow
      hover
      tabIndex={-1}
      key={row.id}
      
    >
      <DorsaTableCell padding="checkbox" onClick={onCheckboxClick}>
        <Checkbox
          sx={{ borderRadius: "6px" }}
          color="primary"
          checked={isChecked}
          onChange={onCheckboxClick}
        />
      </DorsaTableCell>
      <DorsaTableCell align="center" sx={{ px: 1, whiteSpace: "nowrap" }}>
        {row.name}
      </DorsaTableCell>
      <DorsaTableCell align="center" sx={{ px: 1, whiteSpace: "nowrap" }}>
        {row.vDisk} GB
      </DorsaTableCell>
      <DorsaTableCell align="center" sx={{ px: 1, whiteSpace: "nowrap" }}>
        {Math.floor(row.price || 0).toLocaleString("fa-IR")} تومان
      </DorsaTableCell>
      
    </DorsaTableRow>
  );
};

export default VolumeProductBundleTableRow; 