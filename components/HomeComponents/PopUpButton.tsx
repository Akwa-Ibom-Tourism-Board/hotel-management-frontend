/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface PopUpButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  hoverEffect?: boolean;
  width?: string;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  type?: any;
  disabledColor?: string;
  fontFamily?: string;
  border?: string;
  isShadowShow?: boolean;
  onClick?: (e: unknown) => void;
  background?: string;
}

const PopUpButton: React.FC<PopUpButtonProps> = ({
  title,
  borderRadius = "10px",
  children,
  height = "58px",
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  width = "100%",
  disabled,
  //   border="2px solid #ede6de",
  type,
  isShadowShow,
  color = "white",
  // fontFamily = "Lexend",
  // disabledColor = "#E0E1E6",
  onClick,
}) => {
  return (
    <button
      className={`border-2 border-[#ede6de] ${
        !disabled
          ? "hover:cursor-pointer hover:bg-[#e77818]/40 hover:border-[#e77818]"
          : ""
      } ${isShadowShow && "shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"}
      ${
        !disabled && isShadowShow
          ? `hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] hover:bg-[#e77818]`
          : ""
      }
  ${!disabled ? "hover:translate-y-0.5" : ""}
  ${!disabled ? "active:shadow-none" : ""}
  ${!disabled ? "active:translate-y-1" : ""}
  transition-all font-[700]`}
      onClick={onClick}
      style={{
        borderRadius,
        height,
        // border,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        width,
        color,
        // fontFamily,
        // backgroundColor: !disabled ? backgroundColor : disabledColor,
        // background: !disabled ? background : disabledColor,
      }}
      disabled={disabled}
      type={type}
    >
      {children || title}
    </button>
  );
};

export default PopUpButton;
