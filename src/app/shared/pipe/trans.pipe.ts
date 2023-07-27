import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans'
})
export class TransPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if (value !== null || value !== undefined) {
      return value + "hello";
    }

    return value;
  }

}
