import React, { Component } from 'react'

// import { movies } from '../movieData'

import axios from 'axios'

export class MovieList extends Component {

    constructor() {
        super()
        this.state = {
            hover: '',
            pageArr: [1],
            movies : [],
            currPage : 1,
            favourites : []

        }
    }

   
    async componentDidMount(){
       const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=145316e93368055af5ac7f08e215a637&language=en-US&page=${this.state.currPage}`)

       let movieData = response.data
       console.log(movieData)

       this.setState({
        movies : [...movieData.results]
       })
    }


    changeMovies = async()=>{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=145316e93368055af5ac7f08e215a637&language=en-US&page=${this.state.currPage}`)

       let movieData = response.data
    //    console.log(movieData)

       this.setState({
        movies : [...movieData.results]
       })
    }

    handleNext=()=>{
         let tempArr = []
         for(let i=1;i<=this.state.pageArr.length + 1 ;i++)
         {
            tempArr.push(i)
         }

         this.setState({
            pageArr : [...tempArr],
            currPage : this.state.currPage+1
         },this.changeMovies) 

         
    }


    handlePrev = ()=>{
        if(this.state.currPage != 1){
            this.setState({
                currPage : this.state.currPage - 1
            },this.changeMovies)
        }
    }


    handlePageClick = (value)=>{
        if(value != this.state.currPage)
        {
            this.setState({
                currPage : value
            },this.changeMovies)
        }
    }

    handleFavourites=(movieObj)=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')
  
        if(this.state.favourites.includes(movieObj.id)){
                  oldData = oldData.filter((movie)=> movie.id != movieObj.id)
        }
  
        else{
          oldData.push(movieObj)
        }
  
        localStorage.setItem("movies-app" , JSON.stringify(oldData))
        console.log(oldData)
  
        this.handleFavouritesState()
    }
  
    handleFavouritesState =()=>{
      let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')
      let temp = oldData.map((movie)=>movie.id)
  
      this.setState({
        favourites : [...temp]
      })
  
  
    }

    render() {

        //let moviesArr = movies.results


        return (
            <div>
                {/* {
            moviesArr.map((movieElem)=>(
                <h1>{movieElem.title}</h1>
            ))
        } */}

                <h3 style={{ textAlign: 'center' }}><strong>Trending</strong></h3>

                <div className='movies-list'>
                    {
                        this.state.movies.map((movieElem) => (
                            <div className="card movie-card" onMouseEnter={() => this.setState({ hover: movieElem.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                                    style={{ height: '40vh', width: '20vw' }}
                                    class="card-img-top movie-img" alt="..." />

                                <h5 className="card-title movie-title">{movieElem.title}</h5>


                                <div className='button-wrapper' style={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        this.state.hover == movieElem.id &&
                                        <a className="btn btn-primary movies-button text-center" 
                                        onClick={()=> this.handleFavourites(movieElem)}>{this.state.favourites.includes(movieElem.id) ? "Remove from Favourites" : 'Add to Favourites'}</a>
                                    }

                                </div>
                            </div>
                        ))

                    }

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>
                            {
                                this.state.pageArr.map((value) => {
                                    return <li class="page-item"><a class="page-link" onClick={()=>this.handlePageClick(value)}>{value}</a></li>
                                })
                            }

                            <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
                        </ul>
                    </nav>
                </div>

            </div>
        )
    }
}

export default MovieList