import React from "react";
interface IParam<T> {
  defaultValue: T;
}
export const useRefManager = <T,>({ defaultValue }: IParam<T>) => {
  const componentRef = React.useRef<T>(defaultValue);
  const setRef = (name: keyof T) => (ref: any) => {
    componentRef.current[name] = ref;
  };
  const getRef = <P extends keyof T = keyof T>(name: P) => {
    return componentRef.current[name];
  };
  return { componentRef: componentRef.current, setRef, getRef };
};
