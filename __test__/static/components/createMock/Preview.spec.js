import React from 'react';
import { render, screen, getByText, waitFor, fireEvent } from '@testing-library/react';
import Preview from '../../../../src/static/components/createMock/Preview';
import '@testing-library/jest-dom/extend-expect';
import {props} from './PreviewProps'

describe('Preview', () => {
beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
    });
    test('find mockPreview to be text as mock api', async () => {
        render(<Preview {...props} />);
        await waitFor(() => expect(screen.findByText(/mockPreview/i)).toBeTruthy())
    })
    test('renders react component', async () => {
        const {container} = render(<Preview {...props} />);
        const element = container.getElementsByClassName('rapidoc-close-btn');  
        expect(element).toBeTruthy();
    });
    test('preview close icon should be present', () => {
        render(<Preview {...props} />);
        const logo = screen.getByAltText(/preview_close_button/i) 
        expect(logo).toBeTruthy();
    })
    test('close preview modal', async() => {
        render(<Preview {...props} />);
        const logo = screen.getByAltText(/preview_close_button/i) 
        await fireEvent.click(logo) 
    })
    test('close modal on hide when press esc key', async () => {
        const component = render(<Preview {...props} />);       
        await fireEvent.keyDown(screen.getByTestId('previewmodal'), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        })
    })
});
