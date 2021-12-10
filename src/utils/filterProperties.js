import { writable } from 'svelte/store';

function selectedCat() {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setSelected: (categorie) => set(categorie),
        reset: () => set(null)
    };
}
function selectedMin(){
    const { subscribe, set } = writable(-1);

    return {
        subscribe,
        setSelected: (min) => set(min),
        reset: () => set(-1)
    };
}
function selectedMax(){
    const { subscribe, set } = writable(-1);

    return {
        subscribe,
        setSelected: (max) => set(max),
        reset: () => set(-1)
    };
}

function selectedCamp() {
    const { subscribe, set } = writable({});

    return {
        subscribe,
        setSelected: (campus) => set(campus),
        reset: () => set(null)
    };
}

export const selectedCategorie = selectedCat();
export const selectedCampus = selectedCamp();
export const selectedMinPrice = selectedMin();
export const selectedMaxPrice = selectedMax();