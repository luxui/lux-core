
/**
 * Admin UI as a Siren hypermedia client.
 * v0.3.0
 * Repository URL: https://github.com/luxui/core-lux.git
 */

var rHTTPStatuses=/^[1-5]\d\d/;var SIREN='application/vnd.siren+json';function responseModelFormat(response){var error=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;return{data:error?{error:error,response:response.data}:response.data,error:!!error,status:response.status||0}}function responseModelHandler(){var response=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var status=response.status;if(!rHTTPStatuses.test(status)){var error=new Error('Invalid HTTP status code: '+status+'.');return responseModelFormat(response,error)}var statusClass=+(''+status)[0];switch(statusClass){case 5:return responseModelFormat(response,new Error('Received '+status+'.'));case 4:return responseModelFormat(response,new Error('Received '+status+'.'));case 2:if(response.headers.get('content-type')!==SIREN){var type=response.headers.get('content-type');var _error2=new Error('Invalid content-type, '+type+', returned.');return responseModelFormat(response,_error2)}return responseModelFormat(response);default:var _error=new Error('Unexpected HTTP status code: '+status+'.');return responseModelFormat(response,_error);}}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function storage(key,value){var config=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};if(!key){var errorMessage='No "key" provided to storage().';throw new Error(errorMessage,'luxui/lib/storage.js')}var _prefix$store$config=_extends({prefix:'luxui--',store:window.localStorage},config),prefix=_prefix$store$config.prefix,store=_prefix$store$config.store;var reset=key.reset;if(reset){store.removeItem(''+prefix+reset);}else if(value){store.setItem(''+prefix+key,value);}return store.getItem(''+prefix+key)}

function apiRequest(){var URI=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'/';var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};options.method=(options.method||'GET').toUpperCase();var authToken=storage('authToken');if(options.body){options.body=JSON.stringify(options.body);}if(!options.headers){options.headers={};}if(authToken){options.headers.authorization=authToken;}return fetch(URI,options).then(retryFactory(URI,options)).then(function(response){return response.json()}).then(responseModelHandler)}function retryFactory(URI,options){function retry(resp){if(resp&&+resp.status===403&&options.headers.authorization){delete options.headers.authorization;return fetch(URI,options).then(function(response){storage({reset:'authToken'});return response})}return resp}return retry}

function hasAll(prop,search,obj){return search.every(function(term){return hasOne(prop,term,obj)})}function hasAny(prop,search,obj){return search.some(function(term){return hasOne(prop,term,obj)})}function hasOne(prop,search,obj){return obj[prop]&&obj[prop].indexOf(search)>-1}

var isType=function isType(type,q){return'[object '+type+']'==={}.toString.call(q)};var isArray=function isArray(q){return isType('Array',q)};var isFunction=function isFunction(q){return isType('Function',q)};var isRegExp=function isRegExp(q){return isType('RegExp',q)};var isNull=function isNull(q){return q===null||q===undefined};var isObject=function isObject(q){return isType('Object',q)};var isString=function isString(q){return isType('String',q)};

function queryToObject(search){return search?search.split('&').reduce(queryToObjectReduce,{}):{}}function queryToObjectReduce(acc,p){var _p$split=p.split('='),_p$split2=slicedToArray(_p$split,2),key=_p$split2[0],val=_p$split2[1];acc[key]=/,/.test(val)?val.split(',').map(toValue):toValue(val);return acc}function toValue(valueInQuestion){switch(true){case valueInQuestion==='false':return false;case valueInQuestion==='true':return true;default:return valueInQuestion;}}function urlParse(url){var firstGroup=function firstGroup(result){return result&&result[1]?result[1]:''};var str=''+url;var auth=firstGroup(str.match(/\/\/([^@]*?)@/));var hash=firstGroup(str.match(/(#.*)?$/));var protocol=firstGroup(str.match(/^([^:]+:)/));var hostAndPath=str.replace(RegExp('^'+protocol+'//'+auth+(auth?'@':'')),'').replace(hash,'');var host=firstGroup(hostAndPath.match(/(.*?)(?:[?/#]|$)/));var path=hostAndPath.replace(host,'');var _path$split=path.split('?'),_path$split2=slicedToArray(_path$split,2),pathname=_path$split2[0],_path$split2$=_path$split2[1],query=_path$split2$===undefined?'':_path$split2$;var _host$split=host.split(':'),_host$split2=slicedToArray(_host$split,2),hostname=_host$split2[0],_host$split2$=_host$split2[1],port=_host$split2$===undefined?'':_host$split2$;var param=queryToObject(query);return{auth:auth,hash:hash,host:host,hostname:hostname,param:param,path:path,pathname:pathname,port:port,protocol:protocol,query:query,search:query?'?'+query:''}}

function luxPath(loc){var url=urlParse(''+loc);var path=url.pathname.replace(/\/+$/,'');return''+path+url.search}

var cache={};var errorHandler=null;var routes=[];function errorString(str){return str+' provided to routing API.'}function lookup(path){if(!cache[path]){var found=routes.filter(function(_ref){var _ref2=slicedToArray(_ref,2),_=_ref2[0],matcherFn=_ref2[1];return matcherFn(path)})[0];cache[path]=found?found.pop():errorHandler;}return cache[path]}function register(matcher,handler){if(!handler||!isFunction(handler)){throw new Error(errorString('No "handler" function'))}if(!(isString(matcher)||isRegExp(matcher)||isFunction(matcher))){var type=typeof matcher==='undefined'?'undefined':_typeof(matcher);throw new Error(errorString('Invalid "PathMatcher" type ('+type+')'))}if(matcher==='/error'){cache['/error']=errorHandler=handler;return}var found=routes.filter(function(_ref3){var _ref4=slicedToArray(_ref3,1),m=_ref4[0];return m===matcher.toString()})[0];if(found){throw new Error('Routing API already has a handler registerd for PathMatcher: '+matcher.toString()+'.')}else if(isString(matcher)){routes.push([matcher.toString(),function(path){return matcher===path},handler]);}else if(isRegExp(matcher)){routes.push([matcher.toString(),function(path){return matcher.test(path)},handler]);}else{routes.push([matcher.toString(),matcher,handler]);}}function routing(matcher,handler){if(!matcher){throw new Error(errorString('No "PathMatcher" function'))}switch(arguments.length){case 1:return lookup(matcher);case 2:return register(matcher,handler);default:throw new Error('Too many arguments provided to routing API.');}}

export { apiRequest, luxPath, responseModelHandler as responseModel, responseModelFormat, routing, storage, hasAll, hasAny, hasOne, isArray, isFunction, isNull, isObject, isRegExp, isString };
