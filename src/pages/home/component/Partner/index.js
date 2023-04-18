import React, { useEffect, useState } from 'react';
// import { connect, component } from 'acore';
import { Tabs } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const Partner = (props) => {
  const [active, setActive] = useState('1');

  return (
    <div className={styles.partner}>
      <div className={styles.wrap}>
        <div className={styles.cont}>
          <img className={styles.img} src={`${process.env.publicPath}theme/home/company.png?v=2`} />
          <img className={styles.img} src={`${process.env.publicPath}theme/home/company.png?v=2`} />
          {/* <p >1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</p> */}
          {/* <p className={styles.txt}>2.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</p> */}
        </div>
      </div>
    </div>
  );
};
export default Partner;
