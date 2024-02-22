import { getMain } from 'api/main';
import Entities from 'store';
import * as toastr from 'toastr';

export const loadMain = async () => {
    try {
        const result = await getMain();

        Entities.app.setTest(JSON.stringify(result.data));
    } catch (error: any) {
        toastr.error(error.message);
    }
}
