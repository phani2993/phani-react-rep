// Write your code here\
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentItemsList: [],
    isFilterActive: false,
  }

  toggleStarButton = id => {
    this.setState(prevState => ({
      appointmentItemsList: prevState.appointmentItemsList.map(
        eachAppointment => {
          if (id === eachAppointment.id) {
            return {...eachAppointment, isStarred: !eachAppointment.isStarred}
          }
          return eachAppointment
        },
      ),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentItemsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentItemsList.filter(
        eachItem => eachItem.isStarred === true,
      )
    }
    return appointmentItemsList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''
    const newAppointment = {
      title: titleInput,
      date: formattedDate,
      isStarred: false,
      id: uuidv4(),
    }

    this.setState(prevState => ({
      appointmentItemsList: [...prevState.appointmentItemsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const filterClassName = isFilterActive ? 'filled-button' : ''
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="content-container">
            <div>
              <h1 className="mainHead">Add Appointment</h1>
              <form onSubmit={this.onAddAppointment} className="form">
                <label htmlFor="text" className="label">
                  TITLE
                </label>
                <input
                  id="text"
                  value={titleInput}
                  type="text"
                  placeholder="Title"
                  onChange={this.onChangeInput}
                  className="input"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  onChange={this.onChangeDateInput}
                  type="date"
                  id="date"
                  value={dateInput}
                  className="input"
                />

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointmentsImg"
            />
          </div>
          <hr className="hr-line" />
          <div className="box">
            <h1 className="heading2">Appointments</h1>
            <button
              className={`${filterClassName} starred-button`}
              type="button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="ul">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleStarButton={this.toggleStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
