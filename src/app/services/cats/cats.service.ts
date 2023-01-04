import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICat} from "../../interfaces/cat";
import {IBreed} from "../../interfaces/breed";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders({'x-api-key':'live_R5ObB4iBlAwM8oB0MxEcnPoueZnS7kS2AnT8eAgtQvxZEPax2f9L9yZQ1XlggDqs'});

  getAllCats(limit): Observable<ICat[]> {
    return this.httpClient.get<ICat[]>(`https://api.thecatapi.com/v1/images/search?limit=${limit}`, {headers: this.headers});
  }

  getCatsOfBreed(limit, chosenBreed): Observable<ICat[]> {
    return this.httpClient.get<ICat[]>(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${chosenBreed.id}`, {headers: this.headers});
  }

  getAllBreeds(): Observable<IBreed[]>{
    return this.httpClient.get<IBreed[]>(`https://api.thecatapi.com/v1/breeds`);
  }
}
