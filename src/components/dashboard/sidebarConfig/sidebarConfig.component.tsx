// component
import IconSetting from './IconSetting';

// ----------------------------------------------------------------------

const getIcon = (name: any) => <IconSetting icon={name} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/Dashboard/App',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Users',
    path: '/Dashboard/User',
    icon: getIcon('eva:people-fill')
  },
];

export default sidebarConfig;
