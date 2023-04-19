export const isObject = (value) => value !== null && typeof value === 'object';

export const isFunction = (value) => typeof value === 'function';

export const isString = (value) => typeof value === 'string';
export const isBoolean = (value) => typeof value === 'boolean';
export const isNumber = (value) => typeof value === 'number';
export const isUndef = (value) => typeof value === 'undefined';

export const scrollIntoView = (domID, options) => {
  const anchorElement = document.getElementById(domID);
  if (anchorElement) {
    anchorElement.scrollIntoView(options);
  }
};

const getQueryByType = (path, query) => {
  const queries = path.replace('?', '').split('&');
  let value = '';
  queries.map((item) => {
    const curItem = item.split('=');
    if (curItem[0] == query) {
      value = curItem[1];
      return curItem[1];
    }
  });
  return value;
};
const isChina = (s) => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  if (reg.test(s)) {
    return true;
  }
  return false;
};

const showDataByQuery = (zh, en) => {
  const query = localStorage.getItem('analysis_currsearches') || '';
  return isChina(query) ? zh || en : en || zh;
};

const scrollIntoTop = () => {
  document.getElementById('root').scrollIntoView();
};
const typeList = {
  paper: 'paper',
  patent: 'patent',
  news: 'news',
  fund: 'fund',
  expert: 'expert',
  org: 'org',
};

const typeList_zh = {
  paper: '论文',
  patent: '专利',
  news: '资讯',
  fund: '项目',
  expert: '学者',
  org: '机构',
};

export { getQueryByType, scrollIntoTop, showDataByQuery, typeList, typeList_zh };

// 跳转文献列表页
export const onDocumentDetail = (obj, type) => {
  const entries = Object.entries(obj);
  const [key, value] = entries[0];
  if (key === 'searches') {
    localStorage.setItem('documentListSearches', encodeURIComponent(encodeURIComponent(value)));
  }
  const objArr = entries.slice(1);
  const query = objArr
    .map(([key1, value1]) => `${key1}=${encodeURIComponent(encodeURIComponent(value1))}`)
    .join('&');
  window.open(
    `documentList/${type}/${key}/${
      key === 'searches' ? 'documentListSearches' : encodeURIComponent(encodeURIComponent(value))
    }?${query}`,
  );
};

// 跳转机构详情页
export const onOrgDetail = (obj, type = typeList.paper) => {
  const entries = Object.entries(obj);
  const query = entries.map(([key, value]) => `${key}=${value}`).join('&');
  window.open(`organization?types=${type}&${query}`);
};

// 跳转学者详情页
export const onExpertDetail = (id) => {
  window.open(`https://www.aminer.cn/profile/-/${id}`);
  // window.open(`detail/profile/${id}`);
};

// 跳转论文详情页
export const onPubDetail = (id) => {
  window.open(`detail/pub/${id}`);
};

// 跳转专利详情页
export const onPatentDetail = (id) => {
  window.open(`detail/patent/${id}`);
};
