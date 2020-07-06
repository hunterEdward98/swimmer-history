import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

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
  getTimesForSwimmer(SwimmerName) {
    this.props.dispatch({ type: 'FETCH_TIMES', payload: SwimmerName })
  }

  render() {
    this.getTimesForSwimmer('hunter')
    return (
      <div className='container'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th scope='col'>Event</th>
              <th scope='col'>Time</th>
              <th scope='col'>Date</th>
              {this.props.user.auth_level >= 3 && <th>Edit</th>}
              {this.props.user.auth_level >= 3 && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.time.map(x =>
              <tr>
                <th scope='col'>{x.event_name}</th>
                <th scope='col'>{x.swim_time}</th>
                <th scope='col'>{moment(x.date).format('MMMM Do YYYY')}</th>
                {this.props.user.auth_level >= 3 && <th><button className='btn btn-warning'> Edit </button></th>}
                {this.props.user.auth_level >= 3 && <th><button className='btn btn-danger'>Delete</button></th>}
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    time: state.time,
    ourObj: state.ourObj,
    user: state.user
  }
}

export default connect(mapStateToProps)(InfoPage);
