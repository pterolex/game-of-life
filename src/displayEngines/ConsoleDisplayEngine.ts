import DisplayEngine from "./DisplayEngineInterface";
import { FieldStateArray } from "../FieldState";

export default class ConsoleDisplayEngine implements DisplayEngine {
  draw(fieldStateArray: FieldStateArray) {
    console.table(fieldStateArray);
  }
}
