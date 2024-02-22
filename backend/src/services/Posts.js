const axios = require('axios');

class PostsService {
  list = [];

  constructor() {
    this.list = [];
  }

  async loadPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
}

module.exports = PostsService;
