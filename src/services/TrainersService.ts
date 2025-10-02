import ApiService from './ApiService'

export async function apiGetTrainerLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/trainers/log`,
        method: 'get',
        params,
    })
}

export async function apiGetTrainers<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/trainers`,
        method: 'get',
        params,
    })
}
