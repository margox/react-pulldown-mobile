## React-pulldown-mobile
一个简单的React下拉/上推组件

### 示例

```javascript
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
```

该示例已经包含在git项目中，要亲自感受，可以clone此项目，然后在项目目录执行以下命令

```
npm i && npm run sample && open http://localhost:5998
```

### 组件属性
| 属性名                | 类型          | 说明    |
| ---------------------- | ------------- | :----- |
| container | String | 下拉容器的querySelector选择器字符串，默认是当前父元素 |
| id | String | 会作为id属性附加到组件的DOM元素上 |
| className | String | 会作为class属性附加到组件的DOM元素上，可用于自定义组件的样式 |
| topTip| String | 下拉露出的顶部区域的提示文字 |
| bottomTip| String | 上推露出的底部区域的提示文字 |
| threshold | Number | 下拉/上推完成阈值，默认是200 |
| sensitivity | Number | 下拉/上推灵敏度，请传入0.1-1的数字，默认是0.4 |
| enablePull | Boolean | 开启下拉功能，默认true |
| enablePush | Boolean | 开启上推功能，默认true | 
| onPullCancel | Function | 取消下拉后执行的回调函数 |
| onPullDown | Function | 达到下拉阈值后执行的回调函数 |
| onPullMove | Function | 下拉过程中指定的回调函数，可以从参数获取到位移、阈值、灵敏度 |
| onPushCancel | Function | 取消上推后执行的回调函数 |
| onPushUp | Function | 达到上推阈值后执行的回调函数 |
| onPushMove | Function | 上推过程中指定的回调函数，可以从参数获取到位移、阈值、灵敏度 |