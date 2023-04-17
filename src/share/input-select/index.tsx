import React from "react";
import { ReactComponent as ArrowDown } from "assest/svg/arrow-down.svg";
import styles from "./index.module.css";
import { useRefManager } from "hooks";

export interface ISelected {
  representedValue: string;
  realValue: string;
}

interface IProps {
  selectData: ISelected[];
  placeholder: string;
  selected?: ISelected;
  setSelected?: React.Dispatch<React.SetStateAction<ISelected>>;
}

interface IInputSelectState {
  isSelectOpen: boolean;
  isShowFull: boolean;
  inputValue: string;
  hoverValue: string;
}

interface IInputSelectRef {
  selectWrapperRef: HTMLDivElement | null;
  inputWrapperRef: HTMLDivElement | null;
  lastCorrectSelectRef: string;
}

interface ICalculateHoverValue {
  curSelectData: ISelected[];
  curHoverValue: string;
  move: number;
}

const InputSelect = React.forwardRef<HTMLInputElement | null, IProps>(
  ({ selectData, placeholder, selected, setSelected }, ref) => {
    const [inputSelectState, setInputSelectState] =
      React.useState<IInputSelectState>({
        isSelectOpen: false,
        isShowFull: false,
        inputValue: selected?.representedValue ?? "",
        hoverValue: selectData[0].representedValue ?? "",
      });

    const { getRef, setRef } = useRefManager<IInputSelectRef>({
      defaultValue: {
        selectWrapperRef: null,
        inputWrapperRef: null,
        lastCorrectSelectRef: selected?.representedValue ?? "",
      },
    });

    React.useEffect(() => {
      if (inputSelectState.isSelectOpen) {
        getRef("inputWrapperRef")?.querySelector("input")?.focus();
      } else getRef("inputWrapperRef")?.querySelector("input")?.blur();
    }, [inputSelectState.isSelectOpen, getRef]);

    const curSelectData: ISelected[] = React.useMemo(() => {
      if (inputSelectState.isShowFull) return selectData;
      return selectData.filter((cur) =>
        cur.representedValue
          .toUpperCase()
          .includes(inputSelectState.inputValue.toUpperCase()),
      );
    }, [inputSelectState.isShowFull, inputSelectState.inputValue, selectData]);

    React.useEffect(() => {
      if (
        getRef("selectWrapperRef") !== null &&
        inputSelectState.isShowFull &&
        curSelectData.length !== 0
      ) {
        const scrollInToViewItem = getRef("selectWrapperRef")?.querySelector(
          '[data-select="selected"]',
        );
        if (scrollInToViewItem)
          // block end lai gap bug khong scroll duoc ?
          scrollInToViewItem.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: "auto",
          });
      }
    }, [
      inputSelectState.isShowFull,
      inputSelectState.hoverValue,
      getRef,
      curSelectData,
    ]);

    React.useEffect(() => {
      if (!inputSelectState.isSelectOpen) {
        setInputSelectState((pre) => {
          return {
            ...pre,
            hoverValue: curSelectData[0]?.representedValue ?? "",
          };
        });
      }
    }, [inputSelectState.isSelectOpen, curSelectData]);

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // save last correct ref for blur?, find exact
      const curSelectTmp: ISelected | undefined = selectData.find(
        (cur) =>
          cur.representedValue.toUpperCase() === e.target.value.toUpperCase(),
      );
      if (curSelectTmp) {
        setRef("lastCorrectSelectRef")(curSelectTmp.representedValue);
      }

      setInputSelectState({
        ...inputSelectState,
        isSelectOpen: true,
        isShowFull: false,
        inputValue: e.target.value,
      });
    };
    //   e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    // ) => {
    //   setInputSelectState({ ...inputSelectState, isSelectOpen: true });
    // };

    const handleOnClickInputWrapper = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      console.log("go click input wrapper");
      setInputSelectState({
        ...inputSelectState,
        isShowFull: !inputSelectState.isSelectOpen,
        isSelectOpen: !inputSelectState.isSelectOpen,
      });
    };

    const handleClickSelectItem = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      setRef("lastCorrectSelectRef")((e.target as HTMLElement).textContent);
      console.log("go blur click select item");
      setInputSelectState({
        ...inputSelectState,
        isSelectOpen: false,
        isShowFull: false,
        inputValue: (e.target as HTMLElement).textContent ?? "",
      });
    };

    const handleOnMouseEnterSelectItem = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      setInputSelectState({
        ...inputSelectState,
        hoverValue: (e.target as HTMLElement).textContent ?? "",
      });
    };

    const handleOnBlurInputWrapper = () => {
      console.log("go blur input wrapper");
      let curSelectTmp: ISelected | undefined = selectData.find(
        (cur) => cur.representedValue === inputSelectState.inputValue,
      );

      setInputSelectState({
        ...inputSelectState,
        isSelectOpen: false,
        isShowFull: false,
        inputValue: curSelectTmp
          ? inputSelectState.inputValue
          : getRef("lastCorrectSelectRef"),
        hoverValue: curSelectTmp
          ? inputSelectState.inputValue
          : getRef("lastCorrectSelectRef"),
      });

      // save if pass control useState
      if (setSelected) {
        if (curSelectTmp) {
          setSelected({ ...curSelectTmp });
          return;
        }
        curSelectTmp = selectData.find(
          (cur) =>
            cur.representedValue.toUpperCase() ===
            getRef("lastCorrectSelectRef").toUpperCase(),
        );
        if (curSelectTmp) setSelected({ ...curSelectTmp });
      }
    };

    const handleOnKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log("handle key down input");
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        // handleOnBlurInputWrapper();
        let curSelectTmp: ISelected | undefined = selectData.find(
          (cur) => cur.representedValue === inputSelectState.hoverValue,
        );

        setRef("lastCorrectSelectRef")(
          curSelectTmp
            ? inputSelectState.hoverValue
            : getRef("lastCorrectSelectRef"),
        );

        setInputSelectState({
          ...inputSelectState,
          isSelectOpen: false,
          isShowFull: false,
          inputValue: curSelectTmp
            ? inputSelectState.hoverValue
            : getRef("lastCorrectSelectRef"),
        });

        // save if pass control useState
        if (setSelected) {
          if (curSelectTmp) {
            setSelected({ ...curSelectTmp });
            return;
          }
          curSelectTmp = selectData.find(
            (cur) =>
              cur.representedValue.toUpperCase() ===
              getRef("lastCorrectSelectRef").toUpperCase(),
          );
          if (curSelectTmp) setSelected({ ...curSelectTmp });
        }
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        console.log(">>go key down");
        setInputSelectState({
          ...inputSelectState,
          hoverValue: calculateHoverValue({
            curSelectData,
            curHoverValue: inputSelectState.hoverValue,
            move: 1,
          }),
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        console.log(">>go key up");
        setInputSelectState({
          ...inputSelectState,
          hoverValue: calculateHoverValue({
            curSelectData,
            curHoverValue: inputSelectState.hoverValue,
            move: -1,
          }),
        });
      }
    };

    const calculateHoverValue = React.useCallback(
      ({ curSelectData, curHoverValue, move }: ICalculateHoverValue) => {
        if (curSelectData.length === 0) return "";
        if (curHoverValue === "")
          curHoverValue = curSelectData[0].representedValue;
        for (let i = 0; i < curSelectData.length; i++) {
          if (curSelectData[i].representedValue === curHoverValue) {
            let tempPos = i + move;
            if (tempPos < 0) {
              while (tempPos < 0) tempPos += curSelectData.length;
            }
            if (tempPos > curSelectData.length - 1) {
              while (tempPos > curSelectData.length - 1)
                tempPos -= curSelectData.length;
            }
            console.log(">>check pos: ", tempPos);
            return curSelectData[tempPos].representedValue;
          }
        }
        return "";
      },
      [],
    );

    return (
      <div className={styles.inputSelectWrapper}>
        {inputSelectState.isSelectOpen && (
          <div
            className={styles.selecteWrapper}
            ref={setRef("selectWrapperRef")}
          >
            {curSelectData.length !== 0 ? (
              <>
                {curSelectData.map((cur) => (
                  <div
                    className={`${styles.selectItem} ${
                      cur.representedValue === inputSelectState.inputValue
                        ? styles.selectedItem
                        : cur.representedValue === inputSelectState.hoverValue
                        ? styles.selectItemHover
                        : ""
                    }`}
                    key={cur.realValue}
                    onMouseDown={handleClickSelectItem}
                    onMouseEnter={handleOnMouseEnterSelectItem}
                    data-select={
                      cur.representedValue === inputSelectState.hoverValue
                        ? "selected"
                        : ""
                    }
                  >
                    {cur.representedValue}
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.noResult}>Không tìm thấy kết quả nào</div>
            )}
          </div>
        )}

        <div
          className={styles.inputWrapper}
          onClick={handleOnClickInputWrapper}
          ref={setRef("inputWrapperRef")}
          data-inputwapper="0"
        >
          <input
            type="text"
            ref={ref}
            className={styles.input}
            placeholder={placeholder}
            value={inputSelectState.inputValue}
            onChange={handleOnChangeInput}
            onBlur={handleOnBlurInputWrapper}
            onKeyDown={handleOnKeyDownInput}
          />
          <div className={styles.svgWrapper}>
            <ArrowDown className={styles.customSvg} />
          </div>
        </div>
      </div>
    );
  },
);

export default InputSelect;