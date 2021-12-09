import { writable } from 'svelte/store';
function createUser(){
    const {subscribe, set} = writable({});
    return {
        subscribe,
        create : (user) => set(user),
		reset: () => set({})
	};
}
export const USER = createUser();