import React, { Component } from 'react'

interface SubHeaderType {
    className: string,
    text: string,
}

const subHeaders: SubHeaderType[] = [
    {
        className: 'title',
        text: 'Title',
    },
    {
        className: 'updatedate',
        text: 'Last Update',
    },
    {
        className: 'register',
        text: 'Register',
    },
    {
        className: 'category',
        text: 'Service',
    },
    {
        className: 'title-displayed',
        text: 'Displayed Title',
    },
]

export default class MainContainer extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="header">
                    {subHeaders.map(subHeader => <div className={subHeader.className}>{subHeader.text}</div>)}
                </div>
                <div className="body"></div>
            </div>
        )
    }
}
