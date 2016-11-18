/*
 * React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）
 * Connect，用于 UI 组件生成容器组件。意思就是将这两种组件连起来
 * 在 container 目录下调用
 */
import { connect } from 'react-redux'
import { getArgs, updateActiveTab, toggleListLoading, toggleSpinLoading, likeNews,
        dislikeNews } from '../actions/actions';


// Map Redux state to component props
// 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
function mapStateToProps(state) {
    return {
        args: state.args,
        tabs: state.tabs,
        news: state.news
    };
}

// Map Redux actions to component props
// 用来建立 UI 组件的参数到store.dispatch方法的映射
function mapDispatchToProps(dispatch) {
    return {
        getArgs: (value) => dispatch(getArgs(value)),
        updateActiveTab: (value) => dispatch(updateActiveTab(value)),
        likeNews: (value) => dispatch(likeNews(value)),
        dislikeNews: (value) => dispatch(dislikeNews(value))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
);
