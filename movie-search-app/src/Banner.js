import React, {useState, useEffect} from 'react'
import baseURL from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function updateBanner() {
      const request = await baseURL.get(requests.fetchNetflixOriginals);
      const moviesData = request.data.results;
      setMovie(moviesData[Math.floor(Math.random() * moviesData.length)]);
      console.log('MOVIE, ', movie)
      return request;
    }
    updateBanner();
  }, [])

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header>
      <div className="banner"
        style={{backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center"}}>
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
            <div className="banner__buttons">
              <button className="banner__button">Play</button>
              <button className="banner__button">My List</button>
            </div>
          </h1> 
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
        </div>
        <div className="banner--fadeBottom" />
      </div>

      
    </header>
  )
}

export default Banner
