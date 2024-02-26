import { Genres } from './genres';

class Root {
    genres: Genres;

    constructor() {
        this.genres = new Genres();
    }
}

const stores = new Root();

if (process.env.REACT_APP_IS_DEVTOOLS) {
    // @ts-ignore
    window.Entities = stores;
}

export default stores;

