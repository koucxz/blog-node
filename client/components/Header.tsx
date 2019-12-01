import React, { useState, useEffect } from 'react'
import * as styles from './header.styl'

import Router from 'next/router'
import Link from 'next/link'
import { Row, Menu, Icon } from 'antd'

const Header: React.FunctionComponent = () => {
  const [href, setHref] = useState()

  useEffect(() => {
    setHref(Router.pathname)
  }, [])

  return (
    <header className={styles.header}>
      <Row type="flex" justify="space-between" align="middle">
        <span className={styles.title}>博客</span>

        <Menu style={styles.menu} selectedKeys={[href]} mode="horizontal">
          <Menu.Item style={styles.menuItem} key="/">
            <Link href="/">
              <a>
                <Icon type="home" />
                首页
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item style={styles.menuItem} key="/about">
            <Link href="/about">
              <a>
                <Icon type="smile" />
                关于
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Row>
    </header>
)
}

export default Header
