import { apiServer } from 'settings/web-services/api';
import Entities from 'store';
import { IPost } from 'store/posts';

export const loadPosts = async () => {
  const posts = await apiServer.get<IPost[]>('/posts');
  Entities.posts.setPosts(posts.data);
}
