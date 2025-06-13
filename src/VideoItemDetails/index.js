import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Sidebar from '../Sidebar'

import {
  StyledDiv,
  StyledImage,
  StyledPara,
  StyledButton,
  StyledHeading,
} from '../styledComponents'

import NxtWatchContext from '../Context/NxtWatchContext'

const apiStatusVar = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetail: {},
    apiStatus: apiStatusVar.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  onClickLike = () => {
    const {isDisliked} = this.state
    if (isDisliked) {
      this.setState({isDisliked: false, isLiked: true})
    } else {
      this.setState(prevState => ({isLiked: !prevState.isLiked}))
    }
  }

  onClickDisLike = () => {
    const {isLiked} = this.state
    if (isLiked) {
      this.setState({isLiked: false, isDisliked: true})
    } else {
      this.setState(prevState => ({isDisliked: !prevState.isDisliked}))
    }
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

  renderDetailsView = () => {
    const {videoItemDetail, isLiked, isDisliked} = this.state
    const {
      id,
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoItemDetail
    const {name, profileImageUrl, subscriberCount} = channel

    const publishedtime = formatDistanceToNow(new Date(publishedAt))

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode, onAddVideo, savedVideoList} = value
          const saveVideotoLIst = () => {
            onAddVideo(videoItemDetail)
          }
          let isSaved = false

          const savedItem = savedVideoList.find(eachitem => eachitem.id === id)
          if (savedItem === undefined) {
            isSaved = false
          } else {
            isSaved = true
          }

          console.log(savedVideoList)
          console.log(isSaved)

          return (
            <StyledDiv
              width="100%"
              flexDirection="column"
              alignItems="flex-start"
              backgroundColor="transparent"
              padding="20px"
            >
              <StyledDiv border="1px solid" marginBottom="20px">
                <ReactPlayer url={videoUrl} controls />
              </StyledDiv>
              <StyledPara
                fontSize="20px"
                color={darkMode ? '#f9f9f9' : '#181818'}
              >
                {title}
              </StyledPara>
              <StyledDiv
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <StyledDiv flexDirection="row" alignItems="center">
                  <StyledPara color={darkMode ? '#f9f9f9' : '#181818'}>
                    {viewCount} views . {publishedAt} | {publishedtime}
                  </StyledPara>
                </StyledDiv>
                <StyledDiv>
                  <StyledButton
                    border="none"
                    marginRight="20px"
                    color={isLiked ? '#2563eb' : '#64748b'}
                    onClick={this.onClickLike}
                  >
                    <AiOutlineLike size="20px" />
                    Like
                  </StyledButton>
                  <StyledButton
                    border="none"
                    marginRight="20px"
                    color={isDisliked ? '#2563eb' : '#64748b'}
                    onClick={this.onClickDisLike}
                  >
                    <AiOutlineDislike size="20px" />
                    Dislike
                  </StyledButton>
                  <StyledButton
                    border="none"
                    marginRight="20px"
                    color={isSaved ? '#2563eb' : '#64748b'}
                    onClick={saveVideotoLIst}
                  >
                    <MdPlaylistAdd />
                    {isSaved ? 'Saved' : 'Save'}
                  </StyledButton>
                </StyledDiv>
              </StyledDiv>
              <StyledDiv
                as="hr"
                color={darkMode ? '#f9f9f9' : '#181818'}
                width="100%"
                marginBottom="10px"
              />
              <StyledDiv
                flexDirection="row"
                alignItems="flex-start"
                padding="20px"
              >
                <StyledImage
                  width="60px"
                  marginRight="20px"
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <StyledDiv
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  color={darkMode ? '#f9f9f9' : '#181818'}
                >
                  <StyledPara
                    fontSize="20px"
                    color={darkMode ? '#f9f9f9' : '#181818'}
                  >
                    {name}
                  </StyledPara>
                  <StyledPara
                    fontSize="14px"
                    color={darkMode ? '#f9f9f9' : '#181818'}
                  >
                    {subscriberCount} subscribers
                  </StyledPara>
                  <StyledPara
                    fontSize="16px"
                    color={darkMode ? '#f9f9f9' : '#181818'}
                  >
                    {description}
                  </StyledPara>
                </StyledDiv>
              </StyledDiv>
            </StyledDiv>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  getchannelDetails = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
    subscriberCount: channel.subscriber_count,
  })

  onSuccessFetch = videoDetails => {
    const updatedVideoDetails = {
      id: videoDetails.id,
      title: videoDetails.title,
      videoUrl: videoDetails.video_url,
      thumbnailUrl: videoDetails.thumbnail_url,
      viewCount: videoDetails.view_count,
      description: videoDetails.description,
      publishedAt: videoDetails.published_at,
      channel: this.getchannelDetails(videoDetails.channel),
    }
    this.setState({
      videoItemDetail: updatedVideoDetails,
      apiStatus: apiStatusVar.success,
    })
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusVar.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const videoDetailsApiUrl = ` https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(videoDetailsApiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      this.onSuccessFetch(data.video_details)
    } else {
      this.setState({apiStatus: apiStatusVar.failure})
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

  renderItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusVar.loading:
        return this.renderLoader()
      case apiStatusVar.success:
        return this.renderDetailsView()
      case apiStatusVar.failure:
        return this.onFailureFetch()
      default:
        return null
    }
  }

  render() {
    const {videoItemDetail} = this.state
    console.log(videoItemDetail)
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
                  padding="10px"
                  data-testid="videoItemDetails"
                >
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

export default VideoItemDetails
