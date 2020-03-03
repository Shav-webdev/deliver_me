import React from 'react'
import { Result, Button } from 'antd'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    this.setState({
      hasError: true,
    })
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Button href="/" type="primary" key="console">
              Go Home
            </Button>
          }
        />
      )
    }

    return this.props.children
  }
}
