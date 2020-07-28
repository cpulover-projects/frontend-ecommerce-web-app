import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//to populate credit card months and years
export class ExpirationService {

  constructor() { }

  getMonths(startMonth: number): Observable<number[]> {
    
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    //Use ```of``` operator to wrap object as Observable
    return of(data);

  }

  getYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();

    for (let theYear = startYear; theYear <= startYear + 10; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
