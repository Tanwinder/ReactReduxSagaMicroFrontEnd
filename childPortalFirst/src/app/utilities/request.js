import { getApiBaseUrl } from '../app.config';
import axios from 'axios';
import { message as AntMessage } from 'antd';
export async function callApi(endpoint, url, options) {
    let baseUrl = getApiBaseUrl(endpoint);

    var instance = axios.create({
        baseURL: baseUrl,
        // timeout: 15000
    });
    switch (options.method.toLowerCase()) {
        case "post":
        case "put":
        case "delete":
            return instance({
                'method': options.method,
                'url': url,
                'data': options.payload,
                'headers': {
                    'content-type': "application/json"
                }
            })
        default:
            return instance({
                'method': "GET",
                'url': url
            });
    }
}
export function handleError(error, message) {
    if (error.code === "ECONNABORTED") {
        return;
    }
    if (error.response) {
        let status = error.response.status;
        switch (status) {
            case 400:
                message = "Bad request";
                break;
            case 401:
                message = "Unauthorized";
                break;
            case 404:
                message = "The server responded with a status of 404 (Not Found)";
                break;
            case 403:
                message = "Forbidden";
                break;
            case 500:
                message = "Internal server error";
                break;
            default:
                message = "Internal server error";
                break;
        }
    }
    return;
}