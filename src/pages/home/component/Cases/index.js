import React, { useEffect, useState } from 'react';
// import { connect, component } from 'acore';
import styles from './index.less';

const Cases = (props) => {
  return (
    <div className={styles.cases}>
      {dataInfo.map((item) => {
        return (
          <div key={item.title} className={styles.block}>
            <div className={styles.header}>
              <img src={`${process.env.publicPath}sys/home/cases/5.zhuangshi.svg`} />
              {item.title}
            </div>
            <div className={styles.info}>
              <img src={`${process.env.publicPath}sys/home/cases/${item.img}.png`} />
              <div className={styles.desc}>{item.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Cases;

const dataInfo = [
  // { title: '中国科技部', desc: '为科技部第六次全国技术预见、2020人工智能战略发展报告等提供数据分析报告，为美国新兴技术出口管制、十大高精尖产业、芯片等“卡脖子”技术形成多项政策建议。', img: '5.zhongguokejibu' },
  {
    title: '中国科技部',
    desc: '支撑区域科技创新评估，为2020人工智能战略发展报告等提供数据分析报告，为美国新兴技术出口管制、十大高精尖产业、芯片等“卡脖子”技术形成多项政策建议。',
    img: '5.zhongguokejibu',
  },
  {
    title: '美的集团',
    desc: '为美的集团构建技术分析平台，为美的集团研发人员提供科技查新、技术分析服务，大大提升科技管理及研发人员技术情报分析效率。',
    img: '5.meidijituan',
  },
  {
    title: '中国工程院',
    desc: '为中国工程院构建技术洞察与趋势分析支撑系统，服务于工程院高端智库，支撑多项院士咨询课题相关分析报告，应用于水利、医药等多个行业进行科技情报分析。',
    img: '5.zhongguogongchengyuan',
  },
];
