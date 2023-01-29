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
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';
import styled from '@emotion/styled';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const MovePicture = styled.img`
  width: 60%;
  transition: 0.5s;
  border-radius: 15px;
  &:hover {
    transform: translateY(-15px);
  }
`;

function About() {
  return (
    <IndexLayout>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
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
                <div className="post-content">
                  {/* <h5>황선태(Pozafly)</h5> */}
                  <br />
                  <br />
                  <p>
                    안녕하세요. Frontend 개발자를 꿈꾸는 황선태입니다.
                    블로그일 뿐, 포트폴리오가 아닌데 각 잡고 About 페이지를 쓰려니 도무지 답이 나오지 않네요. 다만, 그냥 즐겁게 개발하고 싶습니다.
                  </p>
                  <p>
                    Frontend는 Vue와 React, Backend는 SpringBoot, SQL을 다룰 줄 압니다. 이 페이지를 작성하고 있는 시점엔 React를 배우고 있습니다.
                    비교적 피드백이 바로 나타나는 Frontend 개발에 집중하려고 합니다. 무언가 딱 맞아떨어질 때의 쾌감, 유의미한 것을 만들었다는 쾌감이
                    개발의 즐거움인 듯합니다.
                    깔끔하고 정갈한 코드를 작성하는 개발자가 되고 싶습니다.
                  </p>
                  <p>
                    이 블로그는 기술을 사용하고 적용한 내용 위주, 기술에 대한 생각이나 회고로 채우고, static 한 공부 내용은 {' '}
                    <a href="https://github.com/pozafly/TIL" target="_blank" rel="noreferrer">TIL</a>에 채워갈 생각입니다.
                    들러주셔서 감사합니다.
                    <br />
                  </p>
                  <div style={{ textAlign: 'right' }}>2021/3/30</div>
                  <br />
                  <br />
                  <br />
                  <h2>Toy Project</h2>
                  <br />
                  <h5>Tripllo</h5>
                  <a href="https://tripllo.tech/" target="_blank" rel="noreferrer">
                    <MovePicture src='https://user-images.githubusercontent.com/59427983/112918486-f25bc600-913f-11eb-8c9d-ea4221141754.png' alt="Tripllo" />
                  </a>
                  <ul>
                    <li>평소 즐겨 사용하던 Trello를 만들었습니다.</li>
                    <li>
                      Github:
                      <ul>
                        <li>
                          Frontend: {' '}
                          <a href="https://github.com/pozafly/tripllo_vue" target="_blank" rel="noreferrer">
                            https://github.com/pozafly/tripllo_vue
                          </a>{' '}
                          <small>(이곳에 README가 있습니다.)</small>
                        </li>
                        <li>
                          Backend: {' '}
                          <a href="https://github.com/pozafly/tripllo_springBoot" target="_blank" rel="noreferrer">
                            https://github.com/pozafly/tripllo_springBoot
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <br />
                  <br />
                  <br />
                  <h2>Contact Me</h2>
                  <ul>
                    <li>Email: {' '}
                      <a href="mailto:pozafly@gmail.com" target="_blank" rel="noreferrer">
                        pozafly@gmail.com
                      </a>
                    </li>
                    <li>
                      Github: {' '}
                      <a href="https://github.com/pozafly" target="_blank" rel="noreferrer">
                        https://github.com/pozafly
                      </a>
                    </li>
                  </ul>
                  <br />
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
