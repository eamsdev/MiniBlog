import { action, computed, makeObservable, observable } from 'mobx';

type Theme = 'light' | 'dark';

export class ThemeStore {
  @observable theme: Theme = 'light';

  constructor() {
    makeObservable(this);
    this.setTheme(this.theme);
  }

  @computed
  get isLight() {
    return this.theme == 'light';
  }

  @action
  toggleTheme() {
    this.theme = this.theme == 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
  }

  private setTheme(theme: Theme) {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
  }
}

const themeStore = new ThemeStore();
export { themeStore };
