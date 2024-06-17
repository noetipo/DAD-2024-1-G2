import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Categorias} from "./models/categorias";
import {CategoriaComponent} from "./componets/categoria.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategoriaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public categorias: Categorias[] = [];
  public categoria = new Categorias();
  public saludoComponent?: string;
  title = 'pedidos';

  constructor() {
    console.log("constructor CategoriaComponent");
  }

  ngOnInit(): void {
    console.log("ngOnInit")
    for (let i = 0; i < 10; i++) {
      let categoria = new Categorias();
      categoria.id = i;
      categoria.nombre = "categoria" + i;
      this.categorias.push(categoria);
    }
    console.log(this.categorias);
  }

  public eventClick(categoria: Categorias): void {

    this.categoria = categoria
    console.log("click:", categoria);
  }

  public respuestaEvent($event: string): void {
    this.saludoComponent = $event;
    console.log($event);
  }
}
