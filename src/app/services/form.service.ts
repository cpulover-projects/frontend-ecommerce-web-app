import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Country} from 'src/app/common/country';
import {State} from 'src/app/common/state';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//to populate or retrieve data from backend: credit card expiration months and years, countries, states
export class FormService {

  private countryUrl="http://localhost:8080/api/countries";
  private stateUrl="http://localhost:8080/api/states";

  //inject HttpClient to invoke APIs
  constructor(private httpClient:HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countryUrl).pipe(
      map(response=>response._embedded.countries)
    )
  }

  getStates(countryCode:string): Observable<State[]>{
    const searchUrl=`${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(response=>response._embedded.states)
    )
  }

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

interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}
interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}