import React from 'react';
// import styles from './Post.module.scss';
import Image from 'gatsby-image';
import moment from 'moment';

const Post = ({ post }) => {
    const {
        html,
        frontmatter: {
            title,
            date,
            cover: {
                childCloudinaryAsset: { fluid }
            }
        }
    } = post;
    return (
        <React.Fragment>
            <div>
                <h1>
                    {title}
                </h1>
                <h3>
                    <span>{moment(date).format("MMMM d, YYYY")}</span>
                </h3>
                <Image fluid={fluid} alt={title} />
                <br/>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </React.Fragment>
    );
}

export default Post;