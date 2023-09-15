import { graphql, Link, StaticQuery } from 'gatsby';
import { getSrc, ImageDataLike } from 'gatsby-plugin-image';

import { css } from '@emotion/react';

import config from '../../website-config';

type SiteNavLogoProps = {
  logo?: ImageDataLike;
};

export function SiteNavLogo() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          logo: file(relativePath: { eq: "img/common/alien.png" }) {
            childImageSharp {
              gatsbyImageData(quality: 100, width: 500, layout: FIXED, placeholder: BLURRED)
            }
          }
        }
      `}
      render={(data: SiteNavLogoProps) => (
        <Link className="site-nav-logo" css={SiteNavLogoStyles} to="/">
          {data.logo ? (
            <img src={getSrc(data.logo)} alt={config.title} width="21" height="21" />
          ) : (
            config.title
          )}
        </Link>
      )}
    />
  );
}

const SiteNavLogoStyles = css`
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  display: inline-block;
  margin-right: 32px;
  padding: 12px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1.8rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  text-transform: none;

  @media (max-width: 700px) {
    margin-right: 18px;
  }

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }
`;
