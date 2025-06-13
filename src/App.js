import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import NxtWatchContext from './Context/NxtWatchContext'

import ProtectedRoute from './ProtectedRoute'

import Login from './LoginRoute'

import HomeRoute from './HomeRoute'

import TrendingRoute from './TrendingRoute'

import GamingRoute from './GamingRoute'

import SavedVideos from './SavedVideosRoute'

import NotFound from './NotFound'

import VideoItemDetails from './VideoItemDetails'

import './App.css'

// Replace your code here
class App extends Component {
  state = {darkMode: false, savedVideoList: []}

  onchangedarkMode = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  onAddVideo = videoItemDetails => {
    const {savedVideoList} = this.state

    const savedItem = savedVideoList.find(
      eachitem => eachitem.id === videoItemDetails.id,
    )

    if (savedItem === undefined) {
      this.setState(prevState => ({
        savedVideoList: [...prevState.savedVideoList, videoItemDetails],
      }))
    } else {
      const updatedList = savedVideoList.filter(
        eachitem => eachitem.id !== videoItemDetails.id,
      )
      this.setState({savedVideoList: updatedList})
    }
  }

  render() {
    const {darkMode, savedVideoList} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          darkMode,
          onchangedarkMode: this.onchangedarkMode,
          savedVideoList,
          onAddVideo: this.onAddVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
