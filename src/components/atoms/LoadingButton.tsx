import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  startIcon: {
    margin: 0,
  },
});

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  disabled,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      classes={{ startIcon: classes.startIcon }}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : props.startIcon}
    >
      {loading ? null : children}
    </Button>
  );
};

export default LoadingButton;
