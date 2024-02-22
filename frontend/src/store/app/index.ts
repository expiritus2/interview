import { action, makeObservable, observable } from 'mobx';

export class App {
    @observable test = 'true';

    constructor() {
        makeObservable(this);
    }

    @action
    setTest(isTest: string) {
        this.test = isTest;
    }
}
