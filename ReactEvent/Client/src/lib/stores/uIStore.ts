import { makeAutoObservable } from "mobx";

export class UIStore {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  isBusy() {
    return (this.isLoading = true);
  }
  isIdle() {
    return (this.isLoading = false);
  }
}
