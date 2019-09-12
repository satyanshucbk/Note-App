import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchfilter',
})
export class CustomPipe implements PipeTransform {
  transform(row: any,searchText: any): boolean {
  
    if(typeof searchText==='undefined' || searchText==""){
      return row;
    }

     return row.filter((obj)=>{
      let title = obj.title.toLowerCase();
      let searchTerm = searchText.toLowerCase();
      if(title.indexOf(searchTerm)>=0){
        return obj;
      }
    
    })
 
  }
}
