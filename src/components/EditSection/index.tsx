import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prompt } from 'react-router-dom'
import { RouterProps, Redirect } from 'react-router'

import { Article } from '@/types'
import UploadBox from '@/components/UploadBox'
import markdownStyles from '@/containers/markdown.css'
import CodeBlock from '@/components/CodeBlock';
import commonStyles from '@/common.css'
import PublishBtn from './PublishBtn'
import styles from './index.css'

interface EditSectionProps extends RouterProps {
  data: Article,
  draftId?: string
}

let draftId: string

const EditSection = ({ data, history, draftId: originDraftId }: EditSectionProps) => {
  const defaultArticle = data || {
    title: '',
    issueId: '',
    abstract: '',
    content: '',
    cover: ''
  }

  const [article, setArticle] = useState(defaultArticle)
  const [completed, setCompleted] = useState(false)
  const [draftText, setDraftText] = useState('')

  const formIsHalfFilledOut = article.title !== data.title || article.content !== data.content || article.abstract !== data.abstract
  const setArticleItem = (key: keyof Article) => (value: string) => setArticle({ ...article, [key]: value })
  const setArticleItemWithEvent = (key: keyof Article) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setArticle({ ...article, [key]: event.target.value || '' })
  const result: Article = article

  const setDraft = (data = {}) => {
    localStorage.setItem(draftId, JSON.stringify([Date.now(), data]))
  }

  let textTimer: NodeJS.Timeout
  const saveDraft = () => {
    setDraft(result)
    setDraftText('文章已自动保存')
    textTimer = setTimeout(() => {
      setDraftText('')
    }, 1 * 1000)
  }

  const deleteDraftAndExit = () => {
    localStorage.removeItem(draftId)
    setCompleted(true)
  }

  const saveDraftAndExit = () => {
    saveDraft()
    setCompleted(true)
  }

  const onAfterPublish = (completed: boolean) => {
    // 删除草稿
    if (completed) {
      localStorage.removeItem(draftId)
    }
    setCompleted(completed)
  }

  useEffect(() => {
    draftId = originDraftId || 'article_draft_' + Date.now()

    // auto save every 8s
    const timer = setInterval(() => {
      saveDraft()
    }, 5 * 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(textTimer)
    }
  }, [])


  return (
    <div className={styles.box}>
      { completed ? <Redirect to={`/admin/article`} /> : null }
      <Prompt when={!completed && formIsHalfFilledOut} message="确定不保存就退出吗" />
      <div className={styles.header}>
        <h1 className={styles.headerText}>文章编辑</h1>
        <div className={styles.btns}>
          <span className={styles.saveText}>{draftText}</span>
          <button className={`${commonStyles.btn} ${commonStyles.primary} ${styles.mr12}`} onClick={saveDraftAndExit}>保存草稿并退出</button>
          <button className={`${commonStyles.btn} ${commonStyles.danger} ${styles.mr12}`} onClick={deleteDraftAndExit}>删除草稿并退出</button>
          <PublishBtn
            className={`${commonStyles.btn} ${commonStyles.primary} ${styles.mr12}`}
            data={result}
            onCompleted={onAfterPublish}
          >发布</PublishBtn>
          <button className={`${commonStyles.btn} ${styles.mr12}`} onClick={history.goBack}>取消</button>
        </div>
      </div>
      <input
        className={styles.title}
        value={article.title}
        placeholder="文章标题"
        onChange={setArticleItemWithEvent('title')}
      />
      <textarea
        className={styles.abstract}
        value={article.abstract}
        placeholder="文章提要"
        onChange={setArticleItemWithEvent('abstract')}
      />
      <UploadBox
        onFinishUpload={setArticleItem('cover')}
        onDelete={() => setArticleItem('cover')('')}
        text="点击上传封面"
        fileId={article.cover}
      />
      <div className={styles.editBox}>
        <textarea
          className={styles.content}
          placeholder="文章内容"
          value={article.content}
          onChange={setArticleItemWithEvent('content')}
        />
        <ReactMarkdown
          className={`${styles.target} ${markdownStyles.markdown}`}
          source={article.content}
          renderers={{ code: CodeBlock }}
        />
      </div>
    </div>
  )
}

export default EditSection
