import { apiServer } from '../settings/web-services/api';

export const getMain = () => {
    return apiServer.get('/api/v1/main');
}
