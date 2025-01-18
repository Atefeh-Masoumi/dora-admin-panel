import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { FC } from "react";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const IPDeleteDialog: FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Alert variant="filled" severity="warning">
          <AlertTitle>اخطار!</AlertTitle>
          <Typography fontSize={14}>{message}</Typography>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          انصراف
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};
