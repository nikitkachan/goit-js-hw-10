import { fetchBreeds } from "./cat-api";
import { fetchCatImgByBreed } from "./cat-api";
import { fetchCatInfoByBreed } from "./cat-api";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

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
        selectEl.style.display = "flex";
        selectEl.style.width = "300px";
        loaderMsg.style.display = "none";
        new SlimSelect({
        select: document.querySelector('#selectElement')
})
    })
    .catch(onFetchError)

selectEl.addEventListener("change", onSelectChange);

function onSelectChange(e) {
    catInfo.innerHTML = "";
    loaderMsg.style.display = "block";
    catInfo.style.display = "none";
    e.preventDefault;
    const selectedBreed = e.target.value;
    fetchCatImgByBreed(selectedBreed)
        .then(res => `<img src="${res[0].url}" width="600"/>`)
        .then(res => {
            catInfo.insertAdjacentHTML("afterbegin", res);
            loaderMsg.style.display = "none";
            errorMsg.style.display = "none";
        })
        .catch(onFetchError);
    fetchCatInfoByBreed(selectedBreed)
        .then(res => `<div><h1>${res.name}</h1><p>${res.description}</p><p><b>Temperament: </b>${res.temperament}</p></div>`)
        .then(res => {
            catInfo.insertAdjacentHTML("beforeend", res);
            catInfo.style.display = "flex"
        })
        .catch(onFetchError);
};

function onFetchError(error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    catInfo.style.display = "none";
    loaderMsg.style.display = "none";
    console.error(error);
}
