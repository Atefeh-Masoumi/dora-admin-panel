import React from "react";
import { ConvertToJalali } from "src/utils/convertToJalali";

const isISO8601 = (value: string) => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
};

export const withTableRowWrapper = (WrappedComponent: React.FC<any>) => {
  return function ProcessedComponent(props: any) {
    const { row } = props;
    const processedRow = { ...row };

    Object.keys(processedRow).forEach((key) => {
      const value = processedRow[key];
      if (typeof value === "string" && isISO8601(value)) {
        processedRow[key] = ConvertToJalali(value);
      }
    });
    return <WrappedComponent {...props} row={processedRow} />;
  };
};
