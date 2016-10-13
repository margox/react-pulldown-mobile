'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PullDown = function (_React$Component) {
  _inherits(PullDown, _React$Component);

  function PullDown(props) {
    _classCallCheck(this, PullDown);

    var _this = _possibleConstructorReturn(this, (PullDown.__proto__ || Object.getPrototypeOf(PullDown)).call(this, props));

    _this.state = {
      offset: 0,
      pulling: false
    };

    _this.__container = null;
    _this.__self = null;
    _this.__lastPageY = 0;
    _this.__threshold = 0;

    return _this;
  }

  _createClass(PullDown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.__container = document.querySelector(this.props.container) || this.refs.content.parentNode;
      this.__self = this.refs.content;
      this.__threshold = this.props.threshold || 200;
      this.__sensitivity = this.props.sensitivity || .4;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          ref: 'content',
          id: this.props.id || 'react-pulldown',
          className: 'react-pulldown ' + this.props.class,
          onTouchStart: function onTouchStart(e) {
            return _this2.handleTouchStart(e);
          },
          onTouchMove: function onTouchMove(e) {
            return _this2.handleTouchMove(e);
          },
          onTouchEnd: function onTouchEnd(e) {
            return _this2.handleTouchEnd(e);
          },
          style: {
            minHeight: this.props.minHeight || '100%',
            WebkitTransition: this.state.pulling ? 'none' : 'transform .3s',
            WebkitTransform: 'translateZ(0) translateY(' + this.state.offset / (1 / this.__sensitivity) + 'px)',
            transition: this.state.pulling ? 'none' : 'transform .3s',
            transform: 'translateZ(0)  translateY(' + this.state.offset / (1 / this.__sensitivity) + 'px)'
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'react-pulldown-tip' },
          this.props.tip
        ),
        this.props.children
      );
    }
  }, {
    key: 'handlePullCancel',
    value: function handlePullCancel() {

      typeof this.props.onPullCancel === 'function' && this.props.onPullCancel();
    }
  }, {
    key: 'handlePullDown',
    value: function handlePullDown() {

      typeof this.props.onPullDown === 'function' && this.props.onPullDown();
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {

      var containerHeight = this.__container.getBoundingClientRect().height;
      var contentHeight = this.__self.getBoundingClientRect().height;
      var scrollTop = this.__container.scrollTop;
      var scrollBottom = contentHeight - containerHeight - scrollTop;
      console.log(scrollBottom);
      if (scrollTop > 0 || scrollBottom > 0) {
        return;
      }

      this.__lastPageY = e.touches[0].pageY;
      this.setState({
        pulling: true
      });
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {

      var containerHeight = this.__container.getBoundingClientRect().height;
      var contentHeight = this.__self.getBoundingClientRect().height;
      var scrollTop = this.__container.scrollTop;
      var scrollBottom = contentHeight - containerHeight - scrollTop;

      if (scrollTop > 0 || scrollBottom > 0) {
        return;
      }

      console.log(this.state.offset);

      if (this.state.offset < this.__threshold) {
        this.handlePullCancel();
      } else {
        this.handlePullDown();
      }

      this.setState({
        pulling: false,
        offset: 0
      });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {

      var containerHeight = this.__container.getBoundingClientRect().height;
      var contentHeight = this.__self.getBoundingClientRect().height;
      var scrollTop = this.__container.scrollTop;
      var scrollBottom = contentHeight - containerHeight - scrollTop;

      if (scrollTop > 0 || scrollBottom > 0) {
        return;
      }

      var offset = e.touches[0].pageY - this.__lastPageY;
      offset < 0 && (offset = 0);
      offset > this.__threshold && (offset = this.__threshold);
      offset > 0 && e.preventDefault();

      typeof this.props.onPullMove === 'function' && this.props.onPullMove(offset, this.__threshold, this.__sensitivity);

      this.setState({ offset: offset });
    }
  }]);

  return PullDown;
}(_react2.default.Component);

exports.default = PullDown;
//# sourceMappingURL=index.js.map