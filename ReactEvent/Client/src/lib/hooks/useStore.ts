import { StoreContext } from "../stores/store";
import { useContext } from "react";

export function useStore() {
  return useContext(StoreContext);
}
