import React from 'react'
import './index.css'

class PullDown extends React.Component{

  constructor(props) {

    super(props)
    this.state = {
      offset: 0,
      pulling: false
    }

    this.__container = null
    this.__eventType = null
    this.__self = null
    this.__lastPageY = 0
    this.__threshold = 0

  }

  componentDidMount() {

    this.__container = document.querySelector(this.props.container) || this.refs.content.parentNode
    this.__self = this.refs.content
    this.__threshold = this.props.threshold || 200
    this.__sensitivity = this.props.sensitivity || .4
    this.__enablePull = typeof this.props.enablePull === 'boolean' ? this.props.enablePull : true
    this.__enablePush = typeof this.props.enablePush === 'boolean' ? this.props.enablePush : true

  }

  render() {

    let className = this.props.className || this.props.class

    return (
      <div
        ref="content"
        id={this.props.id || 'react-pulldown'}
        className={'react-pulldown ' + className}
        onTouchStart={(e) => this.handleTouchStart(e)}
        onTouchMove={(e) => this.handleTouchMove(e)}
        onTouchEnd={(e) => this.handleTouchEnd(e)}
        style={{
          minHeight: this.props.minHeight || '100%', 
          WebkitTransition: this.state.pulling ? 'none' : 'transform .3s',
          WebkitTransform: 'translateZ(0) translateY(' + this.state.offset / (1 / this.__sensitivity) + 'px)',
          transition: this.state.pulling ? 'none' : 'transform .3s',
          transform: 'translateZ(0)  translateY(' + this.state.offset / (1 / this.__sensitivity) + 'px)'
        }}
        >
          <div className="react-pulldown-background-layer">
            <div className="react-pulldown-top-tip">{this.props.topTip || this.props.tip}</div>
            <div className="react-pulldown-bottom-tip">{this.props.bottomTip}</div>
          </div>
          {this.props.children}
        </div>
    )

  }

  handlePullCancel() {

    typeof this.props.onPullCancel === 'function' && this.props.onPullCancel()

  }

  handlePullDown() {

    typeof this.props.onPullDown === 'function' && this.props.onPullDown()

  }

  handlePushCancel() {

    typeof this.props.onPushCancel === 'function' && this.props.onPushCancel()

  }

  handlePushUp() {

    typeof this.props.onPushUp === 'function' && this.props.onPushUp()

  }

  handleTouchStart(e) {

    let containerHeight = this.__container.getBoundingClientRect().height
    let contentHeight = this.__self.getBoundingClientRect().height
    let scrollTop = this.__container.scrollTop
    let scrollBottom = contentHeight - containerHeight - scrollTop

    if ((scrollTop <= 0 || scrollBottom <= 0) && (this.__enablePull || this.__enablePush)) {

      this.__lastPageY = e.touches[0].pageY
      this.setState({
        pulling: true
      })

    }

  }

  handleTouchEnd() {

    let containerHeight = this.__container.getBoundingClientRect().height
    let contentHeight = this.__self.getBoundingClientRect().height
    let scrollTop = this.__container.scrollTop
    let scrollBottom = contentHeight - containerHeight - scrollTop

    if (scrollTop <= 0 || scrollBottom <= 0) {

      if (Math.abs(this.state.offset) < this.__threshold) {

        if (this.state.offset < 0) {
          this.handlePushCancel()
        } else if(this.state.offset > 0) {
          this.handlePullCancel()
        } else {

          if (this.__eventType === 'pull') {
            this.handlePullCancel()
          } else if (this.__eventType === 'push') {
            this.handlePushCancel()
          }

        }

      } else {

        if (this.state.offset < 0) {
          this.handlePushUp()
        } else {
          this.handlePullDown()
        }

      }

      this.__eventType = null

      this.setState({
        pulling: false,
        offset: 0
      })

    }

  }

  handleTouchMove(e) {

    let containerHeight = this.__container.getBoundingClientRect().height
    let contentHeight = this.__self.getBoundingClientRect().height
    let scrollTop = this.__container.scrollTop
    let scrollBottom = contentHeight - containerHeight - scrollTop

    if (scrollTop <= 0 && this.__enablePull) {

      let offset = e.touches[0].pageY - this.__lastPageY
      offset < 0 && (offset = 0)
      offset > this.__threshold && (offset = this.__threshold)
      offset > 0 &&  e.preventDefault()

      this.__eventType = 'pull'

      typeof this.props.onPullMove === 'function' && this.props.onPullMove({
        offset: offset,
        threshold: this.__threshold,
        sensitivity: this.__sensitivity
      })

      this.setState({ offset })

    } else if (scrollBottom <= 0 && this.__enablePush) {

      let offset = e.touches[0].pageY - this.__lastPageY
      offset > 0 && (offset = 0)
      offset < this.__threshold * -1 && (offset = this.__threshold * -1)
      offset < 0 &&  e.preventDefault()

      this.__eventType = 'push'

      typeof this.props.onPushMove === 'function' && this.props.onPushMove({
        offset: offset,
        threshold: this.__threshold,
        sensitivity: this.__sensitivity
      })

      this.setState({ offset })

    }

  }

}

export default PullDown