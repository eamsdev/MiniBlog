import { action, makeObservable, observable } from 'mobx';

export class UiStore {
  @observable showNavbar: boolean;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  toggleShowNavbar() {
    this.showNavbar = !this.showNavbar;
  }
}

const navUiStore = new UiStore();
export { navUiStore };
