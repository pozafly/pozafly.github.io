import { graphql, Link, useStaticQuery } from 'gatsby';
import { css } from '@emotion/react';
import { getSrc } from 'gatsby-plugin-image';

import config from '@/website-config.ts';

import type { ImageDataLike } from 'gatsby-plugin-image';

type SiteNavLogoProps = {
  logo?: ImageDataLike;
};

export function SiteNavLogo() {
  const data: SiteNavLogoProps = useStaticQuery(graphql`
    query HeadingQuery {
      logo: file(relativePath: { eq: "img/common/alien.png" }) {
        childImageSharp {
          gatsbyImageData(quality: 100, width: 500, layout: FIXED, placeholder: BLURRED)
        }
      }
    }
  `);

  return (
    <Link className="site-nav-logo" css={SiteNavLogoStyles} to="/">
      {data.logo ? (
        <img src={getSrc(data.logo)} alt={config.title} width="21" height="21" />
      ) : (
        config.title
      )}
    </Link>
  );
}

const SiteNavLogoStyles = css`
  position: relative;
  z-index: 100;
  display: inline-block;
  flex-shrink: 0;
  margin-right: 32px;
  padding: 12px 0;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.8rem;
  color: #fff;
  text-transform: none;
  letter-spacing: -0.5px;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }

  @media (max-width: 700px) {
    margin-right: 18px;
  }
`;
