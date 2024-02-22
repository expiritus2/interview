import { App } from './app';

class Root {
    app: App;

    constructor() {
        this.app = new App();
    }
}

const stores = new Root();

if (process.env.REACT_APP_IS_DEVTOOLS) {
    // @ts-ignore
    window.Entities = stores;
}

export default stores;

