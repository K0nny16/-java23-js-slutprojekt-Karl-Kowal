import { showData } from "./displayData.js";

async function fetchAPIData(searchType, search) {
    //Skickar med ett objekt med request info.
    let url;
    const options = {
        method:'GET',
        headers:{
            accept:'application/json',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzVjODIyNGNhOGEwZWQ5ODkyMzdhN2IwOTVhMGVhNCIsInN1YiI6IjY2MWZkNDM4M2M0MzQ0MDE3YzA0ODA5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMWvn8XnwK8YYhcnV7cp0PNHxz-IjGR78a8kY_ORP_Y'
        }
    };
    //Anpassar URLn beroende på vad användaren har sökt efter.
    if(searchType == "People")url = "https://api.themoviedb.org/3/search/person?query="+search+"%20&include_adult=false&language=en-US&page=1";
    else if(searchType == "Movies") url = "https://api.themoviedb.org/3/search/movie?query="+search+"&include_adult=false&language=en-US&page=1";
    else if(searchType == "top10")url ="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    else if(searchType == "popular")url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    try{
        const respone = await fetch(url,options);
        const data = await respone.json();
        //Kontrollerar så att användarens sökning gav ett resultat.
        if(data.results == 0){
            const errorH2 = document.createElement("h2");
            errorH2.innerText="No results!";
            contentContainer.append(errorH2);
            return [];
        } 
        return data.results;
    }
    catch(error){
        const errorElement = document.createElement("h2");
        errorElement.innerText=`Error! \n ${error}`
        contentContainer.append(errorElement);
    }
}

const contentContainer = document.querySelector("#content");
//Funktionen kollar vilken knapp användaren har tryckt på och även vad den har sökt på och spara det i searchType och search.
async function handelSubmits(event){
    event.preventDefault();
    contentContainer.innerHTML="";
    let searchType;
    let search;

    if(event.type == "click") searchType = event.currentTarget.id;

    else if(event.type == "submit"){
        const selectElement = document.querySelector("select");
        searchType = selectElement.value;
        search = document.querySelector("#textInput").value.trim();
    } 
    const data = await fetchAPIData(searchType, search);
    showData(data, searchType);
}

export{handelSubmits};