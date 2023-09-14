import Logo from './logo'

import styles from './index.module.scss'

export default function AppTitle() {
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} width={50} height={70} />
      <h3 className={styles.title}>TODO</h3>
    </div>
  )
}
