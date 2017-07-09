/// <reference types="chrome" />

import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  title = 'Mule';
  heroes: Hero[];
  selectedHero: Hero;

  constructor( private heroService: HeroService) { }
  ngOnInit(): void {
    this.getHeroes();
  }

  interceptClick() {
    console.log( 'Clicked Intercept');
    chrome.webRequest.onBeforeRequest.addListener(this.requestProcessor);
  }
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  getAsyncHeroes(): void {
    this.heroService.getHeroesAsync().then(asyncHeroes => this.heroes = asyncHeroes);
  }


  requestProcessor(details) {
    console.log(details);
  }
  onSelectHero(hero) {
    this.selectedHero = hero;
  }
}
