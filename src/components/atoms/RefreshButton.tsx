import { IconButton, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

type RefreshButtonPropsType = {
  refetchData: () => void;
  isFetching: boolean;
};

export const RefreshButton: FC<RefreshButtonPropsType> = ({
  refetchData,
  isFetching,
}) => {
  const [rotation, setRotation] = useState(0);

  const handleButtonClick = () => {
    refetchData();
    setRotation(rotation + 360);
  };

  return (
    <div>
      <Tooltip title="به روزرسانی" placement="top">
        <span>
          <IconButton disabled={isFetching} onClick={handleButtonClick}>
            <RefreshIcon
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.7s ease",
              }}
            />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};
