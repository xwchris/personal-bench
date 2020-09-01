import React from 'react'

import Essays from '@/containers/Essays'
import EssayEdit from '@/components/EssayEdit'
import Card from '@/components/Card'

import styles from './index.css'

const AdminEssay = () => (
  <div>
    <Card title="发布随想" className={styles.mb24}>
      <EssayEdit />
    </Card>
    <Card title="随想列表" className={styles.mb24}>
      <Essays />
    </Card>
  </div>
)

export default AdminEssay
