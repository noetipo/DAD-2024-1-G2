import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Categorias} from "./models/categorias";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public categorias:Categorias[]=[];

  title = 'pedidos';
  constructor() {
    console.log("constructor AppComponent");
  }
  ngOnInit() {
    console.log("ngOnInit")
    for (let i = 0; i < 10; i++) {
        let categoria= new Categorias();
        categoria.id=i;
        categoria.nombre="categoria"+i;
        this.categorias.push(categoria);
    }
    console.log(this.categorias);
  }
  public  eventClick(categorias:Categorias){
    console.log("click:", categorias);
  }
}
