// Write your code
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarButton} = props
  const {title, date, id, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStarButton(id)
  }

  return (
    <li className="list-item">
      <div className="box">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickStar}
          testid="star"
        >
          <img src={starImgUrl} className="star-image" alt="star" />
        </button>
      </div>
      <p className="li-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
