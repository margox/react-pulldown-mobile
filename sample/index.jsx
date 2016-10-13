import React from 'react'
import ReactDOM from 'react-dom'
import PullDown from '../src'

class PullDownDemo extends React.Component {

  render() {

    return (
      <div className="container">
        <PullDown
          className="foo"
          topTip="pull down to reload"
          bottomTip="push up to load more"
          onPullDown={() => {
            console.log('pull down')
          }}
          onPullCancel={() => {
            console.log('pull cancel')
          }}
          onPullMove={(v) => {
            console.log('pull move')
          }}
          onPushUp={() => {
            console.log('push up')
          }}
          onPushCancel={() => {
            console.log('push cancel')
          }}
          onPushMove={(v) => {
            console.log('push move')
          }}
        >
          <div className="contents">
          {new Array(30).fill('').map((v, i) => {
            return <div key={i} className="item"></div>
          })}
          </div>
        </PullDown>
      </div>
    )

  }

}

ReactDOM.render(<PullDownDemo />, document.querySelector('#root'))