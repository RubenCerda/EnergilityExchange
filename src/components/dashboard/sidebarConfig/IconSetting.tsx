import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

IconSetting.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object
};

export default function IconSetting(icon: any, sx: any, ...other: any) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
