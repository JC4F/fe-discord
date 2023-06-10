import React, { useState } from "react";
import {
  Tooltip,
  ClickAwayListener,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./index.module.css";
import ToolTipWrapper from "../tooltip-wrapper";

interface ICustomDialogProps {
  dialogContent: JSX.Element;
  tooltipContent: JSX.Element;
  tooltipProps: Partial<TooltipProps>;
  nestTitle?: string;
  nestPlacement?: TooltipProps["placement"];
}

const DialogTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--modal-background)",
    boxShadow:
      "rgba(30, 31, 34, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 10px 0px",
    maxWidth: "fit-content",
  },
}));

const CustomTooltipDialog: React.FC<ICustomDialogProps> = ({
  dialogContent,
  tooltipContent,
  tooltipProps,
  nestTitle,
  nestPlacement,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div className={styles.tooltipWrapper}>
        <DialogTooltip
          disableFocusListener
          disableHoverListener
          disableTouchListener
          onClose={handleTooltipClose}
          open={tooltipOpen}
          {...tooltipProps}
          title={dialogContent}
        >
          <div onClick={handleTooltipOpen}>
            <ToolTipWrapper
              title={nestTitle ?? ""}
              placement={nestPlacement}
              content={tooltipContent}
            />
          </div>
        </DialogTooltip>
      </div>
    </ClickAwayListener>
  );
};

export default CustomTooltipDialog;
