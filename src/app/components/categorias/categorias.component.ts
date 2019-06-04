import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit ,ElementRef , ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService
  ) { }

  public categories = null;
  public MyCategories = [];
  public allCategories = false;
  public empty;



  @ViewChild('asunto') asunto : ElementRef;
  ngOnInit() {
    this.getCategories();
    
  }

  setCategoria(){
    let category = event.srcElement.childNodes[0].textContent;
    sessionStorage.setItem("categoria", category);
  }

  filterMycategories(categories){
    this.empty=true;
    let myCategories = [];
    this.MyCategories = [];
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    myCategories =  userInfo.categories
    console.log(myCategories, this.categories);
    for (let category of categories){
     if(myCategories.includes(category.titulo)){
      this.MyCategories.push(category)
      this.empty=false;

     }
    }

  }

  getCategories(){
      this.dataApi.getAll('Categoria').subscribe(categories => {
      this.categories = categories;
      this.filterMycategories(categories);
    })
  }

  // saveUserCategroy(){
  //   console.log("sube esta categoria:");
  // }

  addMyCategory(category){
    let user = JSON.parse(sessionStorage.getItem("userInfo"));
    user.categories.push(category);
    sessionStorage.setItem('userInfo', JSON.stringify(user));
    this.authService.updateUserCategory(this.authService.user.name , user.categories)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: 'Guardado en Mis Comunidades'
    })
    this.getCategories();
  }

  removeMyCategory(category){
    let newMyCategories = [];
    console.log(this.MyCategories);
    for(let myCategory of this.MyCategories){
      if(myCategory.titulo!=category){
        newMyCategories.push(myCategory.titulo);
      }
    }
    this.authService.updateUserCategory(this.authService.user.name , newMyCategories);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'error',
      title: 'Eliminado de Mis Comunidades'
    })
    this.getCategories();

  }

  showAllCategories(){
    this.allCategories==true?this.allCategories=false:this.allCategories=true;
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
