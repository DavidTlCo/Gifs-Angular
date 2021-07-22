import { Injectable, TestabilityRegistry } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifResponse, Gif } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private API_KEY: string = 'inWV4bb8NAxI5flUkjO5Jb05O31q0549';
  private _historial: string[] = [];
  private _baseURL:string = 'https://api.giphy.com/v1/gifs';
  private _limit: string = '100';

  public resultados: Gif[] = [];
  public ultimo: string = '';
  
  get historial(): string[]{
    return [...this._historial];
  }

  
  constructor(
    private http: HttpClient
    ) { 
      // restore the history from localStorage
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
      this.ultimo = JSON.parse(localStorage.getItem('ultimo')!) || '';
      // if( localStorage.getItem('historial'))
      //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    
  buscar(tema: string): void{
    if( tema.trim() )
    if( !this._historial.includes(tema) ){
      this._historial.unshift( tema );
      // Set the history to 10 register
      this._historial = this._historial.splice(0, 10);
      // Saving the history in localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
    .set('api_key', this.API_KEY)
    .set('limit', this._limit)
    .set('q', tema);
    
    this.http.get<SearchGifResponse>(`${ this._baseURL }/search`, { params })
    .subscribe( (res) => {
      this.resultados = res.data;
      this.ultimo = tema;
      localStorage.setItem('ultimo', JSON.stringify(tema));
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      console.log(this.resultados);
    })
  }
  
  vaciarHistorial(): void{
    localStorage.setItem('historial', JSON.stringify([]));
    localStorage.setItem('ultimo', JSON.stringify(''));
    localStorage.setItem('resultados', JSON.stringify([]));
    this._historial = [];
    this.ultimo = '';
  }
}
