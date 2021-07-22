import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{
  tema: string = '';

  // Is a directive that looks any change in element match
  // @ViewChild('referencia_local_HTML') this.nombre!: ElementRef<HTML____Element>;
  @ViewChild('busqueda') busqueda!: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService
  ){}

  buscar(): void{
    this.tema = this.busqueda.nativeElement.value;
    this.gifsService.buscar( this.tema.trim().toLowerCase() );
    this.busqueda.nativeElement.value = '';
  }
}
