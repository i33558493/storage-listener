import { getAddEventListener, getLocalStorage } from './utils';

const _addEventListener = getAddEventListener();
const _localStorage = getLocalStorage();

interface DispatchListenerEvent { key: string; newValue: string; oldValue: string; storageArea: Storage; url: string }
type Listener = (newValue: string, oldValue: string, url?: string) => {}
 
interface ListenerStore {
    [key: string]: Listener[];
}

class StorageListener {
    private listenerStore: ListenerStore = {}
    private constructor() {
        if (typeof _localStorage !== 'object') {
            console.warn('storage-listener: The current environment does not support localStorage API');
            return;
        }
        try {
            _addEventListener('storage', this.dispatchListener);
        }catch (e) {
            console.warn(e.message);
        }
    }
    private dispatchListener (event: DispatchListenerEvent): void {
        const {key, newValue, oldValue, url} = event;
        if (this.listenerStore[key] instanceof Array) {
            for (let item of this.listenerStore[key]) {
                if (typeof item === 'function') {
                    item(newValue, oldValue, url);
                }
            }
        }
    }
}

export default StorageListener;