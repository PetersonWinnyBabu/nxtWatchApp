import {
  StyledDiv,
  StyledImage,
  StyledPara,
  StyledHeading,
} from '../styledComponents'

import NxtWatchContext from '../Context/NxtWatchContext'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value
      return (
        <StyledDiv
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100vh"
          backgroundColor={darkMode ? '#0f0f0f' : '#f9f9f9'}
        >
          <StyledImage
            width="30%"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
          />
          <StyledHeading
            fontSize="25px"
            color={darkMode ? '#f9f9f9' : '#181818'}
          >
            Page Not Found
          </StyledHeading>
          <StyledPara color={darkMode ? '#f9f9f9' : '#181818'}>
            we are sorry, the page you requested could not be found.
          </StyledPara>
        </StyledDiv>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
