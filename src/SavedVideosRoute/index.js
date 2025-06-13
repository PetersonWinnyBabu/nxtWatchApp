import {Component} from 'react'

import {HiFire} from 'react-icons/hi'

import {
  StyledDiv,
  StyledImage,
  StyledPara,
  StyledHeading,
} from '../styledComponents'

import SavedVideoItem from './SavedVideoItem'

import Header from '../Header'

import Sidebar from '../Sidebar'

import NxtWatchContext from '../Context/NxtWatchContext'

class SavedVideos extends Component {
  renderEmptyListView = () => (
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
              width="40%"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              marginBottom="20px"
            />
            <StyledHeading
              color={darkMode ? '#f9f9f9' : '#181818'}
              fontSize="20px"
            >
              No Saved Videos Found
            </StyledHeading>
            <StyledPara
              fontSize="16px"
              color={darkMode ? '#f9f9f9' : '#181818'}
            >
              You can save your videos while watching them.
            </StyledPara>
          </StyledDiv>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  // renderSavedVideosList = () => {
  //   const {trendingList} = this.state
  //   return (
  //     <StyledDiv
  //       as="ul"
  //       width="100%"
  //       height="100%"
  //       flexDirection="column"
  //       overflowY="auto"
  //     >
  //       {trendingList.map(eachItem => (
  //         <TrendingListItem key={eachItem.id} videoItemDetails={eachItem} />
  //       ))}
  //     </StyledDiv>
  //   )
  // }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode, savedVideoList} = value
          const isListEmpty = savedVideoList.length === 0
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
                  data-testid="savedVideos"
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
                      Saved Videos
                    </StyledHeading>
                  </StyledDiv>

                  {isListEmpty ? (
                    this.renderEmptyListView()
                  ) : (
                    <StyledDiv
                      as="ul"
                      width="100%"
                      height="100%"
                      flexDirection="column"
                      overflowY="auto"
                    >
                      {savedVideoList.map(eachItem => (
                        <SavedVideoItem
                          key={eachItem.id}
                          videoItemDetails={eachItem}
                        />
                      ))}
                    </StyledDiv>
                  )}
                </StyledDiv>
              </StyledDiv>
            </StyledDiv>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
