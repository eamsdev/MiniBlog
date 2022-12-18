---
id: lorem-ipsum-3
title: Lorem ipsum 3
description: Eiusmod tempor incididunt ut labore et dolore magna aliqua
date: 14-08-2022
author: Pete Eamsuwan
readtime: 5 min
tags:
  - Event Sourcing
  - Distributed Systems
  - Architecture
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Eget nullam non nisi est sit. Gravida
dictum fusce ut placerat orci nulla. Pellentesque sit amet porttitor eget dolor morbi
non arcu risus.

- sum dolor sit amet, consectetur adi.
- et dolore magna aliqua. Eget
- labore et dolore magna aliqua. Eget nullam non nisi est sit. Gravida
  dictum fusce ut placerat orci nulla. Pellentesque sit amet porttitor eget dolor.
- m dolor sit amet, consectetur adipis.

![Architecture](https://raw.githubusercontent.com/eamsdev/MiniESS/master/architecture.png)

## HTML

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ...
    <script>
      // If there's a theme stored in localStorage, use it on the <html>
      const localStorageTheme = localStorage.getItem('theme');
      if (localStorageTheme) {
        document.documentElement.setAttribute('data-theme', localStorageTheme);
      }
    </script>
  </head>
  <body>
    <div class="theme-toggle">
      <button
        class="theme-toggle-btn js-theme-toggle"
        aria-label="Activate dark mode"
        title="Activate dark mode"
      >
        <!--
        <svg class="light-mode">
          <use xlink:href="#sun"></use>
        </svg>
        <svg class="dark-mode">
          <use xlink:href="#moon"></use>
        </svg>
        -->
      </button>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

## CSS Variables

```css
:root {
  --bg: #ffffff;
  --text: #000000;
}

[data-theme='dark'] {
  --bg: #000000;
  --text: #ffffff;
}
```

## JavaScript

```js:title=app.js
const themeToggleBtn = document.querySelector('.js-theme-toggle');

themeToggleBtn.addEventListener('click', () => onToggleClick());

const onToggleClick = () => {
  const { theme } = document.documentElement.dataset;
  const themeTo = theme && theme === 'light' ? 'dark' : 'light';
  const label = `Activate ${theme} mode`;

  document.documentElement.setAttribute('data-theme', themeTo);
  localStorage.setItem('theme', themeTo);

  themeToggleBtn.setAttribute('aria-label', label);
  themeToggleBtn.setAttribute('title', label);
};
```

## Resources

- <https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/>
- <https://css-tricks.com/flash-of-inaccurate-color-theme-fart/>
- <https://mxb.dev/blog/color-theme-switcher/>
- <https://www.joshwcomeau.com/react/dark-mode/>
- <https://web.dev/prefers-color-scheme/>
