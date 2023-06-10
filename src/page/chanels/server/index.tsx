import React from "react";
// import MainLayout from "share/molecules/main-layout";
import { useParams } from "react-router-dom";
// import styles from "./index.module.css";

const ServerChanel: React.FC = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      {/* <MainLayout 
        NextHeadEle={}
        NextContentEle={}
        MainHeadEle={}
        MainContentEle={}
      /> */}
      hihi
    </>
  );
};

export default ServerChanel;
