import { Button } from "@material-ui/core";
import React from "react";

type Props = {
  title: string;
  handleOnClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  color?: "inherit" | "primary" | "secondary" | "default";
};

export default ({ title, handleOnClick, type, disabled, color }: Props) => {
  return (
    <Button
      type={type || "button"}
      style={{
        height: 40,
      }}
      variant="contained"
      size="small"
      onClick={handleOnClick}
      disabled={disabled}
      color={color || "primary"}
    >
      {title}
    </Button>
  );
};
