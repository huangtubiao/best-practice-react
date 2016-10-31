import { Provider, connect } from 'react-redux'
import Counter from '../components/counter/index'

function mapStateToProps(state) {
    return {
        value: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

// Action Creator
const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)
