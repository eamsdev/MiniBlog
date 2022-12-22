import { action, computed, makeObservable, observable } from 'mobx';

type Theme = 'light' | 'dark';

export class ThemeStore {
  @observable theme: Theme = 'light';

  constructor() {
    makeObservable(this);

    const cookieTheme = this.getThemeFromCookie();
    if (['light', 'dark'].includes(cookieTheme)) {
      this.theme = cookieTheme as Theme;
      this.setTheme(cookieTheme as Theme);
    } else {
      this.setTheme(this.theme);
    }
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
    document.cookie = `theme=${theme};path=/`;
  }

  getThemeFromCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; theme=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
}

const themeStore = new ThemeStore();
export { themeStore };
