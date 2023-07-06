import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberShorten',
})
export class NumberShortenPipe implements PipeTransform {
  transform(value: any): string {
    let result = value;
    if (value >= 1000000000000) {
      result = roundDown(value / 1000000000000, 1) + `T`;
    } else if (value >= 1000000000) {
      result = roundDown(value / 1000000000, 1) + `B`;
    } else if (value >= 1000000) {
      result = roundDown(value / 1000000, 1) + `M`;
    } else if (value >= 1000) {
      result = roundDownValue(value / 1000) + `K`;
    } else {
      result = roundDown(value, 2);
    }

    return result;
  }
}

export const roundDown = (number: any, decimals: any) => {
  decimals = decimals || 0;
  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const roundDownValue = (value: any, size?: number) => {
  let number = value;

  let FormattedNumber;
  if (size === 2) {
    FormattedNumber = Number(number?.toString().match(/^\d+(?:\.\d{0,2})?/));
  } else {
    FormattedNumber = Number(number?.toString().match(/^\d+(?:\.\d{0,1})?/));
  }

  return FormattedNumber;
};
