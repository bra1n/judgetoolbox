import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(items: any[], args: string[]): any {
    let knownItems = [];
    return items.filter(item => {
      let pattern = '';
      args.forEach(prop => {
        pattern += item[prop].toString().trim() + '##';
      });
      if (knownItems.indexOf(pattern) > -1) return false;
      knownItems.push(pattern);
      return true;
    });
  }

}
