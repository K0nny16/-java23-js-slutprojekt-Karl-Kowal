import { fetchAPIData } from "./fetchData.js";
import { noResult,showData } from "./displayData.js";

const contentContainer = document.querySelector("#content");
//Funktionen kollar vilken knapp användaren har tryckt på och även vad den har sökt på och spara det i searchType och search.
async function handelSubmits(event) {
  event.preventDefault();
  contentContainer.innerHTML = "";
  let searchType;
  let search;

  if (event.type == "click") searchType = event.currentTarget.id;
  else if (event.type == "submit") {
    const selectElement = document.querySelector("select");
    searchType = selectElement.value;
    search = document.querySelector("#textInput").value.trim();
  }
  const data = await fetchAPIData(searchType, search);
  if(event.type == "click") data.splice(1,9);
  console.log(data)
  if(data == 0) contentContainer.append(noResult());
  else showData(data, searchType);
}
export { handelSubmits };
