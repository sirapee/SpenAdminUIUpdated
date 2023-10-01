import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardamount'
})
export class DashboardamountPipe implements PipeTransform {


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
