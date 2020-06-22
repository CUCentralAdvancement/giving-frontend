import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

const userCartInitialState =
  typeof window !== "undefined" &&
  JSON.parse(window.localStorage.getItem("userCart"))
    ? JSON.parse(window.localStorage.getItem("userCart"))
    : [];

const userInitialState =
  typeof window !== "undefined" &&
  JSON.parse(window.localStorage.getItem("user"))
    ? JSON.parse(window.localStorage.getItem("user"))
    : { id: uuidv4() };

export const userCart = atom({
  key: "userCart",
  default: userCartInitialState,
});

export const user = atom({
  key: "user",
  default: userInitialState,
});
