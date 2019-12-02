import * as React from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { Article } from '../typings'
import { List, Icon } from 'antd'
import * as styles from './index.styl'
import axios from 'axios'

interface Props {
  list?: Article[]
}

const IndexPage: NextPage<Props> = ({ list }) => {
  return (
    <Layout title="Home | blog">
      <List
        header={<div className={styles.header}>最新日志</div>}
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => (
          <List.Item className={styles.item}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.desc}>
              <span className={styles.icon}><Icon type="calendar" />{item.update_time}</span>
              <span className={styles.icon}><Icon type="folder" />{item.type}</span>
              <span className={styles.icon}><Icon type="fire" />{item.view_count}</span>
            </div>
            <div className={styles.context}>{item.content}</div>  
          </List.Item>
        )}
      />
    </Layout>
  )
}

IndexPage.getInitialProps = async () => {
  let list = []
  try {
    const res = await axios('http://127.0.0.1:7001/articles')
    list = res.data.data
  } catch (err) {}

  return { list }
}

export default IndexPage
