import React, { useState, useContext } from 'react';
import styles from './Blog.module.scss';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import moment from 'moment';

const BlogItem = ({ post }) => {
    const {
        excerpt,
        fields: { slug },
        frontmatter: {
            title,
            date,
            cover: {
                children: [{ fluid }]
            }
        }
    } = post;
    return (
        <div className={styles.item}>
            <Link to={slug} key={title} className={styles.content}>
                <Image fluid={fluid} alt={title} />
                <h2>
                    {title}
                </h2>
                <h5>
                    <span>{moment(date).format("MMMM d, YYYY")}</span>
                </h5>
                <p>{excerpt}</p>
            </Link>
        </div>
    );
};

const Blog = ({ posts }) => {
    return (
        <React.Fragment>
            {posts.map((post, index) =>
                <BlogItem post={post.node} key={index}  />
            )}
        </React.Fragment>
    );
}

export default Blog;