import { FieldStateArray } from "../FieldState";

export default interface DisplayEngine {
  draw(fieldStateArray: FieldStateArray): void;
}
