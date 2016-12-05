import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Connect from '../connect/connect';
import { Link, browserHistory } from 'react-router';

function App(props) {

    return (
        <div>
            {props.children}
        </div>
    )
}

// 任何想访问context里面的属性的组件都必须显式的指定一个contextTypes 的属性，
// 如果没有指定改属性，那么组件通过 this.context 访问属性将会出错。
App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Connect(App);
