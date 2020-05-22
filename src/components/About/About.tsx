import React, { useContext } from "react";
import * as styles from "./About.module.scss";
import { useStaticQuery, graphql } from 'gatsby';
import { Row, Col } from 'antd';
import Image from 'gatsby-image';
import { WindowDimensionsContext } from '../../shared/WindowDimensionsProvider';

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      pic1: file(name: {eq: "Banner-03"}) {
        childCloudinaryAsset {
          fluid(maxWidth: 1600) {
            ...CloudinaryAssetFluid
          }
        }
      }
      pic2: file(name: {eq: "logo-square"}) {
        childCloudinaryAsset {
          fixed(width: 400) {
            ...CloudinaryAssetFixed
          }
        }
      }
    }      
  `)

  const { width } = useContext(WindowDimensionsContext);

  return (
    <div className={styles.container}>
      <p>Shakespeare once said:</p>
      <p style={{ fontStyle: 'italic' }}>
        Love alters not with his brief hours and weeks.<br />
            But bears it out even to the edge of doom.
          </p>
      <p>
        The celebration of love is not a fleeting moment,
        a sign of ephemerality but one that lasts for an eternity.
        And perhaps that is the true connotation of weddings,
        to mark the most significant threshold of one’s life in the name of love.
          </p>
      <Image fixed={data.pic2.childCloudinaryAsset.fixed} />

      <br />
      <p>
        Inspired by modern beauty with a nostalgic soul that forever longs for the past,
        allured by romance and passion,the idea of a small bridal boutique was conceived
        at the heart of Helsinki like a long lost dream.
        With the goal of creating a once-in-a-lifetime experience for our customers,
        the name ‘Cherie‘ came to mind, along with its true meaning of ‘sweetheart’
        in French and its homophone ‘cherry’, a constant reminder of sweetness.
        Representing the brand under such beliefs and ideas,
        at Cherie Bridal where the provision of excellent customer service is the top priority,
        every bride who comes to us is and will always be our ‘sweetheart’.
          </p>

      {width <= 576 ? (
        (<Image fluid={data.pic1.childCloudinaryAsset.fluid} />)
      ) :
        (
          <Image sizes={{ ...data.pic1.childCloudinaryAsset.fluid, aspectRatio: 16 / 9 }} alt='' />
        )}
      <br />
      <p>
        In today’s market where wedding planning has become a process of relentless waiting and extravagance,
        Cherie Bridal promises you the most enjoyable experience of finding your true match of a wedding dress,
        sincerely tailor-made to your preference and identity,
        with customisation time frame under three months at competitive prices.
          </p>
      <p>
        As we have the honour of temporarily accompanying you on your journey,
        with the right wedding dress, the portrait of a contemporary Juliet can be seen in every bride,
        but this time with a happy ending:
          </p>
      <div className={styles.quote}>
        <blockquote>
          Did my heart love till now? Forswear it, sight!<br />
              For I ne'er saw true beauty till this night
            <cite>Shakespeare</cite>
        </blockquote>
      </div>
    </div>
  );
}

export default About;
