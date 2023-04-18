import React from "react";
import styles from "./index.module.css";
import InputSelect, { ISelected } from "share/input-select";
import { isValidDate } from "utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IGroupDateProps {}

interface IGroupDateState {
  day: string;
  month: string;
  year: string;
}

const initGroupDateState: IGroupDateState = {
  day: "",
  month: "",
  year: "",
};

const dayList: ISelected[] = [
  { representedValue: "1", realValue: "1" },
  { representedValue: "2", realValue: "2" },
  { representedValue: "3", realValue: "3" },
  { representedValue: "4", realValue: "4" },
  { representedValue: "5", realValue: "5" },
  { representedValue: "6", realValue: "6" },
  { representedValue: "7", realValue: "7" },
  { representedValue: "8", realValue: "8" },
  { representedValue: "9", realValue: "9" },
  { representedValue: "10", realValue: "10" },
  { representedValue: "11", realValue: "11" },
  { representedValue: "12", realValue: "12" },
  { representedValue: "13", realValue: "13" },
  { representedValue: "14", realValue: "14" },
  { representedValue: "15", realValue: "15" },
  { representedValue: "16", realValue: "16" },
  { representedValue: "17", realValue: "17" },
  { representedValue: "18", realValue: "18" },
  { representedValue: "19", realValue: "19" },
  { representedValue: "20", realValue: "20" },
  { representedValue: "21", realValue: "21" },
  { representedValue: "22", realValue: "22" },
  { representedValue: "23", realValue: "23" },
  { representedValue: "24", realValue: "24" },
  { representedValue: "25", realValue: "25" },
  { representedValue: "26", realValue: "26" },
  { representedValue: "27", realValue: "27" },
  { representedValue: "28", realValue: "28" },
  { representedValue: "29", realValue: "29" },
  { representedValue: "30", realValue: "30" },
  { representedValue: "31", realValue: "31" },
];

const mothList: ISelected[] = [
  { representedValue: "Thang 1", realValue: "1" },
  { representedValue: "Thang 2", realValue: "2" },
  { representedValue: "Thang 3", realValue: "3" },
  { representedValue: "Thang 4", realValue: "4" },
  { representedValue: "Thang 5", realValue: "5" },
  { representedValue: "Thang 6", realValue: "6" },
  { representedValue: "Thang 7", realValue: "7" },
  { representedValue: "Thang 8", realValue: "8" },
  { representedValue: "Thang 9", realValue: "9" },
  { representedValue: "Thang 10", realValue: "10" },
  { representedValue: "Thang 11", realValue: "11" },
  { representedValue: "Thang 12", realValue: "12" },
];

const yearList: ISelected[] = ((startYear = 1871, currentYear = 2020) => {
  const yearTmp: ISelected[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearTmp.push({
      representedValue: year.toString(),
      realValue: year.toString(),
    });
  }
  return yearTmp;
})();

const GroupDate = React.forwardRef<any, IGroupDateProps>((props, ref) => {
  const [groupDateState, setGroupDateState] =
    React.useState<IGroupDateState>(initGroupDateState);

  const setDayState = React.useCallback(
    (day: string) => {
      setGroupDateState((pre) => ({ ...pre, day }));
    },
    [setGroupDateState],
  );

  const setMonthState = React.useCallback(
    (month: string) => {
      setGroupDateState((pre) => ({ ...pre, month }));
    },
    [setGroupDateState],
  );

  const setYearState = React.useCallback(
    (year: string) => {
      setGroupDateState((pre) => ({ ...pre, year }));
    },
    [setGroupDateState],
  );

  const conStrucDayMonth = React.useCallback((s: string) => {
    if (s.length === 1) return "0" + s;
    return s;
  }, []);

  const isError = React.useMemo(() => {
    if (
      groupDateState.day === "" ||
      groupDateState.month === "" ||
      groupDateState.year === ""
    )
      return false;

    const date =
      conStrucDayMonth(groupDateState.month) +
      "/" +
      conStrucDayMonth(groupDateState.day) +
      "/" +
      groupDateState.year;
    return !isValidDate(date);
  }, [groupDateState, conStrucDayMonth]);

  React.useImperativeHandle(ref, () => ({
    getDate() {
      if (isError) return "";
      return (
        conStrucDayMonth(groupDateState.month) +
        "/" +
        conStrucDayMonth(groupDateState.day) +
        "/" +
        groupDateState.year
      );
    },
  }));

  return (
    <div className={styles.groupDateWrapper}>
      <label className={styles.label}>NGAY SINH</label>
      <div className={styles.inputSelectWapper}>
        <InputSelect
          placeholder="Ngay"
          selectData={dayList}
          selected={groupDateState.day}
          setSelected={setDayState}
        />
        <InputSelect
          placeholder="Thang"
          selectData={mothList}
          selected={groupDateState.month}
          setSelected={setMonthState}
        />
        <InputSelect
          placeholder="Nam"
          selectData={yearList}
          selected={groupDateState.year}
          setSelected={setYearState}
        />
      </div>
      {isError && (
        <div className={styles.errorMessage}>Ngay nay khong hop le</div>
      )}
    </div>
  );
});

export default GroupDate;
