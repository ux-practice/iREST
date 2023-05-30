import React from 'react'
import 'rapidoc'
import '../createMock/style.css'

function RapiDoc({
  style,
  data,
  renderStyle = 'read',
  showHeader = true,
  showInfo = true,
  allowAuthentication = true,
  allowAdvancedSearch = true,
  allowSpecFileLoad = true,
  allowSearch = true,
  usePathInNavBar = true,
  keyName,
  keyValue,
  keyLocation
}) {
  return (
    <rapi-doc
      data-testid="rapidocflow"
      style={style || {height: '100vh', width: '100%'}}
      ref={data}
      theme="light"
      header-color="#004F9F"
      primary-color="#004F9F"
      render-style={renderStyle || 'read'}
      show-header={showHeader || true}
      show-info={showInfo || true}
      allow-authentication={allowAuthentication || true}
      allow-advanced-search={allowAdvancedSearch || true}
      allow-spec-file-load={allowSpecFileLoad || true}
      allow-search={allowSearch || true}
      use-path-in-nav-bar={usePathInNavBar || false}
      show-method-in-nav-bar="as-colored-text"
      api-key-name={keyName}
      api-key-value={keyValue}
      api-key-location={keyLocation || ""}
    />
  )
}

export default RapiDoc
