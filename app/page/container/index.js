/*
 * Container，目前我也不是很理解，是否可理解为一个page？
 */
import React, { Component, PropTypes } from 'react';
import merge from 'lodash.merge';
import { render } from 'react-dom';

class Wrapper extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };
    } 

    // 这个阶段表示组件对应的 DOM 已经存在，我们可以在这个时候做一些依赖 DOM 的操作或者其他的一些如请求数据，和第三方库整合的操作
    componentDidMount() {
        
    }

    // 该方法在整个组件生命周期只会被调用一次，所以可以利用该方法做一些组件内部的初始化工作
    componentWillMount() {
        // this.loadTopNews();
    }

    // 这个时候可以根据新的属性来修改组件状态 
    componentWillReceiveProps(nextProps) {
        // this.props.toggleSpinLoading(false);
        
        return true;
    }

    loadNewsList() {

    }

    loadData() {

    }

    render() {
        return (
            <article className="cm-page">
            </article>
        )
    }
}
