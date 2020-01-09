import request from '../utils/request';

export const fetchData = (url,query) => {
    return request({
        url:url,
        method: 'get',
        params: query
    });
};
