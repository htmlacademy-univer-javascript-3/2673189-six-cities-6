import {Navigate} from 'react-router-dom';
import { AuthStatus as AuthStatus, APIRoute } from '@consts/consts';

type PrivateRouteProps = {
  authorizationStatus: AuthStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthStatus.AUTH
      ? children
      : <Navigate to={APIRoute.Login} />
  );
}
