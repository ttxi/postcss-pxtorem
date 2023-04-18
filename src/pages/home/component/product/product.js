import React, { useEffect, useState } from 'react';
// import { connect, component } from 'acore';
import { Tabs, Button } from 'antd';
import classnames from 'classnames';
import styles from './product.less';
const pre = `${process.env.publicPath}theme/home/prodserver/`;
const Product = (props) => {
  const [active, setActive] = useState(data[0].tab);
  const { user, setIsShowRegisterModal } = props;
  function onChange(key) {
    setActive(key);
  }
  return (
    <div className={styles.product} id="product">
      <Tabs centered destroyInactiveTabPane={true} onChange={onChange}>
        {/*   */}
        {data.map((item, index) => {
          return (
            <Tabs.TabPane
              tab={
                <div>
                  <img
                    width={32}
                    height={32}
                    src={`${process.env.publicPath}theme/home/prodserver/${index + 1}/${item.icon}`}
                  />
                  &nbsp;
                  {item.tab}
                </div>
              }
              key={item.tab}
            >
              <div className={styles.tabcontent}>
                <div className={styles.left}>
                  <div className={styles.title}>
                    {item.title}
                    <img
                      className={styles.mh}
                      src={`${process.env.publicPath}theme/home/prodserver/mh.png`}
                      width={'113px'}
                    />
                  </div>
                  <div className={styles.desc}>{item.desc}</div>

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
                <div className={styles.right}>
                  <div className={styles.imgs}>
                    {item.imgs.map((_item, _index) => {
                      return (
                        <img
                          key={_item}
                          className={classnames({
                            [styles.book]: index == 3,
                            [styles.first]: index == 0,
                            [styles.three]: index == 2,
                          })}
                          src={`${process.env.publicPath}theme/home/prodserver/${_item}`}
                          alt=""
                          style={{
                            animationDuration: 0.1 * (_index + 1) + 's',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
export default Product;

const data = [
  {
    tab: '智能检索',
    icon: 'icon.svg',
    title: '科技资源检索与智能解读',
    desc: '帮助用户从论文、专利、学者、项目、资讯五个维度跟踪技术发展动态，快速定位关联研究成果和前沿进展。',
    imgs: ['1/big.png', '1/1.png', '1/2.png', '1/3.png'],
  },
  {
    tab: '数据分析',
    title: '科技大数据多维可视化分析',
    icon: 'icon.png',
    desc: '从技术主题、地域、机构、学者等维度以可视化图表的形式展示数据背后的规律、关系与趋势，帮助用户快速完成分解。',
    imgs: ['2/big.png', '2/1.png', '2/2.png', '2/3.png', '2/4.png'],
  },
  {
    tab: '技术分析',
    title: '技术全景分析',
    icon: 'icon.svg',
    desc: '半自动构建领域技术链接图谱，挖掘技术背后的关键技术成果、机械和学者，帮助用户从宏观层仰望穹顶。',
    imgs: ['3/big.png?v=1', '3/1.png', '3/2.png', '3/3.png', '3/4.png'],
  },
  {
    tab: '报告生成',
    title: '领域分析报告自动生成',
    icon: 'icon.svg',
    desc: '基于多维可视化分析结果，一键智能生成领域分析报告，帮助用户快速完成报告评选。',
    imgs: ['4/1.png', '4/2.png', '4/3.png'],
  },
];
