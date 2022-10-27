const resultsArray = []

async function getMovie(name) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=faac618f8b55fe67036720b29d0f430d&query=${name}`)
    const data = await response.json()
    var providerObject;
    console.log(data.total_results)

    if(data.total_results > 0) {  //making sure that the name is valid

        console.log("This is the data: " + JSON.stringify(data, null, 5))
        
        const movieData = data.results

        for(let i = 0; i < movieData.length; i++) {   //getting the movie info

            const individualMovie = {"image": movieData[i].poster_path ,"title" : movieData[i].title, "movie_id": movieData[i].id, "overview": movieData[i].overview, "rating": movieData[i].vote_average, "release_date": movieData[i].release_date, "providers": []}
            //console.log(individualMovie)

            const getMovie_id = movieData[i].id
            const response2 = await fetch(`https://api.themoviedb.org/3/movie/${getMovie_id}/watch/providers?api_key=faac618f8b55fe67036720b29d0f430d`)
            const data2 = await response2.json()
            const ssP = data2.results.GB //ssp = streaming service providers
            for(let j in ssP) { //getting the steaming service providers
                if( j == "flatrate") {
                    console.log(`This is the ssP[j] ${JSON.stringify(ssP[j], null, 4)}`)
                    const streaming = ssP[j]
                    for(let k = 0; k < streaming.length; k++) { //going through the providers array
                        for(let n in streaming[k]) { //going through each object in the provider's array so that the correct details can be extracted
                            console.log(streaming[k])
                            providerObject = {"providerName": streaming[k].provider_name, "providerLogo": streaming[k].logo_path }
                            console.log(JSON.stringify(providerObject,null,4))
                        }
                        individualMovie.providers.push(providerObject) //adds the providers' details into the nested array 
                    } 
                }
            } 
            resultsArray.push(individualMovie)   //adds a new movie object into the movie array
        }

        console.log(`Here is the results array: ${JSON.stringify(resultsArray, null, 4)}`)
        return(resultsArray);
        
    } else {
        console.log("Invalid Name, Please Try Again")
        return("Invalid Name, Please Try Again");
    }
}

async function outputMovie(movieName) {
    const output1 = await getMovie(movieName)
    console.log(`This is the final fucntion output: ${JSON.stringify(output1, null, 4)}`)
}

outputMovie("jack reacher")

module.exports = outputMovie