import { writable } from 'svelte/store';

function selectedCat() {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setSelected: (categorie) => set(categorie),
    };
}
function selectedMin(){
    const { subscribe, set } = writable(-1);

    return {
        subscribe,
        setSelected: (min) => set(min),
    };
}
function selectedMax(){
    const { subscribe, set } = writable(-1);

    return {
        subscribe,
        setSelected: (max) => set(max),
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
export const selectedMinPrice = selectedMin();
export const selectedMaxPrice = selectedMax();