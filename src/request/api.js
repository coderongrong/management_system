import { request } from './index'

export const getList = params => {
    return request({
        method: 'get',
        url: 'list',
        params
    })
}

export const getAddList = params => {
    return request({
        method: 'post',
        url: 'add',
        data: params
    })
}