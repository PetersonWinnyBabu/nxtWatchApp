import {formatDistanceToNow} from 'date-fns'

import {Link} from 'react-router-dom'

import './index.css'

import {StyledDiv, StyledImage, StyledPara} from '../../styledComponents'

import NxtWatchContext from '../../Context/NxtWatchContext'

const VideoListItem = props => {
  const {videoItemDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoItemDetails
  const publishedtime = formatDistanceToNow(new Date(publishedAt))
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <Link className="videoItemlink" to={`/videos/${id}`}>
            <StyledDiv
              as="li"
              flexDirection="column"
              alignItems="center"
              width="100%"
              backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
            >
              <StyledImage
                width="100%"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <StyledDiv
                flexDirection="row"
                alignItems="flex-start"
                padding="10px"
              >
                <StyledImage
                  src={channel.profileImageUrl}
                  alt="channel logo"
                  width="40px"
                  marginRight="10px"
                  marginTop="10px"
                />
                <StyledDiv flexDirection="column" alignItems="flex-start">
                  <StyledPara
                    fontSize="16px"
                    color={darkMode ? '#f9f9f9' : '#181818'}
                  >
                    {title}
                  </StyledPara>
                  <StyledPara
                    fontSize="13px"
                    color={darkMode ? '#f9f9f9' : '#181818'}
                  >
                    {channel.name}
                  </StyledPara>
                  <StyledDiv
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    justifyContent="flex-start"
                  >
                    <StyledPara
                      fontSize="12px"
                      color={darkMode ? '#f9f9f9' : '#181818'}
                    >
                      {viewCount} views . {publishedAt}|{publishedtime}
                    </StyledPara>
                  </StyledDiv>
                </StyledDiv>
              </StyledDiv>
            </StyledDiv>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default VideoListItem
