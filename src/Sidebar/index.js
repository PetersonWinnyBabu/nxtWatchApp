import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import ListItem from './ListItem'

import NxtWatchContext from '../Context/NxtWatchContext'

import {StyledDiv, StyledImage, StyledPara, StyledUL} from '../styledComponents'

const categories = [
  {
    name: 'HOME',
    displayText: 'Home',
    logoitem: <AiFillHome size="30px" />,
    id: 'home',
    route: '/',
  },
  {
    name: 'TRENDING',
    displayText: 'Trending',
    logoitem: <HiFire size="30px" />,
    id: 'trending',
    route: '/trending',
  },
  {
    name: 'GAMING',
    displayText: 'Gaming',
    logoitem: <SiYoutubegaming size="30px" />,
    id: 'gaming',
    route: '/gaming',
  },
  {
    name: 'SAVEDVIDEOS',
    displayText: 'Saved Videos',
    logoitem: <MdPlaylistAdd size="30px" />,
    id: 'saved-videos',
    route: '/saved-videos',
  },
]

class Sidebar extends Component {
  render() {
    const {match} = this.props
    const {path} = match

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <StyledDiv
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="space-between"
              height="100%"
              width="200px"
              margin="0px"
              padding="0px"
              backgroundColor={darkMode ? '#181818' : '#f9f9f9'}
            >
              <StyledUL
                flexDirection="column"
                marginTop="20px"
                alignItems="flex-start"
                width="100%"
                padding="0px"
                margin="0px"
              >
                {categories.map(eachitem => (
                  <ListItem
                    key={eachitem.name}
                    isSelected={path === eachitem.route}
                    itemDetails={eachitem}
                  />
                ))}
              </StyledUL>
              <StyledDiv
                flexDirection="column"
                width="100%"
                alignItems="flex-start"
                padding="15px"
              >
                <StyledPara color={darkMode ? 'white' : 'black'}>
                  CONTACT US
                </StyledPara>
                <StyledDiv flexDirection="row" alignItems="center" width="100%">
                  <StyledImage
                    width="20%"
                    marginRight="10px"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <StyledImage
                    width="20%"
                    marginRight="10px"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <StyledImage
                    width="20%"
                    marginRight="10px"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </StyledDiv>
                <StyledPara
                  fontSize="12px"
                  color={darkMode ? 'white' : 'black'}
                >
                  Enjoy! Now to see your channels and recommendations!
                </StyledPara>
              </StyledDiv>
            </StyledDiv>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default withRouter(Sidebar)
