import React, {Component} from 'react'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import './JsonEditor.css'
import isEqual from 'lodash/isEqual'

export default class JsonEditorKey extends Component {
  componentDidMount() {
    const that = this
    const options = {
      ...this.props,
      onEditable(node) {
        return false
      },
      onClassName({path}) {
        if (that.props.value.length > 0) {
          const data = JSON.parse(that.props.value)
          return isEqual(data, path) ? 'different_element' : 'the_same_element'
        }
      },
      onCreateMenu(items, node) {
        const {
          path
        } = node
        if (typeof path.slice(-1)[0] === "string") {
          const {dynamicKeys, setDynamicKeys} = that.props
          if ( dynamicKeys.length === path.length && dynamicKeys.slice(-1)[0] === path.slice(-1)[0] ) {
              setDynamicKeys([''])
            } else {
              setDynamicKeys(path)
            }
        }
        return items
      },
    }
    delete options.json
    delete options.text
    this.jsoneditor = new JSONEditor(this.container, options)
  }

  componentDidUpdate() {
    if (this.IsJsonString(this.props.text)) {
      if ('text' in this.props) {
        this.jsoneditor.setText(this.props.text)
      }
    }
    this.jsoneditor.expandAll()
    this.jsoneditor.refresh()
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy()
    }
  }

  IsJsonString(str) {
    try {
      const json = JSON.parse(str)
      return typeof json === 'object'
    } catch (e) {
      return false
    }
  }

  render() {
    return (
      <div
        id="container"
        data-testid="jsoneditor-key"
        className="jsoneditor-react-container"
        style={{
          minHeight: `${this.props.mode}==='tree` ? '310px' : 'auto',
        }}
        ref={elem => {
          this.container = elem
        }}
      />
    )
  }
}
