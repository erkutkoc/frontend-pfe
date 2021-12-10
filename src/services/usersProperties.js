import { writable } from 'svelte/store';

function createUser() {
    const { subscribe, set } = writable({});
    return {
        subscribe,
        create: (user) => set(user),
        reset: () => set({}),
    };
}
export const USER = createUser();
// a retirer avec tt ce que y a au dessus ->qd on refresh tt part du store
//deplacer cette classe dans utils qd ok
export const userData = writable(null);