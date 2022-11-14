import React from "react";
import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { SxProps, Theme, ListItemButton } from "@mui/material";

type ListItemNavLinkProps = {
  to: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => any;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  disabled?: boolean;
};

const CustomListItemButton = React.forwardRef<
  HTMLAnchorElement,
  ListItemNavLinkProps
>((props, ref) => {
  const { children, to, sx, onClick, onMouseEnter, onMouseLeave, disabled } =
    props;

  const MyLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
        (props, ref) => {
          return <Link {...props} ref={ref} to={to} />;
        }
      ),
    [to]
  );

  return (
    <ListItemButton
      component={MyLink}
      ref={ref}
      sx={sx}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {children}
    </ListItemButton>
  );
});

export default CustomListItemButton;
