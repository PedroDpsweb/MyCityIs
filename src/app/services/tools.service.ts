import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getFormatedDate(){
    let date = new Date().toString();
    let formatedDate = date.split(' ');
    let outputDate = "";
    for(let i=0;i<5; i++){
      outputDate += formatedDate[i] + " ";
    }

    return outputDate;
  }

  /**
   * De formato Date a Milisegundo y viceversa
   */
  dateConverter(date){
    let resultado;
      if(typeof date === 'string'){
        resultado = Date.parse(date);
        return resultado;
      }else{
        resultado = new Date(date)
        return resultado;
      }
  }
}
