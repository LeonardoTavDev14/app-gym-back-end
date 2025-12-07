import { IDayJsProvider } from "./IDayJsProvider";

import dayjs from "dayjs";

export class DayJsProvider implements IDayJsProvider {
  getYear(): number {
    return dayjs().year();
  }
}
