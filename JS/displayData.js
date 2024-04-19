function parseData(data,searchType){
    let parsedObjects;
    //Search parsar inte rätt!
    if(searchType == "people"){
        parsedObjects = data.map(person => ({
            profile_picure:person.profile_path,
            name:person.name,
            know_for_department:person.know_for_department,
            known_for:person.known_for.map(titels => titels.original_title)
        }));
    }else if(searchType == "movieSearch"){
        parsedObjects = data.map(search =>({
            poster_path: search.poster_path,
            title: search.original_title,
            release_date: search.release_date
        }));
    }else if(searchType == "top10" ||searchType == "popular"){
        parsedObjects = data.map(movie =>({
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date
        }));
    }
    console.log(parsedObjects)
}

export{parseData};