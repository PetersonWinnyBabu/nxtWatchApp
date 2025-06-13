import {Component} from 'react'

import Cookies from 'js-cookie'

import {SiYoutubegaming} from 'react-icons/si'

import Loader from 'react-loader-spinner'

import {
  StyledDiv,
  StyledImage,
  StyledPara,
  StyledButton,
  StyledHeading,
} from '../styledComponents'

import GamingListItem from './GamingListItem'

import Header from '../Header'

import Sidebar from '../Sidebar'

import NxtWatchContext from '../Context/NxtWatchContext'

const apiStatusVar = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {gamingList: [], apiStatus: apiStatusVar.initial}

  componentDidMount() {
    this.getGamingList()
  }

  onFailureFetch = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <StyledDiv
            width="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="transparent"
            padding="20px"
          >
            <StyledImage
              width="20%"
              src={
                darkMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt=" failure view"
            />
            <StyledHeading color={darkMode ? '#f9f9f9' : '#181818'}>
              Oops! Something Went Wrong
            </StyledHeading>
            <StyledPara
              fontSize="12px"
              color={darkMode ? '#f9f9f9' : '#181818'}
            >
              We are having some trouble completing your request.
              <br />
              Please try again.
            </StyledPara>
            <StyledButton
              padding="10px"
              backgroundColor="#3b82f6"
              color="white"
              border="none"
              onClick={this.getGamingList}
            >
              Retry
            </StyledButton>
          </StyledDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  onSuccessFetch = videos => {
    const updatedData = videos.map(eachVideo => ({
      id: eachVideo.id,
      title: eachVideo.title,
      thumbnailUrl: eachVideo.thumbnail_url,
      viewCount: eachVideo.view_count,
    }))
    this.setState({gamingList: updatedData, apiStatus: apiStatusVar.success})
  }

  getGamingList = async () => {
    this.setState({apiStatus: apiStatusVar.loading})

    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(gamingVideosApiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      this.onSuccessFetch(data.videos)
    } else {
      this.setState({apiStatus: apiStatusVar.failure})
    }
  }

  renderItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusVar.loading:
        return this.renderLoader()
      case apiStatusVar.success:
        return this.renderGamingList()
      case apiStatusVar.failure:
        return this.onFailureFetch()
      default:
        return null
    }
  }

  renderLoader = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <StyledDiv
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            data-testid="loader"
          >
            <Loader
              type="ThreeDots"
              color={darkMode ? '#f9f9f9' : '#181818'}
              height="50"
              width="50"
            />
          </StyledDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderGamingList = () => {
    const {gamingList} = this.state
    return (
      <StyledDiv
        as="ul"
        width="100%"
        height="100%"
        flexDirection="row"
        flexWrap="wrap"
        overflowY="auto"
      >
        {gamingList.map(eachItem => (
          <GamingListItem key={eachItem.id} videoItemDetails={eachItem} />
        ))}
      </StyledDiv>
    )
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <StyledDiv
              flexDirection="column"
              alignItems="center"
              width="100%"
              height="100vh"
            >
              <Header />
              <StyledDiv
                width="100%"
                height="100%"
                flexDirection="row"
                alignItems="center"
              >
                <Sidebar />
                <StyledDiv
                  backgroundColor={darkMode ? '#0f0f0f' : '#f9f9f9'}
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  height="100%"
                  border="none"
                  data-testid="gaming"
                  padding="10px"
                >
                  <StyledDiv
                    backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    padding="20px"
                    height="100px"
                  >
                    <StyledDiv
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      padding="20px"
                      marginRight="20px"
                      backgroundColor={darkMode ? '#0f0f0f' : '#f1f1f1'}
                      border="none"
                      borderRadius="40px"
                    >
                      <SiYoutubegaming size="40px" color="#ff0000" />
                    </StyledDiv>

                    <StyledHeading
                      fontSize="30px"
                      color={darkMode ? '#f9f9f9' : '#181818'}
                    >
                      Gaming
                    </StyledHeading>
                  </StyledDiv>

                  {this.renderItems()}
                </StyledDiv>
              </StyledDiv>
            </StyledDiv>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default GamingRoute
