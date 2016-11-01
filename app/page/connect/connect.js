import { Provider, connect } from 'react-redux'
import Counter from '../components/counter/index'
import { increase, dcrement } from '../actions/actions'

// Action Creator
const increaseAction = increase('减1')
const DcrementAction = dcrement('加1')

function mapStateToProps(state) {
    return {
        value: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: function() {
            dispatch(increaseAction);
        },
        onDcrementClick: function() {
            dispatch(DcrementAction);
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)
