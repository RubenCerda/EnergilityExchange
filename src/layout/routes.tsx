import { useRoutes } from 'react-router-dom';
import CheckDetailComponent from '../components/chekView/CheckDetail.component';
import DashboardLayout from '../components/dashboard/Home.component';
import LoginComponent from '../components/login/Login.component';
import PassUpdateComponent from '../components/login/PassUpdate.component';
import RecoverPassComponent from '../components/login/RecoverPass.component';
import RegisterComponent from '../components/login/Register.component';
import CheckViewComponent from '../components/CheckView.component';
import DashboardComponent from '../components/Dashboard.component';
import UserComponent from '../components/users/Users.component';
import ProtectedRoutes from '../components/login/ProtectedRoutes.component';
import CheckPropertyComponent from '../components/chekView/CheckProperty.component';

// ----------------------------------------------------------------------

export default function RoutesApp() {
  return useRoutes([
    {
      path: '/',
      element: <LoginComponent />
    },
    {
      path: '/RecoverPassword',
      element: <RecoverPassComponent />
    },
    {
      path: '/NewPassword',
      element: <PassUpdateComponent />
    },
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '',
          element: <DashboardLayout />,
          children: [
            { path: '/Dashboard', element: <DashboardComponent /> },
            { path: '/User', element: <UserComponent /> },
            { path: '/CheckView/:id/:docTypeId/:companyName', element: <CheckViewComponent /> },
            { path: '/CheckDetails/:id/:docTypeId/:companyName/:docSystemNo', element: <CheckDetailComponent /> },
            
          ]
        }
        
      ]
    },
    
  ]);
}
