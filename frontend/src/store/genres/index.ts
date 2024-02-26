import { action, makeObservable, observable } from 'mobx';

export interface IShow {
  id: string;
  image: {
    medium: string;
  };
  name: string;
}

export interface IGenre {
  score: number;
  show: IShow;
}

export class Genres {
  @observable list: { [key: string]: IGenre[] } = {};

  constructor() {
    makeObservable(this);
  }

  @action
  setGenres(genres: { [key: string]: IGenre[] }) {
    this.list = genres;
  }
}
