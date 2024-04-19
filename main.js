import { handelSubmits } from "./JS/fetchData.js";


const btnTop10 = document.querySelector("#top10");
const btnPopular = document.querySelector("#popular");
const form = document.querySelector("form");

//Skapar eventlisteners för dom olika alternativen.
btnTop10.addEventListener('click',handelSubmits);
btnPopular.addEventListener('click',handelSubmits);
form.addEventListener('submit',handelSubmits);

/*TODO
    Kontrollera felhantering så det uppfyller kraven.
    (Punkten öven fixa tillexempe ifall sökningen inte ger något resultat!)
    (Fetch error är hanterade med try/catch kanske inte räcker ? kolla på måndag)

    Optimera kod.
    Kolla vad som kan vara en eventuell VG funktion till programmet.
    CSS???
 */