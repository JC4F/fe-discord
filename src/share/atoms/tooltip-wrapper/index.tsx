import React from "react";
import { styled } from "@mui/material/styles";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import styles from "./index.module.css";

interface IToolTipWrapperProps {
  content: JSX.Element;
  title: string;
  placement?: TooltipProps["placement"];
  isIcon?: boolean;
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "14px",
    padding: "8px 12px",
  },
}));

const ToolTipWrapper: React.FC<IToolTipWrapperProps> = ({
  content,
  title,
  placement = "top",
  isIcon = true,
}) => {
  return (
    <>
      <BootstrapTooltip title={title} placement={placement}>
        {isIcon ? (
          <div className={styles.iconWrapper}>{content}</div>
        ) : (
          <div>{content}</div>
        )}
      </BootstrapTooltip>
    </>
  );
};

export default ToolTipWrapper;
