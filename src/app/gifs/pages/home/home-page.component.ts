import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  // public list:string[] = ["Primero", "Segundo", "3"];

  constructor( private gifsService: GifsService ) {}

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }
}
