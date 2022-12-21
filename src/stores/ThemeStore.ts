import { action, makeObservable, observable } from 'mobx';

export class ThemeStore {
  @observable theme: 'light' | 'dark' = 'light';

  constructor() {
    makeObservable(this);
    this.setTheme(this.theme);
  }

  @action
  toggleTheme() {
    this.theme = this.theme == 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
  }

  private setTheme(theme: 'light' | 'dark') {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
  }
}

const themeStore = new ThemeStore();
export { themeStore };
