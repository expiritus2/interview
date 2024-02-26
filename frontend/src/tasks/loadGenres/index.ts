import { apiServer } from 'settings/web-services/api';
import Entities from 'store';
import { IGenre } from '../../store/genres';

export const loadGenres = async (query: string, controller: AbortController) => {
  const posts = await apiServer.get<{ [key: string]: IGenre[] }>('/genres', { signal: controller.signal, params: { search: query } });
  Entities.genres.setGenres(posts.data);
}
