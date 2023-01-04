import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {SetBreed, SetLimit} from '../../ngrx/actions';
import {Observable, startWith, map} from "rxjs";
import {IBreed} from "../../interfaces/breed";
import { FormControl } from '@angular/forms'
import {CatsService} from "../../services/cats/cats.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  breeds: IBreed[] | undefined;
  searchBreeds: IBreed[];
  chosenBreed: IBreed | undefined;
  limitStore: Observable<number>;
  limit: number;
  chosenBreedNew: Observable<IBreed>;
  search: FormControl;

  constructor(private store: Store<{ breed: IBreed, limit: number }>, private catsService: CatsService) {
    this.chosenBreedNew = store.pipe(select('breed'));
    this.limitStore = store.pipe(select('limit'));
  }


  ngOnInit() {
    this.limitStore.subscribe(value => this.limit = value);
    this.search = new FormControl('');

    this.catsService.getAllBreeds()
      .subscribe(value => {
        this.breeds = value
        this.searchBreeds = value
      });

  }
  handleBreedClick(breed: any) {
    this.chosenBreed = breed;
    this.store.dispatch(new SetBreed(breed));
  }
  handleLimitClick(limit: number) {
    this.store.dispatch(new SetLimit(limit));
  }
  handleSearchInput() {
    this.searchBreeds = this.breeds.filter(b => b.name.toLowerCase().includes(this.search.value.toLowerCase()));
  }

  handleShowAll() {
    this.store.dispatch(new SetBreed({id: '', name: ''}));
    this.chosenBreed = undefined;
  }
}
