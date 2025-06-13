import {Link} from 'react-router-dom'

import NxtWatchContext from '../../Context/NxtWatchContext'

import {StyledDiv, StyledPara} from '../../styledComponents'

import './index.css'

const ListItem = props => {
  const {itemDetails, isSelected} = props
  const {displayText, logoitem, route} = itemDetails

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value

        return (
          <Link to={route} className="links">
            <StyledDiv
              as="li"
              width="100%"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              marginBottom="5px"
              backgroundColor={isSelected ? '#e2e8f0' : 'transparent'}
              paddingLeft="20px"
            >
              {logoitem}
              <StyledPara
                marginLeft="20px"
                color={darkMode && isSelected ? 'black' : 'white'}
                color2={darkMode && !isSelected ? 'white' : 'black'}
              >
                {displayText}
              </StyledPara>
            </StyledDiv>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default ListItem
