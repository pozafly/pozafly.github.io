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
import styled from '@emotion/styled';
// import ResumeFrame from '../components/ResumeFrame';
import pozafly from '../content/img/common/pozafly.png';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: var(--background-color);
  }
`;

const MovePicture = styled.img`
  width: 60%;
  border-radius: 15px;
  transition: 0.2s ease-in-out;

  &:hover {
    box-shadow: rgba(0, 0, 33, 0.07) 0px 16px 22.4px 4.8px,
      rgba(0, 0, 33, 0.05) 0px 3.2px 16px 0px,
      rgba(0, 0, 33, 0.07) 0px 0px 1px 0px;
    -webkit-transform: translate3D(0, -3%, 0);
    -moz-transform: translate3D(0, -3%, 0);
    -ms-transform: translate3D(0, -3%, 0);
    transform: translate3D(0, -3%, 0);
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
                <ProfileImage src={pozafly} alt="pozafly" />
                <div className="post-content">
                  <br />
                  <br />
                  <p>안녕하세요. 프론트엔드 개발자 황선태입니다.</p>
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
                    좋겠다고 생각해 봅니다. 그리고 저는 글을 읽는 것도
                    좋아합니다. 특히 정갈하게 잘 작성된 글을 읽는 것을 좋아하고,
                    그렇게 작성하는 분들을 닮고 싶어 합니다.
                  </p>
                  <p>
                    조금은 예민한 성격 탓에 소수와 깊은 관계를 맺는 것을
                    좋아해서, 마음이 맞는 분들과 만나는 것을 좋아했습니다.
                    그래서 말을 함부로 하는 사람을 힘들어합니다. 사람이 많은
                    공간을 힘들어하지만, 새로운 공간 자체를 경험하는 것은
                    좋아합니다. 지금은 수영을 취미로 가지고 있습니다. 또 여느
                    개발자분들도 그렇듯, 키보드를 좋아하는 편입니다.
                  </p>
                  <p>
                    저는 개발을 잘하고 싶습니다. 어떤 분이 왜 개발을 잘하고
                    싶냐고 물었던 적이 있었습니다. 비즈니스와 개발의 상관관계에
                    대해 말씀하시는 것이었습니다. 부끄럽게도 그에 대한 답을,
                    그때도 그렇고 지금도 명확히 내리고 있지는 못합니다.
                    개발하면서 아직 그 답을 찾아가는 중입니다.
                  </p>
                  <p>읽어 주셔서 감사합니다.</p>
                  <br />
                  <div style={{ textAlign: 'right' }}>
                    Last Update: 2023 / 08 / 22
                  </div>
                  <br />
                  <br />
                  <h2>Contact Me</h2>
                  <p>
                    저와 대화를 나누고 싶으시다면 언제든 연락 주세요. 기다리고
                    있겠습니다.
                  </p>
                  <ul>
                    <li>
                      Email:{' '}
                      <a
                        href="mailto:pozafly@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        pozafly@gmail.com
                      </a>
                    </li>
                    <li>
                      GitHub:{' '}
                      <a
                        href="https://github.com/pozafly"
                        target="_blank"
                        rel="noreferrer"
                      >
                        https://github.com/pozafly
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

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border: none !important;
  box-shadow: 0px 14px 24px hsla(218, 53%, 10%, 12%);
  box-shadow: var(--about-box-shadow);

  @media (max-width: 1040px) {
    width: 120px !important;
    height: 120px !important;
  }
`;
