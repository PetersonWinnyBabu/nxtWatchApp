import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import NxtWatchContext from '../Context/NxtWatchContext'

import {
  LoginButton,
  StyledInput,
  StyledCheckbox,
  StyledDiv,
  StyledBackground,
  StyledImage,
  StyledLabel,
  StyledPara,
} from '../styledComponents'

class Login extends Component {
  state = {
    showError: false,
    errorMsg: '',
    showpassword: false,
    inputUsername: '',
    inputPassword: '',
  }

  onSuccessLogin = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = error => {
    this.setState({errorMsg: error, showError: true})
  }

  onChangeInputUsername = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangeInputPassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeShowpassword = () => {
    this.setState(prevState => ({
      showpassword: !prevState.showpassword,
    }))
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {inputUsername, inputPassword} = this.state

    const loginUrl = 'https://apis.ccbp.in/login'

    const loginCredds = {
      username: inputUsername,
      password: inputPassword,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(loginCredds),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          const {
            showError,
            errorMsg,
            inputPassword,
            inputUsername,
            showpassword,
          } = this.state

          return (
            <StyledBackground
              backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
            >
              <StyledDiv
                as="form"
                width="50%"
                padding="4%"
                backgroundColor={darkMode ? '#0f0f0f' : '#f9f9f9'}
                boxShadow={darkMode ? '' : '4px 4px 8px 8px #e2e8f0'}
                borderRadius="8px"
                border="none"
                flexDirection="column"
                alignItems="center"
                onSubmit={this.onSubmitForm}
              >
                <StyledImage
                  width="40%"
                  marginBottom="16px"
                  src={
                    darkMode
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <StyledDiv
                  flexDirection="column"
                  alignItems="flex-start"
                  marginBottom="10px"
                  width="100%"
                >
                  <StyledLabel
                    color={darkMode ? '#f1f1f1' : '#181818'}
                    htmlFor="USERNAME"
                  >
                    USERNAME
                  </StyledLabel>
                  <StyledInput
                    id="USERNAME"
                    type="text"
                    placeholder="Username"
                    color={darkMode ? '#f1f1f1' : '#181818'}
                    value={inputUsername}
                    onChange={this.onChangeInputUsername}
                  />
                </StyledDiv>

                <StyledDiv
                  flexDirection="column"
                  alignItems="flex-start"
                  marginBottom="10px"
                  width="100%"
                >
                  <StyledLabel
                    color={darkMode ? '#f1f1f1' : '#181818'}
                    htmlFor="PASSWORD"
                  >
                    PASSWORD
                  </StyledLabel>
                  <StyledInput
                    id="PASSWORD"
                    type={showpassword ? 'text' : 'password'}
                    placeholder="Password"
                    color={darkMode ? '#f1f1f1' : '#181818'}
                    value={inputPassword}
                    onChange={this.onChangeInputPassword}
                  />
                </StyledDiv>
                <StyledDiv
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  width="100%"
                  padding="0px"
                  marginBottom="10px"
                >
                  <StyledCheckbox
                    type="checkbox"
                    id="showpass"
                    onChange={this.onChangeShowpassword}
                  />
                  <StyledLabel
                    color={darkMode ? '#f1f1f1' : '#181818'}
                    htmlFor="showpass"
                  >
                    Show Password
                  </StyledLabel>
                </StyledDiv>
                <LoginButton type="submit">Login</LoginButton>
                {showError && (
                  <StyledPara color="#ff0b37">{errorMsg}</StyledPara>
                )}
              </StyledDiv>
            </StyledBackground>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
