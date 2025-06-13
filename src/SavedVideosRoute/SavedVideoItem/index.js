import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import {StyledDiv, StyledImage, StyledPara} from '../../styledComponents'

import NxtWatchContext from '../../Context/NxtWatchContext'

const SavedVideoItem = props => {
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
          <Link className="ItemLInk" to={`/videos/${id}`}>
            <StyledDiv
              as="li"
              flexDirection="row"
              alignItems="center"
              width="100%"
              backgroundColor="transparent"
            >
              <StyledImage
                width="30%"
                marginRight="20px"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <StyledDiv
                flexDirection="column"
                alignItems="flex-start"
                width="70%"
              >
                <StyledPara
                  fontSize="20px"
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
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default SavedVideoItem
