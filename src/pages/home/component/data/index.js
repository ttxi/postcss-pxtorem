import React, { useEffect, useState } from 'react';
// import { connect, component } from 'acore';
import { Tabs } from 'antd';
import styles from './index.less';
import { set } from 'lodash';

const Data = (props) => {
  const [active, setActive] = useState('1');
  const [flag, setflag] = useState(true);
  const [index, setindex] = useState(0);
  useEffect(() => {
    const element = document.querySelector('.cardWall');
    element.addEventListener('mouseover', move);
    return element.addEventListener('mouseover', move);
  });
  function move(e) {
    const classname = e.target.className.split(' ');
    if (classname.includes('card')) {
      const cards = document.querySelectorAll('.card');
      console.log(cards);
      const index = Array.from(cards).indexOf(e.target);
      setindex(index);
      // flag && setflag(false);
      // cards.forEach(card => {
      //   card.classList.remove('active');
      // });
      // e.target.classList.add('active');
    }
  }
  return (
    <div
      className={styles.data}
      style={{ backgroundImage: `url(${process.env.publicPath}theme/home/earth.png)` }}
    >
      <div className={styles.total}>
        {sunInfo.map((item) => {
          return (
            <div className={styles.item} key={item.label}>
              <div className={styles.value}>
                <span>{item.value}</span>
                {item.label}
              </div>
              <div className={styles.label}>{item.desc}</div>
            </div>
          );
        })}
      </div>

      <div className="cardWall">
        {CardInfo.map((item, _index) => {
          return (
            <div
              key={item.title}
              className={`card ${index == _index ? 'active' : ''}`}
              style={{
                // width:index==_index?'360px':'152px',
                backgroundImage: `url(${item.bg})`,
              }}
            >
              <img src={item.icon} width="32px" height="32px" />
              <div className="cardtitle">{item.title}</div>
              <div className="carddesc">{item.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Data;

const pre = `${process.env.publicPath}theme/home/`;
const CardInfo = [
  {
    title: '论文',
    desc: '2.5亿全球科研文摘数据，11亿引文数据基于科技知识图谱的细粒度研究领域标注',
    icon: pre + 'lunwen.svg',
    bg: pre + 'shujuziyuan.png',
  },
  {
    title: '专利',
    desc: '1.7亿全球专利数据，5.2亿引文数据基础于预训练模型相关论文、学者等实体',
    icon: pre + 'zhuanli.svg',
    bg: pre + 'zhuanlibg.png',
  },
  {
    title: '学者',
    desc: '1.2亿全球学者画像，全球领先的人名消歧算法，准确率超95%',
    icon: pre + 'xuezhe.svg',
    bg: pre + 'xuezhebg.png',
  },
  {
    title: '资讯',
    desc: '200万科技新闻资讯数据，实时跟进前沿科技，快速定制领域数据',
    icon: pre + 'zixun.svg',
    bg: pre + 'zixunbg.png',
  },
  {
    title: '项目',
    desc: '500万全球科研项目数据，抽取关联科研成果、学者、机构等实体',
    icon: pre + 'xiangmu.svg',
    bg: pre + 'xiangmubg.png',
  },
  {
    title: '机构',
    desc: '300万全球科研机构画像，多数据源融合获取机构全维度信息',
    icon: pre + 'jigou.svg',
    bg: pre + 'jigoubg.png',
  },
];
const sunInfo = [
  {
    value: '2.5',
    label: '亿篇',
    desc: '全球科研文摘数据',
  },

  {
    value: '1.7',
    label: '亿项',
    desc: '全球专利数据',
  },
  {
    value: '1.2',
    label: '亿位',
    desc: '全球学者画像',
  },
  {
    value: '200',
    label: '万篇',
    desc: '科技相关新闻资讯',
  },
  {
    value: '500',
    label: '万条',
    desc: '全球科研项目数据',
  },
  {
    value: '300',
    label: '万所',
    desc: '全球科研机构画像',
  },
];
