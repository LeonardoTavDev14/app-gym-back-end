import { IDayJsProvider } from "./IDayJsProvider";

import dayjs from "dayjs";

export class DayJsProvider implements IDayJsProvider {
  getYear(): number {
    return dayjs().year();
  }

  add(value: number, unit?: dayjs.ManipulateType): Date {
    return dayjs().add(value, unit).toDate();
  }

  isBefore(date?: dayjs.ConfigType, unit?: dayjs.OpUnitType): boolean {
    return dayjs().isBefore(date, unit);
  }
}
