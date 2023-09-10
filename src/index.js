import { fetchBreeds } from "./cat-api";
import { fetchCatImgByBreed } from "./cat-api";
import { fetchCatInfoByBreed } from "./cat-api";
import Notiflix from 'notiflix';

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Yz6vXkYOnJJkH7U2a4lVJC2KXu1xfs21U0nx7WZgaaB75k5jzunuj0MclPThNE0T";

const selectEl = document.querySelector(".breed-select");
const loaderMsg = document.querySelector(".loader");
const errorMsg = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

selectEl.style.display = "none";
errorMsg.style.display = "none";

catInfo.style.alignItems = "start";
catInfo.style.gap = "16px";
catInfo.style.marginTop = "16px"




fetchBreeds()
    .then(res => res.map(item => `<option value="${item.id}">${item.name}</option>`).join(""))
    .then(res => {
        selectEl.insertAdjacentHTML("beforeend", res);
        selectEl.style.display = "block";
        loaderMsg.style.display = "none";
    })
    .catch(error => {
        loaderMsg.style.display = "none";
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })

selectEl.addEventListener("change", onSelectChange);

function onSelectChange(e) {
    catInfo.innerHTML = "";
    loaderMsg.style.display = "block";
    catInfo.style.display = "none";
    e.preventDefault;
    console.dir(e.target.value);
    const selectedBreed = e.target.value;
    fetchCatImgByBreed(selectedBreed)
        .then(res => `<img src="${res[0].url}" width="300"/>`)
        .then(res => {
            catInfo.insertAdjacentHTML("afterbegin", res);
            loaderMsg.style.display = "none";
            errorMsg.style.display = "none";
        })
        .catch(error => {
            loaderMsg.style.display = "none";
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            catInfo.style.display = "none";
        });
    fetchCatInfoByBreed(selectedBreed)
        .then(res => `<div><h1>${res.name}</h1><p>${res.description}</p><p><b>Temperament: </b>${res.temperament}</p></div>`)
        .then(res => {
            catInfo.insertAdjacentHTML("beforeend", res);
            catInfo.style.display = "flex"
        })
        .catch(error => {
            loaderMsg.style.display = "none";
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            catInfo.style.display = "none";
        });
};


