import React from 'react'
import ReactDOM from 'react-dom'
import PullDown from '../src'

class PullDownDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new Array(20).fill('')
    }
  }

  render() {

    return (
      <div className="container">
        <PullDown
          className="foo"
          topTip="PULL DOWN TO RELOAD"
          bottomTip="PUSH UP TO LOAD MORE"
          onPullDown={() => {
            this.reload()
          }}
          onPushUp={() => {
            this.loadMore()
          }}
        >
          <div className="contents">
          {this.state.items.map((v, i) => {
            return <div key={i} className="item"><span>{i + 1}</span></div>
          })}
          </div>
        </PullDown>
      </div>
    )

  }

  reload() {

    this.setState({
      items: new Array(20).fill('')
    })

  }

  loadMore() {

    this.setState({
      items: [ ...this.state.items, ...new Array(15).fill('') ]
    })

  }

}

ReactDOM.render(<PullDownDemo />, document.querySelector('#root'))