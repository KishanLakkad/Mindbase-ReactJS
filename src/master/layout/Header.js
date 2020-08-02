import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../app/styles.css";
import * as authUtil from "../utils/auth.util";
const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }
});

class Header extends Component {
  constructor() {
    super();
    this.state = {
      open : true,
    };
  }
  handleDrawer = (open) => {
    console.log('handleDrawer',open)
    // this.setState({ open });
  }
  
  render() {
    const { classes, theme } = this.props;
    return (<>
      <AppBar
        position="fixed"
        color="inherit"
        background-color="#fff"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => this.setState({open : true})}
            edge="start"
            className={clsx(classes.menuButton, this.state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <div className="display">
            <div className="">
              <img
                className="image-responsive"
                src="/assets/img/logo.png"
                alt=""
              />
            </div>
            <div className="none">
              <img
                className="image-responsive"
                src="/assets/img/Image1.png"
                alt=""
              />
            </div>
            <div>
              <ul className=" ">
                <li className="avater">
                  <a className="" href="#">
                    <img
                      src="/assets/img/Avater.png"
                      className="image-responsive"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => this.setState({open : false})}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                  <ChevronRightIcon />
                )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="dashboard">
              <ListItemIcon>
                <FontAwesomeIcon icon={faDesktop} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button key="massage">
              <ListItemIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </ListItemIcon>
              <ListItemText primary="Massage" />
            </ListItem>
            <ListItem button key="logout" onClick={this.logout}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
        </Drawer></>
    );
  }
}
export default withStyles(useStyles , { withTheme: true })(Header);