import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { Article } from '@/types'
import Popconfirm from '@/components/Popconfirm'

import styles from './index.css'

type AdminDraftArticleItemProps = {
  data: Article,
  draftId: string,
  draftSaveTime: string,
  afterDelete: () => void
}


const AdminDraftArticleItem = ({ data, draftId = '', draftSaveTime = '', afterDelete }: AdminDraftArticleItemProps) => (
  <div className={styles.box}>
    <span className={styles.title}>{data.title || '无标题草稿'}</span>
    <span className={styles.date}>{`保存于 ${dayjs(draftSaveTime).format('YYYY/MM/DD HH:mm')}`}</span>
    <div className={styles.btns}>
      <Link className={`${styles.btn} ${styles.modifyBtn}`} to={`/admin/article/edit?draftId=${draftId}`}>修改</Link>
      <Popconfirm
        message="确认要删除吗"
        onConfirm={() => {
          localStorage.removeItem(draftId)
          afterDelete()
        }}
      >
        <button className={`${styles.btn} ${styles.deleteBtn}`}>删除</button>
      </Popconfirm>
    </div>
  </div>
)

export default AdminDraftArticleItem
