import {Component, OnInit} from '@angular/core';
import {ThemeService} from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  primaryColor: string;
  accentColor: string;
  warnColor: string;
  favoriteSeason: string;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.primaryColor = '3F51B5';
    this.changePrimaryColor(this.primaryColor);
    this.accentColor = 'F1C232';
    this.changeAccentColor(this.accentColor);
    this.warnColor = 'CC0000';
    this.changeWarnColor(this.warnColor);
  }

  changePrimaryColor(color: string): void {
    this.themeService.savePrimaryColor(color);
  }

  changeAccentColor(color: string): void {
    this.themeService.saveAccentColor(color);
  }

  changeWarnColor(color: string): void {
    this.themeService.saveWarnColor(color);
  }

}
