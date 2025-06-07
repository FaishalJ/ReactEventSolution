import { MenuItem } from "@mui/material";
import { NavLink } from "react-router";

interface Props {
  children: React.ReactNode;
  to: string;
}

export default function MenuItemLink({ children, to }: Props) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{
        fontSize: "1.2rem",
        textTransform: "uppercase",
        fontWeight: "bold",
        "&.active": {
          color: "yellow",
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
