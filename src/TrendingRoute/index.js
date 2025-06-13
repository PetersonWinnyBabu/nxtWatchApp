import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import {
  StyledDiv,
  StyledImage,
  StyledPara,
  StyledButton,
  StyledHeading,
} from '../styledComponents'

import TrendingListItem from './TrendingListItem'

import Header from '../Header'

import Sidebar from '../Sidebar'

import NxtWatchContext from '../Context/NxtWatchContext'

const apiStatusVar = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {trendingList: [], apiStatus: apiStatusVar.initial}

  componentDidMount() {
    this.getTrendingList()
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
              onClick={this.getTrendingList}
            >
              Retry
            </StyledButton>
          </StyledDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  getchannelDetails = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  onSuccessFetch = videos => {
    const updatedData = videos.map(eachVideo => ({
      id: eachVideo.id,
      title: eachVideo.title,
      thumbnailUrl: eachVideo.thumbnail_url,
      viewCount: eachVideo.view_count,
      publishedAt: eachVideo.published_at,
      channel: this.getchannelDetails(eachVideo.channel),
    }))
    this.setState({trendingList: updatedData, apiStatus: apiStatusVar.success})
  }

  getTrendingList = async () => {
    this.setState({apiStatus: apiStatusVar.loading})

    const trendingVideosApiUrl = ` https://apis.ccbp.in/videos/trending`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(trendingVideosApiUrl, options)
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
        return this.renderTrendingList()
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

  renderTrendingList = () => {
    const {trendingList} = this.state
    return (
      <StyledDiv
        as="ul"
        width="100%"
        height="100%"
        flexDirection="column"
        overflowY="auto"
      >
        {trendingList.map(eachItem => (
          <TrendingListItem key={eachItem.id} videoItemDetails={eachItem} />
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
                  data-testid="trending"
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
                      <HiFire size="40px" color="#ff0000" />
                    </StyledDiv>

                    <StyledHeading
                      fontSize="30px"
                      color={darkMode ? '#f9f9f9' : '#181818'}
                    >
                      Trending
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

export default TrendingRoute
