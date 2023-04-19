import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import classnames from 'classnames';
import { Product, DataComponent, Application, Cases, Partner } from './component/index.js';
// import Register from 'components/aminer/user/RegisterUnited';
// import LoginModal from 'components/aminer/user/LoginUnited';
// import Footer from '../component/footer2';
// import Header from '../component/header';
import styles from './index.less';
const imgPre = process.env.publicPath + 'theme/home/';
const Home = (props) => {
  const { user } = props;
  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
  const [isShowLoginModalBusiness, setIsShowLoginModalBusiness] = useState(false);

  return (
    <div className={styles.home}>
      {/* {isShowRegisterModal && (
              <Register
                isShowRegisterModal={isShowRegisterModal}
                setIsShowRegisterModal={setIsShowRegisterModal}
                setIsShowLoginModalBusiness={setIsShowLoginModalBusiness}
              />
            )} */}
      {/* <Header type={1}/> */}
      <div
        className={styles.adv}
        style={{
          backgroundImage: `url(${imgPre}header1.png?v=1)`,
        }}
      >
        <div className={classnames(styles.centerContent, styles.homemain)}>
          <img
            className={styles.computer}
            src={`${process.env.publicPath}theme/home/header2.png`}
            alt=""
          />
          <h2 className={styles.bannerTitle}>
            <span className={styles.zhiyin}>知因</span>分析
          </h2>
          <div className={styles.bannerDesc}>解码知识基因 加速科技创新</div>
          <div className={styles.bannerDesc2}>助力快速掌握领域技术发展态势及趋势</div>
          {/* <div className={styles.registerBtn} onClick={() => setIsShowRegisterModal(true)}>注册试用</div> */}
          {!user ? (
            <div className={styles.registerBtn} onClick={() => setIsShowRegisterModal(true)}>
              免费试用
            </div>
          ) : (
            <div className={styles.registerBtn}>
              <a href="/analysis/workplace">立即体验</a>
            </div>
          )}
        </div>
      </div>
      <div
        className={classnames(styles.product, styles.advBlock)}
        style={{
          backgroundImage: `url(${imgPre}prodserver/bg2.png)`,
        }}
      >
        <div className={styles.centerContent} style={{ zIndex: 10 }}>
          <div className={styles.legend}>
            <span className={styles.title}>{LegendInfo.product.title}</span>
            <span className={styles.desc}>{LegendInfo.product.desc}</span>
          </div>
          <div className={styles.content}>
            <Product user={user} setIsShowRegisterModal={setIsShowRegisterModal} />
          </div>
        </div>
      </div>
      {/* 知因数据咨询 */}
      <div className={classnames(styles.data, styles.advBlock)}>
        <div className={styles.centerContent}>
          <div className={styles.legend}>
            <span className={styles.title}>{LegendInfo.data.title}</span>
            <span className={styles.desc}>{LegendInfo.data.desc}</span>
          </div>
          <div className={styles.content}>
            <DataComponent />
          </div>
        </div>
      </div>

      <Application
        LegendInfo={LegendInfo}
        setIsShowRegisterModal={setIsShowRegisterModal}
        user={user}
      />
      {/* <div className={classnames(styles.cases, styles.advBlock)}>
        <div className={styles.centerContent}>
          <div className={styles.legend}>
            <span className={styles.title}>{LegendInfo.cases.title}</span>
            <span className={styles.desc}>{LegendInfo.cases.desc}</span>
          </div>
          <div className={styles.content}>
            <Cases />
          </div>
        </div>
      </div> */}
      {/* 合作伙伴 */}
      <div className={classnames(styles.partner, styles.advBlock)}>
        <div className={styles.centerContent}>
          <div className={styles.legend}>
            <span className={styles.title}>{LegendInfo.partner.title}</span>
            <span className={styles.desc}>{LegendInfo.partner.desc}</span>
          </div>
          <div className={styles.content}>
            <Partner />
          </div>
        </div>
      </div>

      <div className={styles.adv2}>
        <img src={`${imgPre}bg.png`} />
        <div className={styles.centerContent}>
          <div className={styles.title1}>免费体验知因，了解领域技术发展态势及趋势</div>
          <div className={styles.title2}>解码知识基因 加速科技创新</div>
          {!user ? (
            <div className={styles.registerBtn} onClick={() => setIsShowRegisterModal(true)}>
              免费试用
            </div>
          ) : (
            <div className={styles.registerBtn}>
              <a href="/analysis/workplace">立即体验</a>
            </div>
          )}
          <div
            className={styles.bookicon}
            style={{
              backgroundImage: `url(${imgPre}book.png)`,
            }}
          ></div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default connect()(Home);

const LegendInfo = {
  product: {
    title: '全面、前沿、多维度的产品与服务',
    desc: '服务于科学家、管理者和决策者，致力于让数据说话',
  },
  data: { title: '知因数据资源', desc: '链接全球科研数据，提供全面客观数据支撑' },
  application: {
    title: '面向丰富业务场景的典型应用方案',
    desc: '提供高效价情报，让科技决策更科学，定制多种行业解决方案，助力科技创新进程',
  },
  cases: { title: '典型应用案例', desc: '定制多种行业解决方案，助力科技创新过程' },
  partner: { title: 'AMiner合作伙伴', desc: '与各行业伙伴协同创新，伴随客户持续成长' },
};

const productContent = [
  {
    defaultIcon: '2ziyuanjiansuohui',
    activeIcon: 'ziyuanjiansuolan',
    title: '科技文献检索与智能解读',
    desc: '帮助用户从论文、专利、学者、项目、资讯五个维度跟踪技术发展动态，快速定位关联研究成果和前沿进展。',
  },
  {
    defaultIcon: '2shujukeshihuahui',
    activeIcon: '2shujukehsihuafenxi',
    title: '科技大数据多维可视化分析',
    desc: '从技术主题、地区、机构、学者等维度以可视化图表的形式展示数据背后的规律、关系与趋势，帮助用户快速完成领域分析。',
  },
  {
    defaultIcon: '2lingyuquanjingfenxihui',
    activeIcon: '2lingyuquanjingfenxilan',
    title: '技术全景分析',
    desc: '半自动化构建领域技术链图谱，挖掘技术背后的关键技术成果、机构和学者，帮助用户从宏观层面快速总览领域技术全景。',
  },
  {
    defaultIcon: '2baogaozidonghuashengchenghui',
    activeIcon: '2baogaozidonghuashengchenglan',
    title: '领域分析报告自动化生成',
    desc: '基于多维可视化分析结果，一键智能生成领域分析报告，帮助用户快速完成报告撰写。',
  },
];
