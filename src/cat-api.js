import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Yz6vXkYOnJJkH7U2a4lVJC2KXu1xfs21U0nx7WZgaaB75k5jzunuj0MclPThNE0T";

export function fetchBreeds() {
    return axios('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data)
  
};

export function fetchCatImgByBreed(breedId) {
    return axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
};

export function fetchCatInfoByBreed(breedId) {
    return axios(`https://api.thecatapi.com/v1/breeds/${breedId}`)
        .then(response => response.data)
};