import React, {
  Component
} from 'react'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import './JsonEditor.css'

export default class JsonEditor extends Component {
  componentDidMount() {
    const that = this
    const options = {
      ...this.props,
      onValidationError(errors) {
        if (errors.length > 0) {
          that.props.setJsonEditorError(true)
        } else {
          that.props.setJsonEditorError(false)
        }
      },
    }
    delete options.json
    delete options.text
    this.jsoneditor = new JSONEditor(this.container, options)
    if ('json' in this.props) {
      this.jsoneditor.set(this.props.json)
    }
    if ('text' in this.props) {
      this.jsoneditor.setText(this.props.text)
    }
  }

  componentDidUpdate() {
    if ('json' in this.props) {
      this.jsoneditor.update(this.props.json)
    }
    if ('text' in this.props) {
      this.jsoneditor.updateText(this.props.text)
    }
    if ('mode' in this.props) {
      this.jsoneditor.setMode(this.props.mode)
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy()
    }
  }

  render() {
    return ( <
      div className = "jsoneditor-react-container"
      style = {
        {
          minHeight: `${this.props.mode}==='tree` ? '310px' : 'auto'
        }
      }
      ref = {
        (elem) => {
          this.container = elem
        }
      }
      />
    )
  }
}
