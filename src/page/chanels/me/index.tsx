import React from "react";
import MainLayout from "share/molecules/main-layout";
import styles from "./index.module.css";
import SearchChanelDialog from "share/dialog/search-chanel";

interface IMeState {
  dialogOpen: boolean;
}

const initMeState: IMeState = {
  dialogOpen: false,
};

const Me: React.FC = () => {
  const [meState, setMeState] = React.useState<IMeState>(initMeState);

  const handleHeadDialogFind = React.useCallback((makeOpen: boolean) => {
    setMeState((pre) => ({
      ...pre,
      dialogOpen: makeOpen,
    }));
  }, []);

  return (
    <>
      <MainLayout
        NextHeadEle={
          <button
            onClick={() => handleHeadDialogFind(true)}
            className={styles.customButtonHeadd}
          >
            Tìm hoặc bắt đầu một cuộc trò chuyện
          </button>
        }
        NextContentEle={<div>next-content</div>}
        MainHeadEle={<div>main-head</div>}
        MainContentEle={<div>main-content</div>}
      />
      <SearchChanelDialog
        isOpen={meState.dialogOpen}
        handleCloseDialog={handleHeadDialogFind}
      />
    </>
  );
};

export default Me;
