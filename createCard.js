//const movies = [ 
//    { "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3QBhiRykpFQP4thOZC1ugZqZPiGl-iF3OQ2zUG6L7CImpVU18", "title": "Scary Movie 2", "rating": "4.2", "streamingServices": "Netflix, Prime Video" }, 
//    { "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHxC5rmn9c0DyXM5htwUrAuc5YRfclpFNVggYfpyHuGADDvpX", "title": "The Fifth Element", "rating": "4.5", "streamingServices": "Disney" }, 
//    { "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGiJl2EmHXCH7NhnDrevKTDejQeWIDaIGs_pgwRt_7VNSckOv", "title": "Friday", "rating": "4.7", "streamingServices": "Prime Video, Disney" } ]

//Uncomment above and below to see example

const main = document.querySelector('.main')

let createMovieCard = ({image, title, rating, streamingServices}) => {

    const movie = document.createElement('div')
    movie.classList.add('movie-card')

    const movieImage = document.createElement('div')              
    movieImage.classList.add('movie-image')
    movieImage.style.backgroundImage = `url("${image}")`
    movieImage.style.backgroundSize = "cover"

    const movieContainer = document.createElement('div')         
    movieContainer.classList.add('movie-container')

    const movieTitle = document.createElement('h2')        
    movieTitle.classList.add('movie-title')
    movieTitle.append(title)
    movieContainer.appendChild(movieTitle)

    const movieRating = document.createElement('p')
    movieRating.classList.add("rating")      
    movieRating.append(rating)
    movieContainer.appendChild(movieRating)

    const movieServices = document.createElement('p')              
    movieServices.classList.add('streaming-services')
    movieServices.append(streamingServices)
    movieContainer.appendChild(movieServices)



    movie.appendChild(movieImage)
    movie.appendChild(movieContainer)
    main.appendChild(movie)
}

//movies.forEach(movie => {
//    createMovieCard(movie);
//})