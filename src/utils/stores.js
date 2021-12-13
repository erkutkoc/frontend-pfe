import { writable } from 'svelte/store';

export const annonces = writable([]);
export const filteredAnnonces = writable([]);
export const usersAnnonces = writable([]);
export const usersFilteredAnnonces = writable([]);