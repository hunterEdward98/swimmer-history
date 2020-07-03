import React from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends React.Component {


  state = {
    // ourObj: [],
    description: '',
    image_url: ''
  }

  componentDidMount() {
    this.fillShelf();
  }

  fillShelf = () => {
    // Axios.get('/api/shelf').then((response) => {
    //     console.log('this is what we get', response.data)
    //     this.setState({
    //       ourObj: response.data
    //     })

    this.props.dispatch({
      type: 'FETCH_BOOKS',

    });

  }

  addInputs = (key, event) => {
    this.setState({ [key]: event.target.value })
  }

  submitBook = () => {

    const newBook= { 
      description: this.state.description,
      image_url: this.state.image_url
    }
    // Axios.post('/api/shelf', newBook ).then((response) => {
    //   console.log('post is sent')
    // }).catch(error => console.log('unsuccessful post', error));

    this.props.dispatch({
      type: 'ADD_TO_SHELF',
      payload: newBook
    });
  }

      render() {
        return ( 
           <div>
             <input placeholder='book description' value={this.state.description} onChange={(event) => this.addInputs('description', event)}/>
             <input placeholder='image url' value={this.state.image_url} onChange= {(event) => this.addInputs('image_url', event)}/>
             <button onClick={()=>this.submitBook()}>Submit</button>
              {this.props.ourObj.map(x=><div><div>{x.description}</div><img src={x.image_url}/><button onClick={()=> this.props.dispatch({type:'DELETE_BOOK'})}>Delete</button></div>)}
           </div>
        )
      }


    const newBook = {
      description: this.state.description,
      image_url: this.state.image_url
    }
    // Axios.post('/api/shelf', newBook ).then((response) => {
    //   console.log('post is sent')
    // }).catch(error => console.log('unsuccessful post', error));

    this.props.dispatch({
      type: 'ADD_TO_SHELF',
      payload: newBook
    });
    this.setState({
      description: '',
      image_url: ''
    })
  }

  render() {
    return (
      <div>
        <input placeholder='book description' value={this.state.description} onChange={(event) => this.addInputs('description', event)} />
        <input placeholder='image url' value={this.state.image_url} onChange={(event) => this.addInputs('image_url', event)} />
        <button onClick={() => this.submitBook()}>Submit</button>
        {this.props.item?.map(x => <div><div>{x.description}</div><img src={x.image_url} /><button onClick={() => this.props.dispatch({ type: 'DELETE_BOOK', payload: x.id })}>Delete</button></div>)}
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    item: state.item
  }
}

    const mapStateToProps = (state) => {
      return {
        ourObj: state.ourObj
      }
    }

export default connect (mapStateToProps) (InfoPage);
