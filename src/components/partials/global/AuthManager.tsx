import {
  UserIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Box,
  Button as MuiButton,
} from "@mui/material";
import { useAtom } from "jotai";
import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router";


import useUserActions from "@/utils/state/actions/_useUserActions";
import { userAtom } from "@/utils/state/atoms";
import getInitials from "@/utils/text/getInitials";

export default function AuthManager() {
  const userActions = useUserActions();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleSignOut = () => {
    userActions.logout();
    handleClose();
  };

  return user ? (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 32, height: 32 }}>
          {getInitials(user.name ? user.name : "")}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiPaper-root": { minWidth: 256 } }}
      >
        <MenuItem onClick={() => handleMenuItemClick("/profile")}>
          <ListItemIcon>
            <UserIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/settings")}>
          <ListItemIcon>
            <Cog8ToothIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuItemClick("/privacy")}>
          <ListItemIcon>
            <ShieldCheckIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText>Privacy policy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/feedback")}>
          <ListItemIcon>
            <LightBulbIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText>Share feedback</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ArrowRightStartOnRectangleIcon width={20} height={20} />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, "@media (max-width: 1024px)": { display: "none" } }}>
      <MuiButton component="a" href="/auth/sign-up" variant="contained">
        Sign Up
      </MuiButton>
      <MuiButton component="a" href="/auth/sign-in" variant="outlined">
        Sign In
      </MuiButton>
    </Box>
  );
}
