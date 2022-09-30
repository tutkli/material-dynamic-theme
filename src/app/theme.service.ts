import {Injectable} from '@angular/core';
import {Numberify, RGBA, TinyColor} from '@ctrl/tinycolor';

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

  /**
   * Updates all the CSS variables regarding the Primary Palette
   * @param primaryColor Color the Primary Palette is going to be generated from.
   */
  savePrimaryColor(primaryColor: string) {
    this.primaryColorPalette = ThemeService.computeColors(primaryColor);
    this.updateTheme(this.primaryColorPalette, 'primary');
  }

  /**
   * Updates all the CSS variables regarding the Accent Palette
   * @param accentColor Color the Accent Palette is going to be generated from.
   */
  saveAccentColor(accentColor: string) {
    this.accentColorPalette = ThemeService.computeColors(accentColor);
    this.updateTheme(this.accentColorPalette, 'accent');
  }

  /**
   * Updates all the CSS variables regarding the Warn Palette
   * @param warnColor Color the Accent Warn is going to be generated from.
   */
  saveWarnColor(warnColor: string) {
    this.warnColorPalette = ThemeService.computeColors(warnColor);
    this.updateTheme(this.warnColorPalette, 'warn');
  }

  /**
   * Generates the CSS variables from a given Palette.
   * @param colors Generated color Palette.
   * @param theme Palette that the variables belong to.
   * @private
   */
  private updateTheme(colors: Color[], theme: 'primary' | 'accent' | 'warn'): void {
    colors.forEach((color: Color): void => {
      document.documentElement.style.setProperty(`--theme-${theme}-${color.name}`, color.hex);
      document.documentElement.style.setProperty(
        `--theme-${theme}-contrast-${color.name}`,
        color.darkContrast ? 'rgba(black, 0.87)' : 'white'
      );
    });
  }

  /**
   * Generates a Color Palette from a given Hex Color.
   * @param hex Hex Color that the Palette will be based on.
   * @private
   */
  private static computeColors(hex: string): Color[] {
    const baseLight: TinyColor = new TinyColor('#ffffff');
    const baseDark: TinyColor = ThemeService.multiply(new TinyColor(hex).toRgb(), new TinyColor(hex).toRgb());
    const baseTriad: TinyColor[] = new TinyColor(hex).tetrad();
    return [
      ThemeService.getColorObject(baseLight.mix(hex, 12), '50'),
      ThemeService.getColorObject(baseLight.mix(hex, 30), '100'),
      ThemeService.getColorObject(baseLight.mix(hex, 50), '200'),
      ThemeService.getColorObject(baseLight.mix(hex, 70), '300'),
      ThemeService.getColorObject(baseLight.mix(hex, 85), '400'),
      ThemeService.getColorObject(baseLight.mix(hex, 100), '500'),
      ThemeService.getColorObject(baseDark.mix(hex, 87), '600'),
      ThemeService.getColorObject(baseDark.mix(hex, 70), '700'),
      ThemeService.getColorObject(baseDark.mix(hex, 54), '800'),
      ThemeService.getColorObject(baseDark.mix(hex, 25), '900'),
      ThemeService.getColorObject(baseDark.mix(baseTriad[4], 15).saturate(80).lighten(65), 'A100'),
      ThemeService.getColorObject(baseDark.mix(baseTriad[4], 15).saturate(80).lighten(55), 'A200'),
      ThemeService.getColorObject(baseDark.mix(baseTriad[4], 15).saturate(100).lighten(45), 'A400'),
      ThemeService.getColorObject(baseDark.mix(baseTriad[4], 15).saturate(100).lighten(40), 'A700'),
    ];
  }

  /**
   * Return a relevant color Object
   * @param value Generated color
   * @param name Palette name that represents the color
   * @private
   */
  private static getColorObject(value: TinyColor, name: string): Color {
    return {
      name,
      hex: value.toHexString(),
      darkContrast: false,
    };
  }

  /**
   * Multiplies two RGB Colors
   * @param rgb1
   * @param rgb2
   * @private
   */
  private static multiply(rgb1: Numberify<RGBA>, rgb2: Numberify<RGBA>): TinyColor {
    rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
    rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
    rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
    return new TinyColor({ r: rgb1.r, g: rgb1.g, b: rgb1.b });
  }
}
