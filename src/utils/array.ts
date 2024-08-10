import { DateList } from "../models";
import { v4 as uuidv4 } from "uuid";

export function shuffleAray(array) {
  return array.sort(() => Math.random() - 0.5);
}
