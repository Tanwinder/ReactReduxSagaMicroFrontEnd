import { callApi, handleError } from '../../../utilities/request';
import { endPoints } from '../../../app.config';

export async function getEnvRocAdminUrls() {
    return callApi(endPoints.ROC_ADMIN_URLS, "/rocAdminUrls", {
        'method': "GET"
    })
}
