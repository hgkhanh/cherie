import React from 'react';
// import styles from './Post.module.scss';
import Image from 'gatsby-image';
import moment from 'moment';

const Post = ({ post }) => {
    console.log(post);
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
                <h2>
                    {title}
                </h2>
                <p>
                    <span>{moment(date).format("MMMM d, YYYY")}</span>
                </p>
                <Image fluid={fluid} alt={title} />
                <br/>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </React.Fragment>
    );
}

export default Post;