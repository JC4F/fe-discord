import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import styles from "./index.module.css";

interface ISearchServerChanelDialogProps {
  isOpen: boolean;
  handleCloseDialog: (makeOpen: boolean) => void;
}

const SearchServerChanelDialog: React.FC<ISearchServerChanelDialogProps> = ({
  isOpen,
  handleCloseDialog,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleCloseDialog(false)}
      maxWidth="md"
    >
      <DialogContent
        sx={{
          width: "570px",
          borderRadius: "8px",
          padding: "20px 20px 0",
          display: "flex",
          flexDirection: "column",
          color: "var(--text-normal)",
          backgroundColor: "var(--background-secondary)",
        }}
      >
        <input
          className={styles.customInputDialog}
          type="text"
          placeholder="Bạn muốn đi đâu?"
        />
        {/* <div className={styles.haveResult}></div> */}
        <div className={styles.notFoundResult}>
          <div className={styles.notFoundText}>
            Không thể tìm thấy những thứ bạn quan tâm?
          </div>
        </div>
        <div className={styles.tip}>Tìm kiếm với @ # để lọc bớt kết quả.</div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchServerChanelDialog;
