const PostsService = require('../services/Posts');

class PostsController {
  static async get(req, res) {
    const postsService = new PostsService();
    const posts = await postsService.loadPosts();
    res.send(posts);
  }
}

module.exports = PostsController;
