import React from 'react';
import Axios from 'axios';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends React.Component {

        state = {
          ourObj: []
        }
        
        componentDidMount(){
          this.fillShelf();
        }
  
        fillShelf = () => {
    Axios.get('/api/shelf').then((response) => {
        console.log('this is what we get', response.data)
        this.setState({
          ourObj: response.data
        })

        });
  }

      render() {
        return ( 
           <div>
              {this.state.ourObj.map(x=><div><div>{x.description}</div><img src={x.image_url}/></div>)}
           </div>
        )
      }

    }

export default InfoPage;
