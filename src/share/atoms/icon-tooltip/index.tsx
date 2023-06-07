import React from "react";
import { styled } from "@mui/material/styles";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import styles from "./index.module.css";

interface IIcoToolTipProps {
  Icon: JSX.Element;
  title: string;
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

const IconToolTip: React.FC<IIcoToolTipProps> = ({ Icon, title }) => {
  return (
    <>
      <BootstrapTooltip title={title} placement="top">
        <div className={styles.iconWrapper}>{Icon}</div>
      </BootstrapTooltip>
    </>
  );
};

export default IconToolTip;
