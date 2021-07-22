import { Component } from '@angular/core';
import { Gif } from '../interface/gif.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})

export class ResultadosComponent {
  private _busqueda: string =  '';

  get resultados(): Gif[]{
    return this.gifsService.resultados;
  }
  
  get busqueda(): string{
    this._busqueda = this.gifsService.ultimo;
    return this._busqueda;
  }

  constructor(
    private gifsService: GifsService
    ){}
  }