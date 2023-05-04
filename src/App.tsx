import React from "react";
import AppRoutes from "routes";
import "./App.css";
import { useAppDispatch } from "store/hooks";
import { authenAsync } from "store/authen";

// declare authenticateCallback function globally
declare global {
  interface Window {
    authenticateCallback: () => void;
  }
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // add listener for login or logout from other tabs
    // window.addEventListener(
    //   "storage",
    //   async (event: WindowEventMap["storage"]) => {
    //     if (event.key === AuthEvents.LOGOUT && isAuthenticated()) {
    //       await clearToken(false);
    //       setUser(null);
    //     } else if (event.key === AuthEvents.LOGIN) {
    //       refreshToken();
    //     }
    //   },
    // );

    // add listener for cross-window communication (SSO popup)
    window.authenticateCallback = async function () {
      await dispatch(authenAsync({ type: "SSO_GOOGLE", submitData: {} }));
    };
  }, []);

  return <AppRoutes />;
};

export default App;
