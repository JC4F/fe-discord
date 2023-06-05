import React from "react";
import MainLayout from "share/molecules/main-layout";

const Me: React.FC = () => {
  console.log(2);
  return (
    <>
      <MainLayout
        NextHeadEle={<div>next-head</div>}
        NextContentEle={<div>next-content</div>}
        MainHeadEle={<div>main-head</div>}
        MainContentEle={<div>main-content</div>}
      />
    </>
  );
};

export default Me;
