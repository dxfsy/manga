import Storage from 'web-storage-cache';

let localStorage = new Storage();

export function setLocalStorage(key,value){
    localStorage.set(key,value);
}
export function getLocalStorage(key){
    return localStorage.get(key);
}
export function removeLocalStorage(key){
    return localStorage.delete(key);
}