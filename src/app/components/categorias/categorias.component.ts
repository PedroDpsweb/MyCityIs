import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit ,ElementRef , ViewChild } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(
    private dataApi: DataApiService
  ) { }

  public categories = [];


  @ViewChild('asunto') asunto : ElementRef;
  ngOnInit() {
    this.dataApi.getAll('Categoria').subscribe(categories => {
      this.categories = categories;
      console.log('categorias',this.categories);
    })
  }

  setCategoria(){
    let category = event.srcElement.childNodes[0].textContent;
    sessionStorage.setItem("categoria", category);
  }

}
