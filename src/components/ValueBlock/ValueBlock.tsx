import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { useStaticQuery, graphql } from 'gatsby';
import Hero from '../Hero';
import styles from './ValueBlock.module.scss';

const ValueBlock = () => {
    const data = useStaticQuery(graphql`
        query {
            background1: file(name: {eq: "Value-01"}) {
                childCloudinaryAsset {
                  fluid(maxWidth: 2400) {
                    ...CloudinaryAssetFluid
                  }
                }
            }  
              
            background2: file(name: {eq: "Value-02"}) {
                childCloudinaryAsset {
                    fluid(maxWidth: 1600) {
                    ...CloudinaryAssetFluid
                    }
                }
            }
        }
    `);

    return (
        <React.Fragment>
            <div className='sectionTitle centerAlign' style={{ margin: '10px 0' }}>
                <span>The better and better</span>
            </div>
            <div style={{ height: 300 }}>
                <Hero overlay={false} hasScroll={false} isParallax={false}
                    imageWide={data.background1} mobileFullHeight={false}>
                </Hero>
            </div>
            <div className='gridWrapper' style={{ marginTop: '20px' }}>
                <div className='grid narrow'>
                    <div className='sectionTextBlock centerAlign'>
                        <h3 className='uppercase heavyText'>Better Experience</h3>
                        <p>
                            A less painful, less stressful way to find 'the' dress.
                        </p>
                    </div>
                </div>
            </div>
            <hr className='divider' />
            <div style={{ height: 300 }}>
                <Hero overlay={false} hasScroll={false} isParallax={false}
                    imageWide={data.background2} mobileFullHeight={false}>
                </Hero>
            </div>
            <div className='gridWrapper' style={{ marginTop: '20px' }}>
                <div className='grid narrow'>
                    <div className='sectionTextBlock centerAlign'>
                        <h3 className='uppercase heavyText'>Better Price</h3>
                        <p>
                            High quality with unmatched price.
                        </p>
                    </div>
                </div>
            </div>
            <hr className='divider' />
        </React.Fragment>
    )
};


export default ValueBlock;