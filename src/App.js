import React from 'react'
import axios from 'axios'
import { Menu, Container, Header, Button, Message } from 'semantic-ui-react'
import queryString  from 'query-string'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Statistics from './components/Statistics'
import Notification from './components/Notification'
import courseService from './services/course'
import { loginWith, loginFromLocalStore, logout } from './reducers/user'
import { initializeCourse, initializeStats } from './reducers/course'
import { setLoginError, clearNotification, setNotification, notify } from './reducers/notification'
import Submissions from './components/Submissions'
import Solutions from './components/Solutions'

class App extends React.Component {
  constructor() {
    super()

    const tokenPosition = location.href.indexOf('token')
    const token = tokenPosition > 0 
      ? location.href.substring(tokenPosition + 6) 
      : null

    this.state = {
      error: null,
      token
    }
  }

  componentDidMount = async () => { 
    if (this.state.token) {
      this.props.loginWith(this.state.token)
    } else {
      this.props.loginFromLocalStore()
    }
    
    this.props.initializeCourse()
    this.props.initializeStats()
  }
  
  componentDidCatch() {
    this.setState({
      error: true,
    })
  }

  loggedIn() {
    return !(this.props.store.getState().user === null)
  }

  logout = (history) => () => {
    this.props.logout()
    history.push('/')
  }

  loggedIn() {
    return !(this.props.user === null)
  }

  handleItemClick = (history) => (e, { name }) => {
    if (name === 'submissions') {
      history.push('/submissions')
    } else {
      history.push('/')
    }

    this.setState({ activeItem: name })
  }

  render() {
    if (this.state.error) {
      return <Container style={{ margin: 10 }}>
        <Message color='red'>
          <Message.Header>
            Something bad happened
          </Message.Header>
          <p>
            raport bug in Telegram or by email mluukkai@cs.helsinki.fi
          </p>
        </Message>
      </Container>
    }

    if (this.props.course.info === null) {
      return null
    }

    const course = this.props.course.info
    const { activeItem } = this.state
    const name = this.props.user ?
      `${this.props.user.name}` :''

    return (
      <Container>
        <Route path="/" render={({ history }) => (
          <Menu>
            <Menu.Item
              name='stats'
              active={activeItem === 'stats'}
              onClick={this.handleItemClick(history)}
            >
              course stats
            </Menu.Item>

            {this.loggedIn() &&
              <Menu.Item
                name='submissions'
                active={activeItem === 'submissions'}
                onClick={this.handleItemClick(history)}
              >
                my submissions
              </Menu.Item>
            }

            {!this.loggedIn() &&
              <Menu.Item
                name='login'
              >
                <a href={`${BASEURL}/api/auth`}>login with Github</a>
              </Menu.Item>
            }

            {this.loggedIn() &&
              <Menu.Item
                name='name'
              >
                <em>
                  {name}
                </em>
              </Menu.Item>
            }

            {this.loggedIn() &&
              <Menu.Item
                name='logout'
                onClick={this.logout(history)}
              >
                logout
              </Menu.Item>
            }
          </Menu>
        )} />

        <Notification />

        <Route path="/submissions" render={({ history }) =>
          <Submissions history={history} />}
        />

        <Route exact path="/" render={() => (
          <div>
            <h2>{course.name}</h2>
            <p><a href={course.url}>course page</a></p>
            <Statistics />
          </div>
        )} />

        <Route path="/solutions/:id" render={({ match }) =>
          <Solutions id={match.params.id} />}
        />
      </Container>
    )
  }
}

const matStateToProps = (state) => { 
  return {
    course: state.course,
    user: state.user
  }

}

export default withRouter(connect(matStateToProps, { 
  initializeCourse, initializeStats, notify, loginWith, loginFromLocalStore, logout
})(App)) 