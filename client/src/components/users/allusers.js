import React, { Component } from 'react';

import { Button, Col, Row } from 'react-bootstrap'
import image from '../logo.jpg';
import { BrowserRouter } from "react-router-dom";
const  URL = require('url').Url;


export default class AllUsers extends Component {
  constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        movieslist: [],
        movies: [],
        geners: [],
        selectedGener: null
      }
  }
  componentDidMount() {
    fetch('/users')
    .then(res => res.json())
    .then( ( movieslist ) => { 
      this.setState({
        movieslist : movieslist
      })

      fetch('/users/genres')
        .then(res => res.json())
        .then( ( geners ) => {  
          let firstGenre = geners[0].NAME
          console.log(firstGenre);
          this.filterData(firstGenre)
          this.setState({
            selectedGener: firstGenre.ID
          })
    
          this.filtergenerData(geners)
        })
    })



  }
  filterData(gener) {
    let movieslist = this.state.movieslist
    let movies = []
    let count = 0
    movieslist.forEach((movie) => {
      if(movie.GENER == gener){
        if(count == 0 ){
          movies.push([])
          movies[ movies.length-1 ].push(movie)
        }
        else{
          movies[ movies.length-1 ].push(movie) 
        }
        count = count + 1
        count = count%4
      }
    })
    console.log(movies)
    this.setState({
      movies: movies
    })
  }

  filtergenerData(geners) {
    let generlist = []
    let count = 0
    geners.forEach((gener) => {
        if(count == 0 ){
          generlist.push([])
          generlist[ generlist.length-1 ].push(gener)
        }
        else{
          generlist[ generlist.length-1 ].push(gener) 
        }
        count = count + 1
        count = count%8
    })
    console.log(generlist)
    this.setState({
      geners: generlist
    })
  }

  handlegenre(e, ID, gener) {
    this.setState({
      selectedGener: ID 
    })
    this.filterData(gener)
  }
  handleClick(e, ID) {
    // let history = BrowserRouter();
    // history.push("/about");
    console.log(this.props.location)
    this.props.router.push({
      pathname: '/about',
      state: {
        data: 'mydata',
        movieId: ID
      }
    })
  }
  render() {
    const { movies, geners, selectedGener } = this.state;
    return (
        <div style={{ backgroundColor: 'black', color: 'white' }}>
          {
            geners.map((list) => {
              return <Row style={{}}>
                {
                  list.map((gener) => {
                    return <Col style={{padding:'10px'}}>
                      {
                        <Button
                          style={{color:(selectedGener === gener.ID)?'yellow':'white' }}
                          onClick={ (e) => { this.handlegenre(e, gener.ID, gener.NAME) } }
                        >
                          {gener.NAME}
                        </Button>
                      }
                    </Col>
                  })
                }
              </Row>
            })
          }
          <br style={{backgroundColor: 'grey'}}/>
          {
            movies.map((list) => {
              return <Row className="justify-content-center" style={{padding:'5px', margin: '5px'}}>
                {
                  list.map((movie) => {
                    return <Col style={{padding:'10px', fontSize:'15px', textAlign:'center'}}>
                      {
                        <div>
                          <div>
                              <img 
                                src={image} 
                                alt="Italian Trulli" 
                                style={{height:'100px', width:'70px'}}
                                onClick={ (e) => { this.handleClick(e, movie.ID)}}
                              />
                          </div>
                          <div>
                            <span>{movie.NAME}</span>
                          </div>
                          <div>
                            {movie.GENER}
                          </div>
                          <div>
                            <span style={{color: 'yellow'}}>{movie.RATING + '  '} &#9733;</span>
                          </div>
                        </div>
                      }
                    </Col>
                  })
                }
              </Row>
            })
          }
        </div>
    );
  }
}
