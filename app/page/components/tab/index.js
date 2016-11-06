/*
 * Component，tab 组件
 */
import React, { Component, PropTypes } from 'react';
import { ALL_ANCHOR, MY_FOLLOW } from '../../constants/constants';

// import Touch from 'touch';
import classNames from 'classnames';
require('./index.scss');

function TabItem(item, key) {
    return (
        <li data-tab={item.label} key={key}>
            {item.text}
        </li>
    )
}

function TabHighlight(props) {
    var isActive = (props.active === MY_FOLLOW);
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
                label: ALL_ANCHOR,
                text: '全部主播'
            },
            {
                label: MY_FOLLOW,
                text: '我的关注'
            }
        ];
        this.switchTab = this.switchTab.bind(this);
    }

    componentWillMount() {
        
    }

    componentDidMount() {

    }

    switchTab() {
        let tab = parseInt(e.target.dataset.tab);
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
