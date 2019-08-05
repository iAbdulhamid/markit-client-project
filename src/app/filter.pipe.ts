import { Pipe, PipeTransform } from '@angular/core';
import { Items } from './Shared-Classes-and-Interfaces/items';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Items[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.Item_Name.toLocaleLowerCase().includes(searchText);
    });


  }

}
