/*
 * Middleware，中间件，用于 Reducer 在异步操作结束后自动执行。
 * http://www.tuicool.com/articles/eIvmiqM
 */

// ajax 
import net from '../../../js/common/net';
import merge from 'lodash.merge';
import CGI_PATH from '../constants/cgiPath';

// 传递了store、next、action这三个参数。返回的是next。
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
