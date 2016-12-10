import isPlainObject from 'is-plain-object'


const _encode = value => Array.isArray(value) && !value.length ? '[]' : encodeURIComponent(value)

const encodeParam = (value, key) => {
    if (isPlainObject(value)) {
        return Object.keys(value).reduce((memo, _key) => {
            return `${memo}${key}[${_key}]=${_encode(value[_key])}&`
        }, '')
    } else {
        return `${key}=${_encode(value)}&`
    }
}

export const encodeParams = (params = {}) => {
    if (!isPlainObject(params)) throw new Error('encodeParams expects a plain object')
    return Object.keys(params).reduce((memo, key) =>
        `${memo}${encodeParam(params[key], key)}`
    , '').slice(0,-1)
}


export default (baseUrl = '', baseParams = {}) =>
    (relativeUrl, params = {}) => {
        if (relativeUrl.charAt(0) !== '/') {
            relativeUrl = `/${relativeUrl}`
        }
        const separator = relativeUrl.includes('?') ? '&' : '?'
        // doing this because baseParams should be overridden by params,
        // but preferable to havebaseParams at end of querystring
        // (even if key order not fully guaranteed)
        params = Object.keys(baseParams).reduce((memo, k) => {
            if (memo[k]) return memo
            memo[k] = baseParams[k]
            return memo
        }, {...params})

        return `${baseUrl}${relativeUrl}${separator}${encodeParams(params)}`
    }
