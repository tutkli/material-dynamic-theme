# Material Dynamic Theme

Angular Demo for an application with a dynamic theme. You can change the theme color in **real time**.

This project was generated with Angular CLI version 14.2.4.

**Check Demo at: https://tutkli.github.io/material-dynamic-theme/**

### Dependencies

* [Angular Material](https://material.angular.io/) Official Angular UI component library
* [@ctrl/tinycolor](https://github.com/scttcper/tinycolor) - A small library for color manipulation and conversion


### How it works

Through the [ThemeService](https://github.com/tutkli/material-dynamic-theme/blob/master/src/app/theme.service.ts), a theme is generated based on the selected color using Tinycolor's algorithm, then CSS variables are set with the theme values.

The Angular Material Theme is set in the [dynamic-theme](https://github.com/tutkli/material-dynamic-theme/blob/master/src/styles/dynamic-theme.scss) file, using the CSS variable names.
