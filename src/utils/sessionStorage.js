let sessionStorage = window.sessionStorage

export function setSessionStorage(key,value) {
    sessionStorage.setItem(key,JSON.stringify(value))
}
export function getSessionStorage(key) {
    let res = sessionStorage.getItem(key)
    return JSON.parse(res)
}

export function removeSessionStorage(key) {
    sessionStorage.removeItem(key)
}