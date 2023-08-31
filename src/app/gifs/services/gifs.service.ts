import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

// const GIPHY_APY_KEY = 'cFQBcvxDZ6I2RNshWRTz405PRaeqPy5y';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'cFQBcvxDZ6I2RNshWRTz405PRaeqPy5y';

  public gifList: Gif[] = [];

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizedHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {

    console.log('Loading history...');
    const temporal = localStorage.getItem('history');

    if (temporal) {
      this._tagsHistory = JSON.parse(temporal);
      this.searchTag(this._tagsHistory[0]);
    }
  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;

    this.organizedHistory(tag);
    console.log(`Tag buscado: ${this.tagsHistory}`);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10')
      .set('q', tag );

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;

        console.log( { gifs: this.gifList } );
      });
  }

  // async searchTag(tag: string): Promise<void> {

  //   if (tag.length === 0) return;

  //   this.organizedHistory(tag);
  //   console.log(`Tag buscado: ${this.tagsHistory}`);

  // fetch('https://api.giphy.com/v1/gifs/search?api_key=cFQBcvxDZ6I2RNshWRTz405PRaeqPy5y&q=valorant&limit=10')
  //   .then( resp => resp.json )
  //   .then( data => console.log(data) );

  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=cFQBcvxDZ6I2RNshWRTz405PRaeqPy5y&q=valorant&limit=10');
  //   const data = await resp.json;
  //   console.log(data);
  // }


}
