import {Injectable} from '@angular/core';
import * as tinyColor from 'tinyColor2';

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  primaryColorPalette: Color[] = [];
  accentColorPalette: Color[] = [];
  warnColorPalette: Color[] = [];

  constructor() { }

  savePrimaryColor(primaryColor: string) {
    this.primaryColorPalette = ThemeService.computeColors(primaryColor);
    this.updateTheme(this.primaryColorPalette, 'primary');
  }

  saveAccentColor(accentColor: string) {
    this.accentColorPalette = ThemeService.computeColors(accentColor);
    this.updateTheme(this.accentColorPalette, 'accent');
  }

  saveWarnColor(warnColor: string) {
    this.warnColorPalette = ThemeService.computeColors(warnColor);
    this.updateTheme(this.warnColorPalette, 'warn');
  }

  private updateTheme(colors: Color[], theme: string): void {
    colors.forEach((color: Color): void => {
      document.documentElement.style.setProperty(
        `--theme-${theme}-${color.name}`,
        color.hex,
      );
      document.documentElement.style.setProperty(
        `--theme-${theme}-contrast-${color.name}`,
        color.darkContrast ? 'rgba(black, 0.87)' : 'white',
      );
    });
  }

  private static computeColors(hex: string): Color[] {
    const baseLight = tinyColor('#ffffff');
    const baseDark = ThemeService.multiply(tinyColor(hex).toRgb(), tinyColor(hex).toRgb());
    const baseTriad: any = tinyColor(hex).tetrad();
    return [
      ThemeService.getColorObject(tinyColor.mix(baseLight, hex, 12), '50'),
      ThemeService.getColorObject(tinyColor.mix(baseLight, hex, 30), '100'),
      ThemeService.getColorObject(tinyColor.mix(baseLight, hex, 50), '200'),
      ThemeService.getColorObject(tinyColor.mix(baseLight, hex, 70), '300'),
      ThemeService.getColorObject(tinyColor.mix(baseLight, hex, 85), '400'),
      ThemeService.getColorObject(tinyColor.mix(baseLight, hex, 100), '500'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, hex, 87), '600'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, hex, 70), '700'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, hex, 54), '800'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, hex, 25), '900'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(65), 'A100'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(55), 'A200'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(45), 'A400'),
      ThemeService.getColorObject(tinyColor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(40), 'A700')
    ];
  }

  private static getColorObject(value: any, name: string): Color {
    const color = tinyColor(value);
    return {
      name,
      hex: color.toHexString(),
      darkContrast: false,
    };
  }

  private static multiply(rgb1: any, rgb2: any): any {
    rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
    rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
    rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
    return tinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
  };
}
