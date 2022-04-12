import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack,
  List, Collapse, ListItemText, ListItemIcon, ListItemButton 
} from '@mui/material';
import Cookies from 'universal-cookie';
// hooks
import useResponsive from '../../../hooks/useResponsive';

const account = {
    photoURL: '/static/User.jpg'
  };

  const RootStyleScrollbar = styled('div')({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
  });

  const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
      '&:before': {
        backgroundColor: alpha(theme.palette.grey[600], 0.48)
      },
      '&.simplebar-visible:before': {
        opacity: 1
      }
    },
    '& .simplebar-track.simplebar-vertical': {
      width: 10
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
      height: 6
    },
    '& .simplebar-mask': {
      zIndex: 'inherit'
    }
  }));

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500]
}));


DashboardSidebarComponent.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebarComponent(isOpenSidebar: any, onCloseSidebar: any) {
  const { pathname } = useLocation();
  const cookies = new Cookies();
  const isDesktop = useResponsive('up', 'lg', 0, 0);

  const renderContent = (
    <RootStyleScrollbar>
      <SimpleBarStyle timeout={500} clickOnTrack={false}>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {cookies.get('firstName')} {cookies.get('lastName')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {cookies.get('email')}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <List disablePadding>
        <Link underline="none" component={RouterLink} to="/Dashboard">
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      </SimpleBarStyle>
    </RootStyleScrollbar>
  );

  return (
    <RootStyle>
      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
