import React from "react";

export const SocialAuthCallback: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => {
      window.opener.authenticateCallback();
      window.close();
    }, 1000);
  });

  return <div>Authenticated successfully! you are being redirected...</div>;
};
