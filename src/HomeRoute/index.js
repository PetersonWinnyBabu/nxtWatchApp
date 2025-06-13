import {Component} from 'react'
import Cookies from 'js-cookie'

import {IoIosSearch, IoMdClose} from 'react-icons/io'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Sidebar from '../Sidebar'

import VideoListItem from './VideoListItem'

import {
  StyledDiv,
  StyledImage,
  StyledPara,
  StyledButton,
  StyledSearchInput,
  StyledHeading,
} from '../styledComponents'

import NxtWatchContext from '../Context/NxtWatchContext'

const apiStatusVar = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    showBanner: true,
    inputSearch: '',
    listOfItems: [],
    apiStatus: apiStatusVar.initial,
  }

  componentDidMount = () => {
    this.getItemsList()
  }

  getchannelDetails = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

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
              onClick={this.getItemsList}
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
      publishedAt: eachVideo.published_at,
      channel: this.getchannelDetails(eachVideo.channel),
    }))
    this.setState({listOfItems: updatedData, apiStatus: apiStatusVar.success})
  }

  getItemsList = async () => {
    this.setState({apiStatus: apiStatusVar.loading})
    const {inputSearch} = this.state

    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${inputSearch}`

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(homeVideosApiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      this.onSuccessFetch(data.videos)
    } else {
      this.setState({apiStatus: apiStatusVar.failure})
    }
  }

  onCLickclose = () => {
    this.setState({showBanner: false})
  }

  onChangeInputSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  onClickSearchButton = () => {
    this.getItemsList()
  }

  renderItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusVar.loading:
        return this.renderLoader()
      case apiStatusVar.success:
        return this.renderLIstofItems()
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

  renderBanner = () => (
    <StyledDiv
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="20px"
      backgroundImage="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
      width="100%"
      height="200px"
      marginBottom="20px"
      data-testid="banner"
    >
      <StyledDiv flexDirection="column" alignItems="flex-start" width="300px">
        <StyledImage
          width="150px"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <StyledPara>Buy Nxt Watch Premium prepaid plans with UPI</StyledPara>
        <StyledButton padding="10px" border="1px solid #00306e" color="#00306e">
          GET IT NOW
        </StyledButton>
      </StyledDiv>
      <StyledDiv
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
      >
        <StyledButton
          padding="5px"
          border="none"
          data-testid="close"
          onClick={this.onCLickclose}
        >
          <IoMdClose size="20px" />
        </StyledButton>
      </StyledDiv>
    </StyledDiv>
  )

  renderLIstEEmptyView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <StyledDiv
            width="100%"
            height="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <StyledImage
              width="20%"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <StyledHeading
              color={darkMode ? '#f9f9f9' : '#181818'}
              fontSize="20px"
            >
              No Search results found
            </StyledHeading>
            <StyledPara
              fontSize="16px"
              color={darkMode ? '#f9f9f9' : '#181818'}
            >
              Try different key words or remove search filter
            </StyledPara>
          </StyledDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderItemList = () => {
    const {listOfItems} = this.state
    return (
      <StyledDiv
        as="ul"
        width="100%"
        flexDirection="row"
        flexWrap="wrap"
        overflowY="auto"
      >
        {listOfItems.map(eachItem => (
          <VideoListItem key={eachItem.id} videoItemDetails={eachItem} />
        ))}
      </StyledDiv>
    )
  }

  renderLIstofItems = () => {
    const {listOfItems} = this.state
    const isListEmpty = listOfItems.length === 0
    if (isListEmpty) {
      return this.renderLIstEEmptyView()
    }
    return this.renderItemList()
  }

  render() {
    const {showBanner, inputSearch} = this.state

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
                  backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  height="100%"
                  border="none"
                  data-testid="home"
                  padding="10px"
                >
                  {showBanner && this.renderBanner()}
                  <StyledDiv
                    flexDirection="row"
                    alignItems="center"
                    width="40%"
                    padding="0px"
                    paddingLeft="20px"
                  >
                    <StyledSearchInput
                      type="search"
                      placeholder="Search"
                      color={darkMode ? '#f9f9f9' : '#181818'}
                      value={inputSearch}
                      onChange={this.onChangeInputSearch}
                    />
                    <StyledButton
                      padding="5px"
                      border="none"
                      data-testid="searchButton"
                      type="button"
                      onClick={this.onClickSearchButton}
                    >
                      <IoIosSearch
                        size="30px"
                        color={darkMode ? '#f9f9f9' : '#181818'}
                      />
                    </StyledButton>
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

export default HomeRoute
