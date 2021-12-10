import { writable } from 'svelte/store';

function selectedCat() {
    const { subscribe, set } = writable({});

    return {
        subscribe,
        setSelected: (categorie) => set(categorie),
    };
}

function selectedCamp() {
    const { subscribe, set } = writable({});

    return {
        subscribe,
        setSelected: (campus) => set(campus),
    };
}

export const selectedCategorie = selectedCat();
export const selectedCampus = selectedCamp();