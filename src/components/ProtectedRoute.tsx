import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === 'configuring') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (authStatus !== 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Authenticator />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
