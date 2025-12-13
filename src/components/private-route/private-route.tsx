import {Navigate} from 'react-router-dom';
import { AppRoute, AuthStatus } from '@consts/consts';

type PrivateRouteProps = {
  authorizationStatus: AuthStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthStatus.AUTH
      ? children
      : <Navigate to={AppRoute.LOGIN} />
  );
}
