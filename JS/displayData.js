function parseData(data,type){
    let parsedObjects;
    //Search parsar inte rätt!
    if(type == "person"){
        parsedObjects = data.map(person => ({
            profile_picure:person.profile_path,
            name:person.name,
            know_for_department:person.know_for_department,
            known_for:person.known_for.map(titels => titels.original_title)
        }));
    }else if(type == "movieserach"){
        parsedObjects = data.map(search =>({
            poster_path: search.poster_path,
            title: search.title,
            release_date: search.release_date
        }));
    }else if(type == "top10" ||type == "popular"){
        parsedObjects = data.map(movie =>({
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date
        }));
    }
    console.log(parsedObjects)
}

export{parseData};