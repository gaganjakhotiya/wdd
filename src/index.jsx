import React from 'react'
import ReactDOM from 'react-dom'


const widgetMap = {}
const requireContext = require.context('../', true, /\.widget.jsx$/)
const modulesPathList = requireContext.keys()
const widgetNameRegex = /[a-z-A-Z]+(?=\.widget\.jsx$)/
for (const path of modulesPathList) {
    widgetMap[widgetNameRegex.exec(path)[0]] = requireContext(path)
}


export function getLazyComponent(widgetName, defaultProps, loader = 'loading...') {
    if (!widgetMap[widgetName])
        throw 'WidgetNotFound: Provided widget name does not exist.'

    return (
        class LoaderWrapper extends React.Component {
            static defaultProps = defaultProps

            constructor(props) {
                super(props)
                this.state = {
                    ComponentClass: null
                }
            }

            componentDidMount() {
                widgetMap[widgetName](
                    ComponentModule => !this._calledComponentWillUnmount && this.setState({
                        ComponentClass: ComponentModule.default || ComponentModule
                    })
                )
            }

            render() {
                const { ComponentClass } = this.state

                return ComponentClass
                    ? React.createElement(ComponentClass, this.props)
                    : loader
            }
        }
    )
}


export function renderWidget(domSelector, widgetName, props) {
    ReactDOM.render(
        React.createElement(getLazyComponent(widgetName, props)),
        document.querySelector(domSelector)
    )
}


window.renderWidget = renderWidget
