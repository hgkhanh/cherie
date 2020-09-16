import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import siteConfig from "../../data/SiteConfig";
import Blog from "../components/Blog";

const Typography = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet title={`Blog | ${siteConfig.siteTitle}`} />
      <div className="gridWrapper">
        <div className="grid">
          <div className="textContent">
            <hr className="divider" />
            <h1>Layout</h1>
            <hr className="divider" />
            <header>
              <h1>Grid</h1>
            </header>
            <hr className="divider" />
            <h2>1. Grid</h2>
          </div>
        </div>
      </div>

      <div className="gridWrapper" style={{ background: 'lightblue', height: '300px' }}>
        gridWrapper
          <div className="grid" style={{ background: 'lightpink', height: '200px' }}>
          grid (max-width: 900px)

          <div className="textContent" style={{ background: 'lightgreen', height: '100px' }}>
            textContent (margin: [10, 10, 0])
          </div>
        </div>
      </div>

      <div className="gridWrapper">
        <div className="grid">
          <div className="textContent">
            <hr className="divider" />
            <h2>2. Grid Wide</h2>
          </div>
        </div>
      </div>

      <div className="gridWrapper" style={{ background: 'lightblue', height: '300px' }}>
        gridWrapper
          <div className="grid wide" style={{ background: 'lightpink', height: '200px' }}>
          grid wide (max-width: 1200px)
          </div>
      </div>


      <div className="gridWrapper">
        <div className="grid">
          <div className="textContent">
            <hr className="divider" />
            <h2>3. Grid Narrow</h2>
          </div>
        </div>
      </div>
      <div className="gridWrapper" style={{ background: 'lightblue', height: '300px' }}>
        gridWrapper
          <div className="grid narrow" style={{ background: 'lightpink', height: '200px' }}>
          grid narrow (max-width: 600px)
          </div>
      </div>

      <div className="gridWrapper">
        <div className="grid">
          <div className="textContent">
            <hr className="divider" />
            <h1>Color</h1>
            <hr className="divider" />

            <hr className="divider" />
            <h2>Theme Color</h2>
            <div className="ColorPalette" style={{ background: "#f6f0ec" }}>
              <span>$color-background</span>
              <span>#f6f0ec</span>
            </div>
            <div className="ColorPalette" style={{ background: "#c79479" }}>
              <span>$color-brand-primary</span>
              <span>#c79479</span>
            </div>
            <div className="ColorPalette" style={{ background: "#e8c7b5" }}>
              <span>$color-brand-light</span>
              <span>#e8c7b5</span>
            </div>
            <div className="ColorPalette" style={{ background: "#d9d9d9" }}>
              <span>$color-gray</span>
              <span>#d9d9d9</span>
            </div>
            <div className="ColorPalette" style={{ background: "#fafafa" }}>
              <span>$color-white</span>
              <span>#fafafa</span>
            </div>


            <hr className="divider" />
            <h2>Font Color</h2>
            <div className="ColorPalette" style={{ color: "#1f1f1f" }}>
              <span>$font-color-dark</span>
              <span>.darkerText</span>
              <span>#1f1f1f</span>
            </div>
            <div className="ColorPalette" style={{ color: "#434343" }}>
              <span>$font-color</span>
              <span>#434343</span>
            </div>
            <div className="ColorPalette" style={{ color: "#8c8c8c" }}>
              <span>$font-color-gray</span>
              <span>.grayText</span>
              <span>#8c8c8c</span>
            </div>
            <div className="ColorPalette" style={{ background: "#1f1f1f", color: "#fafafa" }}>
              <span>$font-color-white</span>
              <span>.darkTone</span>
              <span>#fafafa</span>
            </div>

            <hr className="divider" />
            <h2>Other Colors</h2>
            <div className="ColorPalette" style={{ background: "#d9534f", color: "#fafafa" }}>
              <span>$color-danger</span>
              <span>.error</span>
              <span>#d9534f</span>
            </div>
            <div className="ColorPalette" style={{ background: "#5cb85c", color: "#fafafa" }}>
              <span>$color-success</span>
              <span>.success</span>
              <span>#5cb85c</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gridWrapper">
        <div className="grid">
          <div className="textContent">
            <hr className="divider" />
            <h1>Typography</h1>
            <hr className="divider" />

            <article id="text__headings">
              <header>
                <h1>Headings</h1>
              </header>
              <div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
              </div>
            </article>
            <article id="text__paragraphs">
              <header><h1>Paragraphs</h1></header>
              <div>
                <p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
              </div>
            </article>
            <article id="text__blockquotes">
              <header><h1>Blockquotes</h1></header>
              <div>
                <blockquote>
                  <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.</p>
                  <p>It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.</p>
                  <cite><a href="#!">Said no one, ever.</a></cite>
                </blockquote>
              </div>

            </article>
            <article id="text__lists">
              <header><h1>Lists</h1></header>
              <div>
                <h2>1. Definition list</h2>
                <dl>
                  <dt>Definition List Title</dt>
                  <dd>This is a definition list division.</dd>
                </dl>
                <h2>2. Ordered List</h2>
                <ol>
                  <li>List Item 1</li>
                  <li>List Item 2</li>
                  <li>List Item 3</li>
                </ol>
                <h2>3. Unordered List</h2>
                <ul>
                  <li>List Item 1</li>
                  <li>List Item 2</li>
                  <li>List Item 3</li>
                </ul>
              </div>

            </article>
            <hr className="divider" />
            <article id="text__inline">
              <header><h1>Inline elements</h1></header>
              <div>
                <p><a href="#!">This is a text link</a>.</p>
                <p><strong>Strong is used to indicate strong importance.</strong></p>
                <p><em>This text has added emphasis.</em></p>
                <p>The <b>b element</b> is stylistically different text from normal text, without any special importance.</p>
                <p>The <i>i element</i> is text that is offset from the normal text.</p>
                <p>The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.</p>
                <p><del>This text is deleted</del> and <ins>This text is inserted</ins>.</p>
                <p><s>This text has a strikethrough</s>.</p>
              </div>

            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Typography;
