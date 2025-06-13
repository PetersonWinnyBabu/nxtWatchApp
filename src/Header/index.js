import {Link, withRouter} from 'react-router-dom'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import Cookies from 'js-cookie'

import {IoSunnyOutline, IoMoon} from 'react-icons/io5'

import {
  StyledDiv,
  StyledImage,
  StyledButton,
  StyledPara,
} from '../styledComponents'

import NxtWatchContext from '../Context/NxtWatchContext'

const Header = props => {
  const onCLickLOgout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode, onchangedarkMode} = value
        return (
          <StyledDiv
            as="nav"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            height="100px"
            width="100%"
            padding="20px"
            backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
            border="none"
          >
            <Link to="/">
              <StyledImage
                width="150px"
                marginLeft="20px"
                src={
                  darkMode
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />
            </Link>
            <StyledDiv flexDirection="row" alignItems="center" height="100%">
              <StyledButton
                border="none"
                data-testid="theme"
                onClick={onchangedarkMode}
              >
                {darkMode ? (
                  <IoSunnyOutline color="white" size="30px" />
                ) : (
                  <IoMoon width="100%" size="30px" />
                )}
              </StyledButton>

              <StyledImage
                marginLeft="20px"
                width="40px"
                height="40px"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />

              <Popup
                modal
                trigger={
                  <StyledButton
                    padding="10px"
                    border={darkMode ? '1px solid white' : '1px solid #4f46e5'}
                    color={darkMode ? 'white' : '#4f46e5'}
                    marginLeft="20px"
                    marginRight="20px"
                  >
                    Logout
                  </StyledButton>
                }
              >
                {close => (
                  <StyledDiv
                    flexDirection="column"
                    alignItems="center"
                    padding="20px"
                    margin="0px"
                    width="100%"
                    backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
                  >
                    <StyledPara color={darkMode ? '#f9f9f9' : '#181818'}>
                      Are you sure, you want to logout
                    </StyledPara>

                    <StyledDiv
                      flexDirection="row"
                      width="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      padding="20px"
                    >
                      <StyledButton
                        padding="10px"
                        border={
                          darkMode ? '1px solid white' : '1px solid #4f46e5'
                        }
                        color={darkMode ? 'white' : '#4f46e5'}
                        marginLeft="20px"
                        marginRight="20px"
                        borderRadius="8px"
                        onClick={() => close()}
                      >
                        Cancel
                      </StyledButton>
                      <StyledButton
                        padding="10px"
                        marginRight="20px"
                        marginLeft="20px"
                        color="white"
                        backgroundColor="#3b82f6"
                        borderRadius="8px"
                        border="none"
                        onClick={onCLickLOgout}
                      >
                        Confirm
                      </StyledButton>
                    </StyledDiv>
                  </StyledDiv>
                )}
              </Popup>
            </StyledDiv>
          </StyledDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
