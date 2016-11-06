/*
 * Connect，用于 UI 组件生成容器组件。意思就是将这两种组件连起来
 */
import { connect } from 'react-redux'
import { getArgs, updateActiveTab, toggleListLoading, toggleSpinLoading, likeNews, 
        dislikeNews } from '../actions/actions';


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        args: state.args,
        tabs: state.tabs,
        news: state.news
    };
}

// Map Redux actions to component props
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
