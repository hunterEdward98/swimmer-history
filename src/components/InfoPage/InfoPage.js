import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends React.Component {

  state = {
    // ourObj: [],
    description: '',
    image_url: '',
    swimmer: [''],
  }
  getTimesForSwimmer(event) {
    this.props.dispatch({ type: 'FETCH_TIMES', payload: event })
  }
  getAthletes = () => {
    this.props.dispatch({ type: 'FETCH_ATHLETES', })
  }
  deleteTime = (targetID) => {
    this.props.dispatch({ type: 'DELETE_TIME', payload: targetID })
  }
  deleteAthlete = () => { }
  componentDidMount() {
    this.getAthletes();
  }
  setAthlete(event) {
    this.setState({
      swimmer: [event]
    })
  }
  editTime() {
    return true;
  }
  render() {
    return (
      <div className='container'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th scope='col-10' colSpan={4}>
                <Select placeholder='SELECT SWIMMER...' options={this.props.swimmer ? this.props.swimmer.map((x, i) => { return ({ label: x.athlete_name, value: i }) }) : { label: 'hunter', value: 1 }} onChange={(event) => this.getTimesForSwimmer(event.label)}>
                </Select>
              </th>
              {this.props.user.auth_level >= 3 && <th scope='col'><button className='btn btn-danger btn-lg col-12' onClick={() => this.deleteAthlete()}>DELETE SWIMMER</button></th>}

            </tr>
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
                {this.props.user.auth_level >= 3 && <th><button className='btn btn-warning' onClick={() => this.editTime(x)}> Edit </button></th>}
                {this.props.user.auth_level >= 3 && <th><button className='btn btn-danger' onClick={() => this.deleteTime(x.id)}>Delete</button></th>}
              </tr>)}
          </tbody>
        </table>
      </div >
    )
  }

}


const mapStateToProps = (state) => {
  return {
    time: state.time,
    ourObj: state.ourObj,
    user: state.user,
    swimmer: state.athlete
  }
}

export default connect(mapStateToProps)(InfoPage);
