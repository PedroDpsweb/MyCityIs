import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyCityIs';
  datoHijo = "Sin datos"

checkLog(e){
console.log(e);
this.datoHijo = e;
}




}
