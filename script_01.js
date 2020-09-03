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
            //minKlon.querySelector(".lang").textContent = ret.gsx$lang.$t;
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

    popup.style.display = "block";

    popup.querySelector(".pop_navn").textContent = ret.gsx$navn.$t
    popup.querySelector(".pop_pris").textContent = ret.gsx$pris.$t;
    //popup.querySelector(".pop_kort").textContent = ret.gsx$kort.$t;
    popup.querySelector(".pop_lang").textContent = ret.gsx$lang.$t;
    popup.querySelector(".pop_kategori").textContent = ret.gsx$kategori.$t;
    popup.querySelector(".pop_oprindelse").textContent = ret.gsx$oprindelse.$t;
    popup.querySelector(".pop_billede").src = `imgs/small/${ret.gsx$billede.$t}` + "-sm.jpg";
}

document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");

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
