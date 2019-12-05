import * as React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { NextPage } from 'next'
import { Row, Col, Icon, Breadcrumb } from 'antd'
import axios from 'axios'
import * as styles from './detail.styl'
import { Article } from '../typings'

interface Props {
  article: Article
}

const DetailPage: NextPage<Props> = ({ article }) => {
  return (
    <Layout title={article.title + " | blog"}>
      <Row className={styles['comm-main']} type="flex" justify="center">
        <Col className={styles["comm-left"]} span={24}>
          <div>
            <div className={styles["bread-div"]}>
              <Breadcrumb>
                <Breadcrumb.Item><Link href="/"><a>首页</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className={styles["detailed-title"]}>
                {article.title}
              </div>

              <div className={`${styles["list-icon"]} ${styles.center}`}>
                <span><Icon type="calendar" />{article.update_time}</span>
                <span><Icon type="folder" />{article.type}</span>
                <span><Icon type="fire" />{article.view_count}人</span>
              </div>

              <div className={styles["detailed-content"]} >
                {article.content}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

DetailPage.getInitialProps = async ({ query }) => {
  let article
  try {
    const res = await axios('http://127.0.0.1:7001/articles/' + query.id)
    article = res.data.data[0] || {}
  } catch (err) {}

  return { article }
}

export default DetailPage
