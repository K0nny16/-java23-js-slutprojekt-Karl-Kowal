//Bygger dom olika elementen men först kollar så det inte är ett tomt resultat.
//Om tomt skickar vi ett felmedelande.
//Funktionen visar en bild en title och annan information på hemsidan som är relevant för median eller personen.
function showData(data,searchType){
    const contentContainer = document.querySelector("#content");
    //Itererar igenom arrayen av objekt.
    for(const object of data){
        const mediaDiv = document.createElement("div");
        mediaDiv.className="contentDiv";

        //Sätter sourcen till bilden och eventuellt felmedelande.
        const img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500"+(object.profile_path ? object.profile_path : object.poster_path);
        img.alt = "Bilden hittades inte!";
        mediaDiv.append(img);

        //Kollar ifall det är en film eller en serie som är i objektet.
        const headerTextH2 = document.createElement("h2");
        headerTextH2.innerText = (object.name ? object.name:object.original_title);
        mediaDiv.append(headerTextH2);
        
        if(searchType =="People"){
            const departmentPtag = document.createElement("p");
            departmentPtag.innerText = object.known_for_department;            ;
            mediaDiv.append(departmentPtag);

            //Går igenom known_for arrayen och lägger till namn på filmen/serien samt mediatyp i en lista.
            const knowForUl = document.createElement("ul")
            for(let i=0; i < object.known_for.length; i++){
                const titleLi = document.createElement("li");
                const title = (object.known_for[i].original_title ? object.known_for[i].original_title : object.known_for[i].original_name);
                titleLi.innerText=`${object.known_for[i].media_type.charAt(0).toUpperCase() + object.known_for[i].media_type.slice(1)}: ${title}`;
                knowForUl.append(titleLi);
            }
            mediaDiv.append(knowForUl);

        }else if(searchType == "Movies"){
            //Lägger till release date på en ptag och ifall det skulle saknas i objektet så visas det ett felmedelande.
            const releaseDatePtag = document.createElement("p");
            releaseDatePtag.innerText="Released: "+(object.release_date ? object.release_date:"no release date in DB!");
            mediaDiv.append(releaseDatePtag);

            const descriptionPtag = document.createElement("p");
            descriptionPtag.innerText=(object.overview ? object.overview : "No media description in DB!");
            mediaDiv.append(descriptionPtag);
        
        //Samma concept som ovan.
        }else if(searchType == "top10" || searchType == "popular"){
            const releaseDatePtag = document.createElement("p");
            releaseDatePtag.innerText="Released: "+(object.release_date ? object.release_date :"no release date in DB!");
            mediaDiv.append(releaseDatePtag);
        }
        contentContainer.append(mediaDiv);
    }
}

function noResult(){
    const errorH2 = document.createElement("h2");
    errorH2.innerText="No results!";
    return errorH2;
}

export{showData,noResult};