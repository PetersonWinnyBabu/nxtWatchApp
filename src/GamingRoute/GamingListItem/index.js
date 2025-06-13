import {Link} from 'react-router-dom'

import {StyledDiv, StyledImage, StyledPara} from '../../styledComponents'

import './index.css'

import NxtWatchContext from '../../Context/NxtWatchContext'

const GamingListItem = props => {
  const {videoItemDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoItemDetails

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        return (
          <Link className="gamingItemLInk" to={`/videos/${id}`}>
            <StyledDiv
              as="li"
              flexDirection="column"
              alignItems="center"
              width="100%"
              backgroundColor="transparent"
              marginRight="10px"
              marginBottom="10px"
            >
              <StyledImage
                width="100%"
                height="250px"
                src={thumbnailUrl}
                alt="video thumbnail"
                border="none"
                borderRadius="10px"
              />
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
                {viewCount} Watching Worldwide
              </StyledPara>
            </StyledDiv>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default GamingListItem
