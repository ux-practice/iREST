import React from 'react'
import Clipboard from 'react-clipboard.js'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import CopyToClipboard from 'react-copy-to-clipboard'
import './copyUrl.css'
import clipboard from '../../assets/images/iRest_files/clipboard.svg'

class CopyUrl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.getText = this.getText.bind(this)
  }

  getTruncateUrl(str, num) {
    if (str.length > num) {
      const subStr = str.substring(0, num)
      return `${subStr}...`
    }
    return str
  }

  getText() {
    return this.props.textBody
  }

  renderTooltip = props => <Tooltip {...props}>Copied</Tooltip>

  render() {
    return (
      <Clipboard component="span" option-text={this.getText}>
        <CopyToClipboard text={this.props.textBody}>
          <span className="d-flex">
            {this.props.method === 'GET' && this.props.serviceResponseType === 'default' ? (
              <a
                href={this.props.textBody}
                className="copy-endpoint"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="p-r-5 no_wrap_list_url copy-url">
                  {this.getTruncateUrl(this.props.textBody, 35)}
                </span>
              </a>
            ) : (
              <span className="p-r-5 no_wrap_list_url copy-url">
                {this.getTruncateUrl(this.props.textBody, 35)}
              </span>
            )}

            <div className="copyImage">
              <OverlayTrigger placement="top" overlay={this.renderTooltip} show={this.state.show}>
                <span
                  data-testid="copyImage"
                  onClick={() => {
                    this.setState({show: true})
                  }}
                  onMouseLeave={() => this.setState({show: false})}
                >
                  <img src={clipboard} alt="clipboard" />
                </span>
              </OverlayTrigger>
            </div>
          </span>
        </CopyToClipboard>
      </Clipboard>
    )
  }
}

export default CopyUrl
