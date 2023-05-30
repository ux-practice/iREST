import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../../../../src/static/components/common/nav';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import {Router} from 'react-router-dom'
import history from '../../../../src/static/history/createBrowserHistory'

describe('Nav Component Test Cases', () => {
    const props = {
        handleClearUser: jest.fn(),
        link:"/dashboard",
        pageTitle: "iRest"
    }
    test('click on logout button only once', async () => {
        render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const button = screen.getByText(/Logout/i)
        await fireEvent.click(button)  
    });
    test('page title to be present', async () => {
        render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const pageTitle = screen.getByText(/iRest/i)
        expect(pageTitle).toBeInTheDocument()
    })
    test('profile-dot icon of user should be present in Nav component', () => {
        const {container} = render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const element = container.getElementsByClassName('profile-dot');  
        expect(element).toBeTruthy();
    })
    test('fixed-top elment should be present in Nav component', () => {
        localStorage.setItem('name', 'firstname lastname')
        const {container} = render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const element = container.getElementsByClassName('fixed-top');  
        expect(element).toBeTruthy();
    })
    test('Dashboard keyword should be present in Nav component', () => {
        render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const dashboard = screen.queryAllByText('Dashboard') 
        expect(dashboard).toHaveLength(1);
    })
    test('Dashboard keyword should be present in Nav component', () => {
        render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const ProjectList = screen.queryAllByText('Project List') 
        expect(ProjectList).toHaveLength(1);
    })
    test('logo icon should be present in Nav component', () => {
        render(<Router history={history}><Nav {...props} /></Router>);
        const logo = screen.getByAltText("header_sample_logo_icon") 
        expect(logo).toBeInTheDocument();
    })
    test('click on sidebar button only once', async () => {
        render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        const button = screen.getByAltText(/sample_menu/i) 
        await fireEvent.click(button)  
    });
    test('click on sidebar body only once', async () => {
        render(
            <Router history={history}>
                <Nav {...props} />
            </Router>);
        await fireEvent.click(document.body)  
    });
});