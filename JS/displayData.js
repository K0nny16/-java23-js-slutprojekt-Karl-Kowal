function parseData(data,searchType){
    //Gör om datan till mer lätt hanterliga object och arrayer.
    let parsedObjects;
    if(searchType == "People"){
        parsedObjects = data.map(person => ({
        profile_picture: person.profile_path,
        name: person.name,
        know_for_department: person.known_for_department,
        known_for: person.known_for.map(title => {
            if (title.media_type == "movie") return title.original_title;
            else if (title.media_type == "tv") return title.original_name;
        }),
        mediaType: person.known_for.map(mediaType => mediaType.media_type)
    }));
    }else if(searchType == "Movies"){
        parsedObjects = data.map(search =>({
            poster_path: search.poster_path,
            title: search.original_title,
            release_date: search.release_date,
            overview:search.overview
        }));
    }else if(searchType == "top10" ||searchType == "popular"){
        parsedObjects = data.map(movie =>({
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date
        }));
    }
    console.log(parsedObjects);
    showData(parsedObjects,searchType);
}
//Bygger dom olika elementen men först kollar så det inte är ett tomt resultat.
//Om tomt skickar vi ett felmedelande.
function showData(parsedData,searchType){
    const contentContainer = document.querySelector("#content");
    if(parsedData.length == 0){
        const noResults = document.createElement("h2");
        noResults.innerText="No results!";
        contentContainer.append(noResults);
    }
    for(const object of parsedData){
        const div = document.createElement("div");
        div.className="contentDiv";

        const img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500"+(object.profile_picture ? object.profile_picture : object.poster_path);
        img.alt = "Bilden hittades inte!";
        div.append(img);

        const headerText = document.createElement("h2");
        headerText.innerText = (object.name ? object.name:object.title);
        div.append(headerText);
        
        if(searchType =="People"){
            const department = document.createElement("p");
            department.innerText = object.know_for_department;
            div.append(department);

            const knowFor = document.createElement("ul")
            for(let i=0; i < object.known_for.length; i++){
                const titleLi = document.createElement("li");
                titleLi.innerText=`${object.mediaType[i].charAt(0).toUpperCase() + object.mediaType[i].slice(1)}: ${object.known_for[i]}`;
                knowFor.append(titleLi);
            }
            div.append(knowFor);

        }else if(searchType == "Movies"){
            const releaseDate = document.createElement("p");
            releaseDate.innerText="Released: "+(object.release_date ? object.release_date:"no release date in DB!");
            div.append(releaseDate);

            const description = document.createElement("p");
            description.innerText=(object.overview ? object.overview : "No media description in DB!");
            div.append(description);

        }else if(searchType == "top10" || searchType == "popular"){
            const releaseDate = document.createElement("p");
            releaseDate.innerText="Released: "+(object.release_date ? object.release_date :"no release date in DB!");
            div.append(releaseDate);
        }
        contentContainer.append(div);
    }
}

export{parseData};