import { Injectable, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DateFormattingService implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(value: any, ...args: any[]): any {
        return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm');
    }
}
