import { parseData } from "./displayData.js";

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
    if(searchType == "search")url = "https://api.themoviedb.org/3/search/multi?query="+search+"&include_adult=false&language=en-US&page=1";
    else if(searchType == "top10")url ="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    else if(searchType == "popular")url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

    const respone = await fetch(url,options);
    const data = await respone.json();
    return data;
}

//Metod som behandlar eventet beroende på ifall det är någon av knapparna som trycks eller ifall det är formet som gör en submit.
async function handelSubmits(event){
    event.preventDefault();
    let searchType;
    let search;
    if(event.type == "click") searchType = event.currentTarget.id;
    else if(event.type == "submit"){
        search = event.currentTarget.querySelector("#textInput").value;
        searchType = "search";
    } 
   try{
       const data = fetchAPIData(searchType,search);
       parseData(data);
   }catch(error){
        //Testa detta!!
        const errorMessage = document.createElement("h1");
        errorMessage.innerText=`Ett fel inträffade! ${error}`;
        document.body.querySelector("#content").append(errorMessage);
   }
}

export{handelSubmits};