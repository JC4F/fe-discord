import React from "react";
interface IParam<T> {
  defaultValue: T;
}
export const useRefManager = <T>({ defaultValue }: IParam<T>) => {
  const componentRef = React.useRef<T>(defaultValue);
  const setRef = React.useCallback(
    <P extends keyof T = keyof T>(name: P) =>
      (ref: T[P]) => {
        componentRef.current[name] = ref;
      },
    [],
  );
  const getRef = React.useCallback(<P extends keyof T = keyof T>(name: P) => {
    return componentRef.current[name];
  }, []);
  return { componentRef: componentRef.current, setRef, getRef };
};
