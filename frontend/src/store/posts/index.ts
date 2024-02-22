import { action, makeObservable, observable } from 'mobx';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class Posts {
  @observable list: IPost[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  setPosts(postsList: IPost[]) {
    this.list = postsList;
  }
}
