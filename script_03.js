const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");


let retter;


const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
const detalje = document.querySelector("#detalje");





document.addEventListener("DOMContentLoaded", hentData);


async function hentData() {
    const respons = await fetch(link);
    retter = await respons.json();
    vis();
}


function vis() {
    retter.feed.entry.forEach(ret => {
        if (id == ret.gsx$id.$t) {
            visDetaljer(ret)
        }
    })
}





//popup-funktionen


function visDetaljer(ret) {
    detalje.style.display = "block";
    detalje.querySelector(".det_navn").textContent = ret.gsx$navn.$t;
    detalje.querySelector(".det_lang").textContent = ret.gsx$lang.$t;
    detalje.querySelector(".det_oprindelse").textContent = ret.gsx$oprindelse.$t;
    detalje.querySelector(".det_pris").textContent = ret.gsx$pris.$t;
    detalje.querySelector(".det_billede").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;


}
document.querySelector("#luk").addEventListener("click", () => history.back());
