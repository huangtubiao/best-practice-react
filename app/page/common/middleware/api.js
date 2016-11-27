/*
 * Middleware，中间件，用于 Reducer 在异步操作结束后自动执行。
 * http://www.tuicool.com/articles/eIvmiqM
 */

// ajax 
import net from '../../../js/common/net';
import merge from 'lodash.merge';
import CGI_PATH from '../constants/cgiPath';

// 传递了store、next、action这三个参数。返回的是next。
// 为什么要传递三个参数？
// 对于store 因为我们要用store的dispatch和getState两个方法；
// 因为中间件是要多个首尾相连的，对next进行一层层的“加工”，所以next必须独立一层；
// action的话，是因为我们封装了这么多层，其实就是为了作出更高级的dispatch方法，但是在高级也是dispatch，是dispatch就得接受action这个参数。
export default store => next => action => {

    let API_OPT = action['API'];

    if (!API_OPT) {
        return next(action);
    }

    let ACTION_TYPE = action['type'];
    let { cgiName, params, opts = {} } = API_OPT;
    let { localData } = opts;

    let { onSuccess, onError, ajaxType = 'GET', param } = params;

    // 触发下一个action
    let nextAction = function(type, param, opts) {
        action['type'] = type;
        action['opts'] = opts;
        delete param['onSuccess'];
        delete param['onError'];
        const nextRequestAction = merge({}, action, param);
        return nextRequestAction;
    };

    params.data = null;
    // 触发正在请求的action
    let result = next(nextAction(cgiName + '_ON', params, opts));

    net.ajax({
        url: CGI_PATH[cgiName],
        type: ajaxType,
        param,
        localData,
        success: data => {
            onSuccess && onSuccess(data);
            params.data = data;
            //  触发请求成功的action
            return next(nextAction(cgiName + '_SUCCESS', params, opts));
        },
        error: data => {
            
            onError && onError(data);
            //  触发请求失败的action
            return next(nextAction(cgiName + '_ERROR', params, opts));
        }
    });

    return result;
};
