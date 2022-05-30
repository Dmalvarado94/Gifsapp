import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'UqX8nZ0VxB0csMrBNEDBbSAQI03vz82N'

  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial () {
    
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this.historial.splice(0,10);
  }

  this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=UqX8nZ0VxB0csMrBNEDBbSAQI03vz82N&q=${ query }&limit=50`)
      .subscribe ( (  resp: any ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  
    }


  }

