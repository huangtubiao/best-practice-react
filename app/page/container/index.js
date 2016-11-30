/*
 * Container，由 React-Redux 通过 connect 方法自动生成的容器组件
 * 以下代码中的 Wrapper 就是一个 UI 组价
 */
import React, { Component, PropTypes } from 'react';
import merge from 'lodash.merge';
import { render } from 'react-dom';
import Connect from '../connect/connect';
import { GET_NEWS_LIST, GET_TOP_NEWS, GET_NEWS_DETAIL } from '../common/constants/constants';
import { LATEST_NEWS, LIKE_NEWS } from '../constants/constants';

require('./index.scss');
import Scroll from 'scroll';
import List from '../components/list/index';
import Tab from '../components/tab/index';

class Wrapper extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };
        this.firstGetAllData = false;
        this.loadTopNews = this.loadTopNews.bind(this);
        this.loadNewsList = this.loadNewsList.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadDataForScroll = this.loadDataForScroll.bind(this);
        this.getNewsDetail = this.getNewsDetail.bind(this);
    }

    // 这个阶段表示组件对应的 DOM 已经存在，我们可以在这个时候做一些依赖 DOM 的操作
    // 或者其他的一些如请求数据，和第三方库整合的操作
    componentDidMount() {

    }

    // 该方法在整个组件生命周期只会被调用一次，所以可以利用该方法做一些组件内部的初始化工作
    componentWillMount() {
        this.loadTopNews();
    }

    // 这个时候可以根据新的属性来修改组件状态
    componentWillReceiveProps(nextProps) {
        this.props.toggleSpinLoading(false);

        return true;
    }

    // 滚动条滚动加载数据
    loadDataForScroll() {
        this.loadNewsList(null);
    }

    loadTopNews() {
        var url = GET_TOP_NEWS,
            opts = {};

        // 不是理解merge的用法
        var pa = merge({}, {
            chlid: 'news_news_top',
            refer: 'mobilewwwqqcom',
            otype: 'jsonp',
            callback: 'getNewsIndexOutput',
            t: (new Date()).getTime()
        }, pa);

        var param = {
            param: pa,
            ajaxType: 'JSONP',
            onSuccess: function(res) {
                // console.log(res);
            },
            onError: function(res) {
                console.log(res);
                alert(res.errMsg || '加载新闻列表失败，请稍后重试');
            }
        };
        this.props.request(url, param, opts);
    }

    loadNewsList() {
        var props = props || this.props;

        this.loadData(LATEST_NEWS, {});
    }

    loadData(listType, pa = {}, opts = {}) {
        var _this = this;
        var url = GET_NEWS_LIST;

        var listInfoParam = this.props.news.listInfo['listLatest'],
            ids = this.props.news.ids,
            args = this.props.args;

        // 防止重复拉取
        if (listInfoParam.isLoading) {
            return;
        }

        var curPage = listInfoParam.curPage,
            page_size = listInfoParam.pageSize,
            startIndex = 0 + (curPage - 1) * page_size,
            endIndex = startIndex + page_size;

        var newIds = ids.slice(startIndex, endIndex),
            newIdArray = [];

        newIds.forEach((item, index) => {
            newIdArray.push(item.id);
        });

        var pa = merge({}, {
            cmd: GET_NEWS_LIST,
            ids: newIdArray.join(','),
            refer: "mobilewwwqqcom",
            otype: "jsonp",
            callback: "getNewsContentOnlyOutput",
            t: (new Date()).getTime(),
        }, pa);

        var param = {
            param: pa,
            ajaxType: 'JSONP',
            onSuccess: function(data) {
                // console.log(data);
            },
            onError: function(res) {
                alert(res.errMsg || '加载新闻列表失败，请稍后重试');
            }
        };

        this.props.request(url, param, opts);
    }

    getNewsDetail(newsId) {
        let url = GET_NEWS_DETAIL,
            opts = {};

        var pa = merge({}, {
            // url: item.url,
            news_id: newsId,//item.id,
            v: (new Date()).getTime(),
        }, pa);

        var param = {
            param: pa,
            ajaxType: 'POST',
            onSuccess: function(data) {
                
            },
            onError: function(res) {
                console.log("err");
            }
        };

        this.props.request(url, param, opts);
    }
 
    render() {

        let tabStyle = this.props.tabs,
            isEnd = this.props.news.listInfo['listLatest']['isEnd'],
            isLoadingShow = tabStyle === LATEST_NEWS;

        return (
            <article className="cm-page">
                <Tab tabs={this.props.tabs}
                updateActiveTab={this.props.updateActiveTab}
                />
                <div className="cm-content">
                    <Scroll 
                        wrapper={".content-wrap"}
                        ref="scroll"
                        loadDataForScroll={this.loadDataForScroll}
                    >
                        <List 
                            tabs={this.props.tabs}
                            tabsType={LATEST_NEWS}
                            news={this.props.news.listLatest}
                            listInfo={this.props.news.listInfo.listLatest}
                            args={this.props.args}
                            likeNews={this.props.likeNews}
                            getNewsDetail={this.getNewsDetail}
                            details={this.props.details}
                        />
                        <List 
                            tabs={this.props.tabs}
                            tabsType={LIKE_NEWS}
                            news={this.props.news.listLike}
                            listInfo={this.props.news.listInfo.listLike}
                            args={this.props.args}
                            dislikeNews={this.props.dislikeNews}
                            getNewsDetail={this.getNewsDetail}
                            details={this.props.details}
                        />
                    </Scroll>
                </div>
            </article>
        )
    }
}

Wrapper.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Connect(Wrapper);
