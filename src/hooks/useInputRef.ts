import { useRef } from "react";

export const useInputRef = () => {
  const ref = useRef<HTMLInputElement>(null);

  const focus = () => {
    ref.current?.focus();
  };

  return { ref, focus };
};
