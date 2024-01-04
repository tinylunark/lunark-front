import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTimeFilter',
})
export class RelativeTimeFilterPipe implements PipeTransform {

  transform(input: Date): string{
    console.log(input);
    var current = new Date().valueOf();
    var inputTimestamp = new Date(input).valueOf();
    var msPerSecond = 1000;
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - inputTimestamp;

    if (elapsed < msPerSecond) {
        return 'just now';
    }

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        console.log('inside the if condition', elapsed);
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }

}

}
