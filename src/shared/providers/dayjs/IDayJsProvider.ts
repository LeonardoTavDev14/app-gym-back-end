import dayjs from "dayjs";

export interface IDayJsProvider {
  getYear(): number;
  add(value: number, unit?: dayjs.ManipulateType): Date;
  isBefore(date?: dayjs.ConfigType, unit?: dayjs.OpUnitType): boolean;
}
