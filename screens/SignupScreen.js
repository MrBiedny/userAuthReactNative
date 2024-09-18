import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { AuthContext } from "../store/auth-context";

export default function SignupScreen() {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create a user. Please check your inputs or try again later."
      );
      setIsAuth(false);
    }
  }

  if (isAuth) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}
