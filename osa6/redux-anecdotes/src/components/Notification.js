import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationToShow = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>{notificationToShow !== '' &&
      <div style={style}>
        {notificationToShow}
      </div>
    }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification