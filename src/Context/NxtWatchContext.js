import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  onchangedarkMode: () => {},
  savedVideosList: [],
  onAddVideo: () => {},
})

export default NxtWatchContext
