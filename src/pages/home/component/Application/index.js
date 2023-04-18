import React, { useEffect, useState } from 'react';
// import { connect, component } from 'acore';
import styles from './index.less';
import style from '../../index.less';
import classnames from 'classnames';
import { Button } from 'antd';
import { ZYIcon } from '@/utils/iconfont';
// import { hierarchy } from 'helper/hierarchy';
// import { select } from 'redux-saga/effects';
const pre = process.env.publicPath;
const imgPre = process.env.publicPath + 'theme/home/';

const Application = (props) => {
  const { LegendInfo, user, setIsShowRegisterModal } = props;
  const [selectTab, setselectTab] = useState(0);

  return (
    <div
      className={classnames(style.application, style.advBlock)}
      style={{
        backgroundImage: `url(${imgPre}application/${selectTab + 1}.png?v=2)`,
      }}
    >
      <div className={style.centerContent}>
        <div className={style.legend}>
          <span className={style.title}>{LegendInfo.application.title}</span>
          <span className={style.desc}>{LegendInfo.application.desc}</span>
        </div>
        <div className={style.content}>
          <div className={styles.application}>
            <ul
              className={styles.sider}
              style={{
                backgroundImage: `url(${pre}theme/home/navbg.png)`,
              }}
            >
              {dataInfo.map((item, index) => {
                return (
                  <li
                    className={classnames({
                      [styles.selected]: index == selectTab,
                    })}
                    onClick={() => {
                      setselectTab(index);
                    }}
                    key={index}
                  >
                    <ZYIcon
                      type={item.icon}
                      style={{
                        width: '20px',
                        height: '20px',
                        color:
                          index == selectTab ? 'rgba(255, 255, 255, 0.90)' : 'rgba(78, 89, 105, 1)',
                      }}
                    />
                    &nbsp;
                    {item.title} <div style={{ flex: 1 }}></div>
                    <ZYIcon
                      type="icon-xianxingxiangyoujiantou"
                      style={{
                        float: 'right',
                        height: '21px',
                        color: `${
                          index == selectTab
                            ? 'rgba(255, 255, 255, 0.60)'
                            : 'rgba(78, 89, 105, 0.60)'
                        }`,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
            {dataInfo.map((item, index) => {
              return (
                <div
                  className={styles.content}
                  key={index}
                  style={{ display: `${index == selectTab ? 'flex' : 'none'}` }}
                >
                  {item.children.map((_item, _index) => {
                    return (
                      <div className={styles.stand} key={_index}>
                        <div className={styles.namelogo}>
                          {_index == 0 ? (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'rgba(99, 104, 112, 0.5)',
                                lineHeight: '24px',
                              }}
                            >
                              <ZYIcon
                                type={_item.icon}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  color: '#000',
                                }}
                              />
                              &nbsp; &nbsp;{_item.label}
                            </div>
                          ) : (
                            <img
                              height={'40px'}
                              style={{
                                height: '40px',
                                transform: 'tras',
                              }}
                              src={`${process.env.publicPath}theme/home/${_item.logo}`}
                            ></img>
                          )}
                        </div>
                        <div className={styles.title}>{_item.title}</div>
                        <div className={styles.desc}>{_item.desc}</div>
                      </div>
                    );
                  })}

                  <div className={styles.button}>
                    <Button
                      ghost
                      type="primary"
                      size="large"
                      onClick={() => {
                        if (!user) {
                          setIsShowRegisterModal(true);
                        } else {
                          window.location.href = '/analysis/workplace';
                        }
                      }}
                    >
                      {!user ? '免费试用' : '立即体验'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;

const dataInfo = [
  {
    title: '政府',
    img: '4.zhengfu',
    icon: 'icon-zhengfu',
    children: [
      {
        label: 'Government solutions',
        icon: 'icon-zhengfu',
        title: '政府应用场景',
        desc: '提供全方位的识别、遴选和规划前瞻性技术的解决方案，辅助科技管理部门准确高效的完成技术领域调研、科技发展规划、产业布局和科技创新战略制定等工作。',
      },
      {
        logo: 'cpctect.png',
        title: '科技规划',
        // desc: '为科技部第六次全国技术预见、2020人工智能战略发展报告等提供数据分析报告，为美国新兴技术出口管制、十大高精尖产业、芯片等“卡脖子”技术形成多项政策建议。',
        desc: '支撑区域科技创新评估，为2020人工智能战略发展报告等提供数据分析报告，为美国新兴技术出口管制、十大高精尖产业、芯片等“卡脖子”技术形成多项政策建议。',
      },
    ],
  },
  {
    title: '企业',
    img: '4.qiye',
    icon: 'icon-qiye',
    children: [
      {
        label: 'Enterprise solutions',
        icon: 'icon-qiye',
        title: '企业应用场景',
        desc: '对企业关注的技术领域做技术图谱构建、技术跟踪和技术全景分析，帮助企业在产业技术结构调整、行业关键趋势预判和企业战略规划决策等方面占领先机。',
      },
      {
        logo: 'midea.png',
        title: '竞争情报',
        desc: '为美的集团构建技术分析平台，为美的集团研发人员提供科技查新、技术分析服务，大大提升科技管理及研发人员技术情报分析效率。',
      },
    ],
  },
  {
    title: '科研机构',
    img: '4.keyanjigou',
    icon: 'icon-keyan',
    logo: 'cae.png',
    children: [
      {
        label: 'RO solutions',
        icon: 'icon-keyan',
        title: '科研机构应用场景',
        desc: '评估与挖掘领域前沿关键情报，辅助科研人员全方位了解全球科技发展趋势，把握创新方向，降低风险，为研究人员科研选题和寻找创新突破点提供有效支撑。',
      },
      {
        logo: 'cae.png',
        title: '技术洞察',
        desc: '为中国工程院构建技术洞察与趋势分析支撑系统，服务于工程院高端智库，支撑多项院士咨询课题相关分析报告，应用于水利、医药等多个行业进行科技情报分析。',
      },
    ],
  },
];
