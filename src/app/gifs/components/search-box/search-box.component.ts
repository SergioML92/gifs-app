import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag( )"
      #txtTagInput
      >
      <!-- <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag( txtTagInput.value )"
      #txtTagInput
      > -->
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  // searchTag( newTag: string) {
  //   console.log({newTag})
  // }
  searchTag():void {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);
    console.log({newTag})

    this.tagInput.nativeElement.value = '';
  }
}
