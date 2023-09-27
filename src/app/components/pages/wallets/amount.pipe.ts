import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    if (isNaN(value)) {
      return '';
    }
    return this.decimalPipe.transform(value, '1.0-0') || '';
  }
}
