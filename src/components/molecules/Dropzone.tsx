import { forwardRef, useEffect } from "react";
import { useCallback } from "react";
import { Stack, Typography } from "@mui/material";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { DocCloud } from "src/components/atoms/svg-icons/DocCloudSvg";

// Supported Size as !MB
const supportedSize = 80;

const dropzoneOptions = {
  maxSize: supportedSize * (1024 * 1024),
  accept: { "application/pdf": ["image/* , .pdf"] },
  multiple: false,
};

type DropzonePropsType = {
  setFile: (file: File) => void;
  file?: File;
  uploading: boolean;
  percent: number;
};

export default forwardRef<HTMLInputElement, DropzonePropsType>(
  ({ setFile, file, uploading, percent }, ref) => {
    const { t } = useTranslation();

    const largeFileErrorMessage = useCallback(
      (fileName: string) =>
        t("dropzone.large", { fileName, maximumFileSize: supportedSize }),
      [t]
    );

    const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        fileRejections.map(({ file, errors }) =>
          errors.forEach(({ code }) => {
            if (code === ErrorCode.FileTooLarge) {
              toast.error(largeFileErrorMessage(file.name));
            }
          })
        );
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();

          if (file) setFile(file);

          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {};
          reader.readAsArrayBuffer(file);
        });
      },
      [largeFileErrorMessage, setFile]
    );

    const { getRootProps, getInputProps, inputRef } = useDropzone({
      onDrop,
      useFsAccessApi: false,
      ...dropzoneOptions,
    });

    useEffect(() => {
      if (!inputRef.current) return;
      if (typeof ref === "function") ref(inputRef.current);
      else if (ref) ref.current = inputRef.current;
    }, [inputRef, ref]);

    return (
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        py={!file ? 4 : 2}
        bgcolor="rgba(60, 138, 255, 0.08)"
        borderRadius={1}
        sx={{
          border: ({ palette }) =>
            `1px ${!file ? "dashed" : "solid"}${palette.primary.main}`,
          color: "primary.main",
          cursor: "pointer",
        }}
        component="div"
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />

        {!file ? (
          <Stack alignItems="center" spacing={2}>
            <DocCloud
              sx={{ width: "55px", height: "55px", color: "primary.main" }}
            />
            <Stack alignItems="center" spacing={0.7} width="100%">
              <Typography variant="text8">
                فرمت های مجاز jpg, png, jpeg, pdf
              </Typography>
              <Typography variant="text8">
                حداکثر حجم فایل: ۲۵ مگابایت
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>{file.name}</Typography>
            <DocCloud
              sx={{ width: "40px", height: "40px", color: "primary.main" }}
            />
          </Stack>
        )}
      </Stack>
    );
  }
);
