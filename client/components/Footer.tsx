import React from 'react'
import styles from './footer.styl'

const Footer: React.FunctionComponent = () => {
  return (
    <div className={styles.footer}>
      <a className={styles.link} target="github" href="https://github.com/koucxz">koucxz</a>
    </div>
  )
}

export default Footer
