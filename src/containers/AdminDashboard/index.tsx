import React from 'react'

import { Row, Col } from '@/components/Grid'
import { Link } from 'react-router-dom'

import AdminPhotoEdit from '@/components/AdminPhotoEdit'
import Card from '@/components/Card'
import EssayEdit from '@/components/EssayEdit'

import styles from './index.css'

const AdminHome = () => {

  return (
    <div className={styles.box}>
      <Row className={styles.row}>
        <Col span={12} className={styles.col}>
          <Card title="发布文章">
            <Link className={styles.addBtn} to="/admin/article/edit?type=create">发布新文章</Link>
          </Card>
        </Col>
        <Col span={12} className={styles.col}>
          <Card title="发布随想">
            <EssayEdit />
          </Card>
        </Col>
        <Col span={24} className={styles.col}>
          <Card title="发布照片">
            <AdminPhotoEdit className={styles.editBox} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminHome
