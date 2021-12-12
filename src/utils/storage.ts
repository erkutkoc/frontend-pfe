// https://stackoverflow.com/questions/56488202/how-to-persist-svelte-store
import { browser } from '$app/env';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store'

const storage = <T>(key: string, initValue: T): Writable<T> => {
    const store = writable(initValue);
    if (!browser) return store;

    const storedValueStr = sessionStorage.getItem(key);
    if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

    store.subscribe((val) => {
        if ([null, undefined].includes(val)) {
            sessionStorage.removeItem(key)
        } else {
            sessionStorage.setItem(key, JSON.stringify(val))
        }
    })

    window.addEventListener('storage', () => {
        const storedValueStr = sessionStorage.getItem(key);
        if (storedValueStr == null) return;

        const localValue: T = JSON.parse(storedValueStr)
        if (localValue !== get(store)) store.set(localValue);
    });

    return store;
}

export default storage