import React from "react";
import { http } from "utils";

const MainScreen: React.FC = () => {
  const handleClickBtn = async () => {
    const rs = await http.get("authen/profile");
    console.log(rs);
  };
  return (
    <>
      MainScreen
      <button onClick={handleClickBtn}>get profile</button>
    </>
  );
};

export default MainScreen;
