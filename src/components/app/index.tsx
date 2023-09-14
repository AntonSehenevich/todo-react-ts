import Header from '../header'
import Layout from '../layout'
import Todos from '../todos'

import styles from './index.module.scss'

export default function App() {
  return (
    <Layout>
      <Header />
      <Todos className={styles.container} />
    </Layout>
  )
}
