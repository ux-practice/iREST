import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import CopyUrl from '../../../../src/static/components/common/copyUrl'

describe('testing CopyUrl Component', () => {
  test('Should render the CopyUrl with GET method', async () => {
    const textBody = 'hi iam text in the copy url ! nice to meet you in person !'
    const method = 'GET'
    const serviceResponseType = 'default'
    render(
      <CopyUrl textBody={textBody} method={method} serviceResponseType={serviceResponseType} />
    )

    expect(screen.getByRole('link')).toBeTruthy()
    expect(screen.getByText(/hi iam text in the copy url ! nice .../)).toBeTruthy()
    const image = screen.getByTestId('copyImage')
    fireEvent.click(image)
    fireEvent.mouseLeave(image)
    const copyText = await screen.findByText('Copied')
    expect(copyText).toBeTruthy()
  })

  test('Should render the CopyUrl with POST method ', () => {
    const textBody = 'text_body'
    const method = 'POST'
    const serviceResponseType = 'save'
    render(
      <CopyUrl textBody={textBody} method={method} serviceResponseType={serviceResponseType} />
    )

    expect(screen.queryByRole('link')).toBeFalsy()
    expect(screen.getByText('text_body')).toBeTruthy()
  })
})
