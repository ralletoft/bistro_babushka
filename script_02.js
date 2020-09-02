let retter;
let filter = "alle";
document.addEventListener("DOMContentLoaded", loadJSON)

async function loadJSON() {
    const JSONData = await
    fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");

    retter = await JSONData.json();
    addEventListenersToButtons();
    visRetter();
}

function visRetter() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector("#list");
    listPointer.innerHTML = "";
    console.log(retter);

    retter.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            const minKlon = templatePointer.cloneNode(true).content;
            minKlon.querySelector(".navn").textContent = ret.gsx$navn.$t;
            minKlon.querySelector(".pris").textContent = ret.gsx$pris.$t;
            minKlon.querySelector(".kort").textContent = ret.gsx$kort.$t;
            minKlon.querySelector(".kategori").textContent = ret.gsx$kategori.$t;
            minKlon.querySelector(".oprindelse").textContent = ret.gsx$oprindelse.$t;
            minKlon.querySelector(".billede").src = `imgs/small/${ret.gsx$billede.$t}` + "-sm.jpg";

            minKlon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

            listPointer.appendChild(minKlon);
        }

    })
}

function visDetaljer(ret) {
    console.log(ret);

    location.href = `06_detalje.html?id=${ret.gsx$id.$t}`;
}

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();

}
