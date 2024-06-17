import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Categorias} from "../models/categorias";


@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {

  @Input() categoria?:Categorias;
  @Input() saludo?:string;
  @Output() respuestaEvent = new EventEmitter<string>();


  constructor() {

  }
  ngOnInit() {

  }
public responseMensaje(){
  console.log("click event");
  this.respuestaEvent.emit("Saludo desde "+ this.categoria?.nombre);
}
}
