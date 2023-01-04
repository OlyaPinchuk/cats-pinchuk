import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import {Store, select, State} from "@ngrx/store";
import {IBreed} from "../../interfaces/breed";
import {CatsService} from "../../services/cats/cats.service";
import {ICat} from "../../interfaces/cat";

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  cats: ICat[] | undefined;
  limitStore: Observable<number>;
  limit: number | string = 10;
  breeds: IBreed[] | undefined;
  chosenBreed: IBreed | undefined;
  breed$: Observable<IBreed>;

  constructor(private httpClient: HttpClient, private store: Store<{ breed: IBreed, limit: number }>, private catsServise: CatsService) {
    this.breed$ = store.pipe(select('breed'));
    this.limitStore = store.pipe(select('limit'));
  }

  ngOnInit(): void {
    this.limitStore.subscribe(value => {
      if (this.limit !== value){
        this.limit = value;
        if (this.chosenBreed) {
          this.handleBreedClick(this.chosenBreed);
        } else {
          this.catsServise.getAllCats(this.limit)
            .subscribe(value => {
              this.cats = value;
          })
        }
      }
    })

    this.breed$.subscribe(value => {
      if (value.id !== '') {
        this.chosenBreed = value;
        this.handleBreedClick(value);
      } else {
        this.chosenBreed = undefined;
        this.catsServise.getAllCats(this.limit)
            .subscribe(value => this.cats = value);
      }
    })


    this.catsServise.getAllBreeds()
      .subscribe(value => this.breeds = value);
  }

  handleBreedClick(breed: any) {
    this.chosenBreed = breed;
    this.catsServise.getCatsOfBreed(this.limit, this.chosenBreed)
      .subscribe(value => this.cats = value);
  }

}
