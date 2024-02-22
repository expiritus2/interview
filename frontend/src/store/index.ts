import { Posts } from './posts';

class Root {
    posts: Posts;

    constructor() {
        this.posts = new Posts();
    }
}

const stores = new Root();

if (process.env.REACT_APP_IS_DEVTOOLS) {
    // @ts-ignore
    window.Entities = stores;
}

export default stores;

