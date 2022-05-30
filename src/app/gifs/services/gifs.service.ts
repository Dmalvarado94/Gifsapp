import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'UqX8nZ0VxB0csMrBNEDBbSAQI03vz82N'

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial () {
    
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
// existen varios modos de guardar el historial del que esta navegando en la app
this._historial = JSON.parse ( localStorage.getItem('historial')! )  || [];
this.resultados = JSON.parse ( localStorage.getItem('resultados')! )  || [];

}



// Este es el otro modo
  //  if ( localStorage.getItem('historial') ){
  //    this._historial = JSON.parse ( localStorage.getItem('historial')! );
 //   }

  

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this.historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ) )  ;
  }

  this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=UqX8nZ0VxB0csMrBNEDBbSAQI03vz82N&q=${ query }&limit=25`)
      .subscribe ( (  resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ) )  ;
    
      });
  
    }
 }

  

