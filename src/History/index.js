import {Component} from 'react'
import HistoryItem from '../HistoryItem'
import './index.css'

class History extends Component {
  state = {
    searchInput: '',
    historyList: [],
  }

  componentDidMount() {
    const {initialHistoryList} = this.props
    this.setState({historyList: initialHistoryList})
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  filterHistoryList = () => {
    const {searchInput, historyList} = this.state
    const updatedHistoryList = historyList.filter(eachHistory =>
      eachHistory.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return updatedHistoryList
  }

  onDeleteHistory = id => {
    const {historyList} = this.state
    const updatedHistoryList = historyList.filter(
      eachHistory => eachHistory.id !== id,
    )
    this.setState({historyList: updatedHistoryList})
  }

  render() {
    const {searchInput} = this.state
    const filteredHistoryList = this.filterHistoryList()

    return (
      <div className="browser-history-bg-container">
        <div className="header-container">
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
              alt="app logo"
            />
            <div className="search-bar-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                  alt="search"
                />
              </div>
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search history"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
          </div>
        </div>

        {filteredHistoryList.length === 0 ? (
          <p className="no-history">There is no history to show</p>
        ) : (
          <ul className="history-container">
            {filteredHistoryList.map(eachHistory => (
              <HistoryItem
                key={eachHistory.id}
                eachHistoryDetails={eachHistory}
                onDeleteHistory={this.onDeleteHistory}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default History
