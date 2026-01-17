import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

const components = {


  // Footer() {
  //   const { tokens } = useTheme();

  //   return (
  //     <View textAlign="center" padding={tokens.space.large}>
  //       <Text color={tokens.colors.neutral[80]}>
  //         &copy; All Rights Reserved
  //       </Text>
  //     </View>
  //   );
  // },

  // SignIn: {
  //   Header() {
  //     const { tokens } = useTheme();

  //     return (
  //       <Heading
  //         padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
  //         level={3}
  //       >
  //         Sign in to your account
  //       </Heading>
  //     );
  //   },
  //   Footer() {
  //     const { toForgotPassword } = useAuthenticator();

  //     return (
  //       <View textAlign="center">
  //         <Button
  //           fontWeight="normal"
  //           onClick={toForgotPassword}
  //           size="small"
  //           variation="link"
  //         >
  //           Reset Password
  //         </Button>
  //       </View>
  //     );
  //   },
  // },

  SignUp: {
    Header() {

      return (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <h3>Create a new account</h3>
        </div>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              fontWeight: 'normal',
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={toSignIn}
          >
            Back to Sign In
          </button>
        </div>
      );
    },
  },
  
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    'nickname': {
      label: 'Channel Name:',
      order: 3,
      placeholder: 'Enter your Channel Name:',
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  setupEmail: {
    email: {
      label: 'New Label',
      placeholder: 'Please enter your Email:',
    },
  },
};


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === 'configuring') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (authStatus !== 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Authenticator formFields={formFields} components={components}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>

      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
