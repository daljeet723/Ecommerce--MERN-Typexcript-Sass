import { ReactElement } from "react";
import {  useOutlet, useNavigate } from 'react-router-dom';


interface Props {
  children?: React.ReactNode;
  isAuthenticated: boolean; //check if user logged in or not, Optional
  adminRoute?: boolean; //is admin route allowed like Dashboard, Optional
  isAdmin?: boolean;
  redirect?: string; // if uder logged in, redirect to link
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/",
}: Props) => {
  const navigate= useNavigate();
  const Outlet = useOutlet();
  if (!isAuthenticated) {
     navigate(redirect);
     return null
  }

  return children ? children : Outlet;
  
  //is componenet recieved example login
};

export default ProtectedRoute;
