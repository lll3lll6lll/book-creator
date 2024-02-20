import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  getRouteLogin,
  getRouteMyBooks,
  getRouteProfile,
} from "@/shared/const/routes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="subtitle1" component="span" sx={{ mx: 1 }}>
            CreateNovel
          </Typography>

          <Box sx={{ width: "100%", alignContent: "flex-start" }}>
            <Link
              color={"inherit"}
              component={RouterLink}
              to={getRouteMyBooks()}
            >
              Мои книги
            </Link>
          </Box>

          <Link
            color={"inherit"}
            component={RouterLink}
            to={getRouteLogin()}
            sx={{ mx: 1 }}
          >
            Войти
          </Link>

          <Link color={"inherit"} component={RouterLink} to={getRouteProfile()}>
            <IconButton aria-label="profile" color={"inherit"}>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
