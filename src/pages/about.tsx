import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import {
  NoImage,
  PostFull,
  PostFullHeader,
  PostFullTitle,
} from '../templates/post';
// import ResumeFrame from '../components/ResumeFrame';
import { StaticImage } from 'gatsby-plugin-image';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: var(--background-color);
  }
`;

function About() {
  return (
    <IndexLayout>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header
          className="site-archive-header no-image"
          css={[SiteHeader, SiteArchiveHeader]}
        >
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">About</PostFullTitle>
              </PostFullHeader>
              <PostFullContent className="post-full-content">
                {/* <ResumeFrame /> */}
                <StaticImage
                  src="../content/img/common/pozafly.png"
                  alt="pozafly icon"
                  placeholder="blurred"
                  css={ProfileImage}
                  width={120}
                  height={120}
                />
                <div className="post-content">
                  <br />
                  <br />
                  <p>안녕하세요. 프론트엔드 개발자 pozafly입니다.</p>
                  <p>
                    예전부터 자기 어필을 잘 못한다는 이야기를 들어서 요즘은 자기
                    어필을 잘해보려고 노력 중입니다. 그래도 이 페이지까지 자기
                    어필 공간으로 사용하는 것은 조금은 아쉽다는 마음이 들어,
                    그냥 자기소개 글을 적으면 어떨까 생각해 이렇게 적고
                    있습니다.
                  </p>
                  <p>
                    이 블로그는 제가 애정을 가지고 지속적으로 유지보수하고 있고,
                    다른 이들에게 도움이 될 만한 글을 적는 공간으로 사용하고
                    있습니다. 글을 잘 적는 사람이 되고 싶어 열심히 적어보고
                    있습니다만, 방문하시는 분들께 조금이나마 도움이 되셨으면
                    좋겠다고 생각해 봅니다. 저는 글을 읽는 것을 좋아합니다. 특히
                    정갈하게 잘 작성된 글을 읽는 것을 좋아하고, 그렇게 작성하는
                    분들을 닮고 싶어 합니다.
                  </p>
                  <p>
                    조금은 예민한 성격 탓에 소수와 깊은 관계를 맺는 것을
                    좋아합니다. 그래서 사람이 많은 공간도 힘들어합니다. 그럼에도
                    요즘은 최대한 다양한 사람을 만나보려고 하고 있습니다. 저는
                    개발에 대해 토론하는 것을 좋아하지만, 말을 함부로 하는
                    사람을 힘들어합니다. 지금은 수영을 취미로 가지고 있습니다.
                    또 여느 개발자분들도 그렇듯, 키보드를 좋아하는 편입니다.
                  </p>
                  <p>읽어 주셔서 감사합니다.</p>
                  <br />
                  <div style={{ textAlign: 'right' }}>
                    Last Update: 2023 / 08 / 22
                  </div>
                  <br />
                  <br />
                  <h2>Contact Me</h2>
                  <p>저와 대화를 나누고 싶으시다면 언제든 연락 주세요 :)</p>
                  <ul>
                    <li>
                      <a
                        href="mailto:pozafly@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Email
                      </a>{' '}
                      (pozafly@gmail.com)
                    </li>
                    <li>
                      <a
                        href="https://github.com/pozafly"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/%EC%84%A0%ED%83%9C-%ED%99%A9-43719920a"
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export default About;

export const ProfileImage = css`
  margin: 0 auto;
  display: block;
  width: 120px;
  height: 120px;
  overflow: initial;
  border-radius: 8px;

  img {
    box-shadow: var(--about-box-shadow);
    margin: 0;
    border: initial;
  }

  @media (max-width: 1040px) {
    width: 120px !important;
    height: 120px !important;
  }
`;
