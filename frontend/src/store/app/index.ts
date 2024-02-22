import { action, makeObservable, observable } from 'mobx';

export class App {
    @observable test = true;

    constructor() {
        makeObservable(this);
    }

    @action
    setTest(isTest: boolean) {
        this.test = isTest;
    }
}
