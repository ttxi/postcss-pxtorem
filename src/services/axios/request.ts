import axios from 'axios';
import { cloneDeep } from 'lodash';
import pathToRegexp from 'path-to-regexp';
// import { nextAPIURL } from './consts/api';
import { escapeURLBracket, unescapeURLBracket } from './strings';

// TODO retrieve final buildings.

const printNEXTAPIDebugLog = (data) => {
  let reason = null;
  if (data.errs && data.errs.length > 0) {
    for (const err of data.errs) {
      console.error('NEXT_API_ERROR: ', err.Error);
      if (err.Details) {
        for (const msg of err.Details) {
          // return reason
          if (!reason) {
            const match = msg.match(/panic:(.*)/);
            reason = match && match.length > 0 && match[1];
          }
        }
      }
    }
  }
  return reason;
};

const fetch = (options) => {
  let { data = {}, /* fetchType, */ url } = options;
  const {
    method = options.method || 'get',
    body, // This is a fix.
  } = options;

  // backward-compatibility: translate body back into data:
  if (body) {
    try {
      if (typeof body === 'string') {
        data = JSON.parse(body);
      } else {
        data = body;
      }
    } catch (err) {}
  }
  const cloneData = cloneDeep(data);

  try {
    let domain = '';
    let escapedUrl = escapeURLBracket(url);
    if (escapedUrl.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domain = escapedUrl.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      escapedUrl = escapedUrl.slice(domain.length);
    }
    const match = pathToRegexp.parse(escapedUrl);
    escapedUrl = pathToRegexp.compile(escapedUrl)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + unescapeURLBracket(escapedUrl);
  } catch (e) {
    throw e.message;
    // message.error(e.message);
  }

  // process headers
  const headers = {};
  if (options && options.specialContentType) {
    headers.Accept = 'application/json';
    // headers.append('Content-Type', 'text/plain');
  } else if (options && (options.data || options.body)) {
    // Fix a bug
    if (options.method && options.method !== 'FETCH') {
      headers.Accept = 'application/json';
      headers['Content-Type'] = 'application/json';
    }
  }

  const token = options && options.token;
  // const temp_token = options && options.temp_token;
  // const user_data = options && options.user_data;
  // const mcc_language = options && options.mcc_language;
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByZXNzQHRzaW5naHVhLmNvbSIsImV4cCI6MzIwOTYwMDExNywiaWF0IjoxNjMyODAwMTE3LCJuYmYiOjE0NDQ0Nzg0MDAsInJvbGVzIjpbImV4cGVydGJhc2UiXSwic3JjIjoiYW1pbmVyIiwidWlkIjoiNjE1MTI3NTMxZTQ0NWIyZjZlZDczY2VmIn0.iAjmwQHIcKIyleaDN8vEiQvxMFc9xVMn_YlROEDTfzA';
  if (token) {
    headers.Authorization = `${token}`;
  }
  // if (temp_token) {
  //   headers.temp_token = `${temp_token}`;
  // }
  // if (user_data) {
  //   headers.user_data = `${encodeURI(user_data)}`;
  // }
  // if (mcc_language) {
  //   headers.mcc_language = `${mcc_language}`;
  // }
  // enable debug in next api.
  if (process.env.NODE_ENV !== 'production' && options.nextapi) {
    headers.debug = 1;
  }
  // TODO temp: test something:
  // if (options.nextapi) {
  // const text = JSON.stringify(cloneData);
  // const key = '==typeof o?(r=o,o={}):o=o||{}:(r=o,o=a||{},a=void 0))';
  // const ciphertext = AES.encrypt(text, key);
  //
  //
  // }

  let result;
  switch (method.toLowerCase()) {
    case 'get':
      result = axios.get(encodeURI(url), { params: cloneData, headers });
      break;
    case 'delete':
      result = axios.delete(url, { data: cloneData, headers });
      break;
    case 'post':
      result = axios.post(url, cloneData, { headers });
      break;
    case 'put':
      result = axios.put(url, cloneData, { headers });
      break;
    case 'patch':
      result = axios.patch(url, cloneData, { headers });
      break;
    default:
      result = axios(options);
  }
  return result;
};

export default function request(url, options1) {
  // 为了兼容之前的调用方法。
  const options = options1 || {};
  options.method = options.method || 'get';
  if (url) {
    options.url = url;
  }
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`;
    if (window.location.origin !== origin) {
      options.fetchType = 'CORS';
    }
  }

  return fetch(options)
    .then((response) => {
      //
      const { statusText, status } = response;
      const data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;

      const result = {
        success: true,
        status: statusText,
        message: statusText,
        statusCode: status,
        data, // ...data // whitch to use?
      };
      // 接口调用情况
      // if (process.env.NODE_ENV !== 'production') {
      //   const output = [options.method, options.url];
      //   output.push('\n>');
      //   output.push(result);
      //   console.log('❯❯ Response:', ...output);
      // }

      let success = true;
      const errors = [];
      if (data?.code == 403) {
        success = false;
        errors.push(data.message);
        console.error('API Error: ', '用户没有登录');
        window?.top?.postMessage(
          `userNotLogin?intelligenceUrl=${window.location.pathname?.replace('/media', '')}`,
          // 'https://cocreatinguat.midea.com',
          `https://${window.location.host}`,
        );
      } else if (options.nextapi && data && data.data && data.data.length > 0) {
        for (const d of data.data) {
          // Print API Warn message.
          if (process.env.NODE_ENV !== 'production') {
            if (d.warn) {
              console.warn('API Warning:', d.warn);
            }
          }

          // On Error
          if (!d.succeed) {
            success = false;
            errors.push(d.err_message);
            // 报错机制
            console.error('API Error: ', d.error, d);
          }
        }

        if (data.data.length === 1) {
          result.data = data.data[0];
        } else if (data.data.length > 1) {
          // return as result.
        }
      }
      // 报错
      if (!success) {
        return Promise.reject({
          success: false,
          statusCode: 500,
          message: errors.join('\n'),
        });
      }
      return Promise.resolve(result);
    })
    .catch((error) => {
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;

        const reason = printNEXTAPIDebugLog(data);
        if (reason) {
          msg = `${msg}: ${reason}`;
        }
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }
      return Promise.reject({ success: false, statusCode, message: msg });
    });
}

/**
 * Requests a URL, returning a promise.
 * Request Format：
 * {
 *  "method" :"search",
 *  "parameters":{"a":"c"},
 *  "schema":{"a":"c"}
 *  }
 */
// TODO Support Multiple queries.
export async function nextAPI(payload) {
  if (!payload) {
  }
  const { method, type = 'magic', baseAPI, ...options } = payload;
  options.method = method || 'post';
  options.nextapi = true;
  const apiurl = baseAPI || 'https://zhiyin_beta_api.aminer.cn';
  const url = `${apiurl}/${type}?a=${actionNameString(options.data)}`;
  const result = request(url, options);
  return result;
}

// prepare displaynames;
function actionNameString(requestData) {
  // const actions = options.data && options.data.map(query => `${query.action}+${query.eventName}`);
  const actions = [];
  if (requestData) {
    let i = 0;
    for (const query of requestData) {
      query.eventName = query.eventName || '';
      if (i === 0) {
        // actions.push(`${query.action}...${query.eventName}......`);
        if (requestData.length > 1) {
          actions.push(`[${requestData.length}]`);
        }
        actions.push(`${query.eventName}__${query.action}___`);
      }
      delete query.eventName;
      i += 1;
    }
  }
  return actions && actions.join('');
}
