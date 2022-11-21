const _globalThis = require('globalthis')();

function beforeunloadListener (key, callback): void {
    if (typeof _globalThis.addEventListener === 'function') {
        _globalThis.removeEventListener(key, callback);
        _globalThis.removeEventListener('beforeunload', beforeunloadListener);
    }
}

export function getAddEventListener (): Function {
    return function (key: string, callback: Function): void {
        if (typeof _globalThis.addEventListener !== 'function') {
            throw new Error('storage-listener: The current environment does not support Event Listener API');
        }
        _globalThis.addEventListener(key, callback);
        _globalThis.addEventListener('beforeunload', beforeunloadListener(key, callback));
    };
}

export function getLocalStorage (): WindowLocalStorage | undefined {
    return _globalThis.localStorage;
}