import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

// import InputGroup from 'react-bootstrap/InputGroup';

import './style.css';
import image from '../logo.jpg';

// const InputGroup = require('react-bootstrap/InputGroup')
export default class About extends Component {
  constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        selectedmovie: null,
        title: 'movie',
        rating: 8
      }
  }
  componentDidMount(){
  	console.log(typeof this.props.location.state.movieId)
  	this.setState({
  		selectedmovie: this.props.location.state.movieId
  	})
    fetch(`/users/movie?id=${ this.props.location.state.movieId }`)
    .then(res => res.json())
    .then( ( data ) => { 
        this.setState({
          title  : data[0].NAME,
          rating : data[0].RATING
        })
      console.log(data) 
    })
  }
  handleSubmit(e){
  	//self=this;
    e.preventDefault()
  	let data = {
  		id: this.state.selectedmovie,
  		title: this.state.title,
  		rating: this.state.rating
  	}
  	fetch('/users/update', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data => {
	  console.log('Success:', data);
	})
	.catch((error) => {
	  console.error('Error:', error);
	});
  }

  render() {
    return (
      <div style={{color: 'white', padding: '30px'}} >
        {
        	this.state.selectedmovie ?
        		<div>
	        		<Row className="justify-content-center">
		       			<img 
		                  src={image} 
		                  alt="Italian Trulli" 
		                  style={{height:'250px', width:'170px'}}
		                />
	        		</Row>
	        		<Row className="mt-2 justify-content-center">
		        		<Form onSubmit={this.handleSubmit.bind(this)}>
						  <FormGroup>
						    <Col componentClass={ControlLabel}>
						       Title : 
						    </Col>
						    <Col >
						      <FormControl 
						      	placeholder="title" 
						      	value={this.state.title} 
						      	onChange={
						      		(e) => {
						      			this.setState({
						      				title: e.target.value
						      			})
						      		}
						      	} 
						    />
						    </Col>
						  </FormGroup>
						  <FormGroup>
						    <Col componentClass={ControlLabel}>
						       Rating : 
						    </Col>
						    <Col >
						      <FormControl
						      	type="number" 
						      	placeholder="rating" 
						      	value={this.state.rating} 
						      	onChange={
						      		(e) => {
						      			this.setState({
						      				rating: e.target.value
						      			})
						      		}
						      	} 
						    />
						    </Col>
						  </FormGroup>
						  <FormGroup style={{textAlign:'center'}}>
						      <Button bsStyle="success" type="submit">Update</Button>
						  </FormGroup>
						</Form>
					</Row>
	        		<Row>
	        		</Row>
	        		<Row>
	        		</Row>
        		</div>
        		:
        		null
        }
      </div>
    );
  }
}