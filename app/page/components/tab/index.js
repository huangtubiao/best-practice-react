import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { LATEST_NEWS, LIKE_NEWS } from '../../constants/constants';

import Touch from 'touch';
import classNames from 'classnames';
require('./index.scss');

function TabItem() {
    return (
        <li data-tab={item.label}
            key={key}
        >
            <Touch data-tab={item.label} onTap={this.switchTab}>{item.text}</Touch>
        </li>
    )
}

function TabHighlight() {
    var isActive = (props.active === LIKE_NEWS);
    return (
        <i className={classNames('icon-active', {'pull-right': isActive})}></i>
    )
}

export default class Tab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };
        this.tabs = [
            {
                label: LATEST_NEWS,
                text: '最新新闻'
            },
            {
                label: LIKE_NEWS,
                text: '我的收藏'
            }
        ];
        this.switchTab = this.switchTab.bind(this);
    }

    componentWillMount() {
        
    }

    componentDidMount() {

    }

    switchTab() {
        let tab = parseInt(e.target.dataset.tab); // ?????
        this.props.updateActiveTab(tab);
    }

    render() {
        return (
            <div id="cm-tab">
                <div className="cm-tabs">
                    <nav className="nav ui-border-1px">
                        <ul className="title-list">
                            {this.tabs.map(TabItem, this)}
                        </ul>
                        <TabHighlight active={this.props.tabs}/>
                    </nav>
                </div>
            </div>
        )
    }
}
