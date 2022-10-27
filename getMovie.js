const resultsArray = []
const frontPageArray = []
const slideShowArray = []

async function getMovie(name) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=faac618f8b55fe67036720b29d0f430d&query=${name}`)
    const data = await response.json()
    var providerObject;

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
            //console.log(`Link: ${JSON.stringify(ssP.link, null,4)}`)
            const movieLink = ssP.link
            individualMovie['link'] = movieLink;
            for(let j in ssP) { //getting the steaming service providers
                if( j == "flatrate") {
                    //console.log(`This is the ssP[j] ${JSON.stringify(ssP[j], null, 4)}`)
                    const streaming = ssP[j]
                    for(let k = 0; k < streaming.length; k++) { //going through the providers array
                        for(let n in streaming[k]) { //going through each object in the provider's array so that the correct details can be extracted
                            //console.log(streaming[k])
                            providerObject = {"providerName": streaming[k].provider_name, "providerLogo": streaming[k].logo_path }
                            //console.log(JSON.stringify(providerObject,null,4))
                        }
                        individualMovie.providers.push(providerObject) //adds the providers' details into the nested array 
                    } 
                }
            } 
            resultsArray.push(individualMovie)   //adds a new movie object into the movie array
        }

        //console.log(`Here is the results array: ${JSON.stringify(resultsArray, null, 4)}`)
        return(resultsArray);
        
    } else {
        console.log("Invalid Name, Please Try Again")
        return("Invalid Name, Please Try Again");
    }
}

function traversal(dataset) { //for loop function
    const dataToTraverse = dataset.results
    for(let i = 0; i < dataToTraverse.length; i++) {
        const frontMovieData = {"image": dataToTraverse[i].poster_path ,"title" : dataToTraverse[i].title, "movie_id": dataToTraverse[i].id, "overview": dataToTraverse[i].overview, "rating": dataToTraverse[i].vote_average, "release_date": dataToTraverse[i].release_date}
        frontPageArray.push(frontMovieData)
    }
}


// async function frontPageMovies2(filterType) {
//     if(filterType === "Top Rated") {
//         let response4 =  await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
//         let data4 = await response4.json()
//         //console.log(`These are the top rated movies: ${JSON.stringify(data4, null,4)}`)
//         return data4;
//     } else if(filterType == "Popular") {
//         console.log("ferge")
//         let response5 =  await fetch("https://api.themoviedb.org/3/movie/popular?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
//         let data5 = await response5.json()
//         //console.log(data5)
//         return data5;
//     } else if(filterType == "upcoming") {
//         let response6 =  await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
//         let data6 = await response6.json()
//         return data6;
//         //console.log(data6)
//     }
// }

async function frontPageMovies(filterType) {
    switch(filterType) {
        case "top rated":
            let response4 =  await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
            let data4 = await response4.json()
            traversal(data4)
            return data4;
        case "popular":
            let response5 =  await fetch("https://api.themoviedb.org/3/movie/popular?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
            let data5 = await response5.json()
            traversal(data5)
            return data5;
        case "upcoming":
            let response6 =  await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
            let data6 = await response6.json()
            traversal(data6)
            return data6;
    }
}
async function slideShowDataFunction(numberOfSlides) {
    let response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=faac618f8b55fe67036720b29d0f430d&language=en-US&page=1")
    let data = await response.json()
    var pop_shows = data.results
    for(let i = 0; i < numberOfSlides; i++) {
        const slideShowData = {"image": pop_shows[i].poster_path ,"title" : pop_shows[i].title, "movie_id": pop_shows[i].id, "overview": pop_shows[i].overview, "rating": pop_shows[i].vote_average, "release_date": pop_shows[i].release_date}
        slideShowArray.push(slideShowData)
    }
}



async function outputFrontPage(filterName) { //front page movies displayed by default
    if(filterName === undefined) {
        filterName = "popular"
    }
    const output2 = await frontPageMovies(filterName)
    console.log(`This is the front page movies array: ${JSON.stringify(frontPageArray,null,6)}`)
}

async function outputMovie(movieName) { //
    const output1 = await getMovie(movieName)
    console.log(`This is the final function output: ${JSON.stringify(output1, null, 4)}`)
}

async function outputSlideShow(num) {
    const output3 = await slideShowDataFunction(num)
    console.log(`This array contains the information for the slideshow: ${JSON.stringify(slideShowArray, null, 4)}`)
}


//outputMovie("jack reacher")
//outputFrontPage()
outputSlideShow(4)
