import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddToQueueOutlinedIcon from '@material-ui/icons/AddToQueueOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../UserContext';

const drawerWidth = 240;

interface AppLayoutProps extends RouteComponentProps {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    headerTitle: {
      fontFamily: 'Trade Winds',
    },
    headerTitleText: {
      color: '#fff',
      textDecoration: 'none',
    },
  })
);

function AppLayout(props: AppLayoutProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function setRedirect(path: string, state?: object) {
    props.history.push(path);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {!user ? (
        <React.Fragment>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Login
              </ListSubheader>
            }
          >
            <ListItem button onClick={() => setRedirect('/login')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Přihlášení'} />
            </ListItem>
            <ListItem button onClick={() => setRedirect('/register')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Registrace'} />
            </ListItem>
          </List>
          <Divider />
        </React.Fragment>
      ) : (
        <List>
          <ListItem button onClick={() => setRedirect('/new-invoice')}>
            <ListItemIcon>
              <AddToQueueOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Nová faktura'} />
          </ListItem>

          <ListItem button onClick={() => setRedirect('/invoice')}>
            <ListItemIcon>
              <FeaturedPlayListOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Přehled faktury'} />
          </ListItem>

          <ListItem button onClick={() => setRedirect('/new-suppliers')}>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Nový subjekt" />
          </ListItem>

          {/* <ListItem button onClick={() => setRedirect('/hardware-type')}>
            <ListItemIcon>
              <AddToQueueOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Typy HW'} />
          </ListItem> */}
        </List>
      )}
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            className={classes.headerTitle}
            align="center"
          >
            <a href="/" className={classes.headerTitleText}>
              ~ EvHard ~
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="content">{props.children}</div>
      </main>
    </div>
  );
}
export default withRouter(AppLayout);
