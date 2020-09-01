import React, { useState, useEffect, useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import SearchIcon from '@/static/search.svg'
import styles from './index.css'

export interface SearchInputProps extends RouteComponentProps {
  className?: string
}

const NavSearch = ({ className, history }: SearchInputProps) => {
  const [showInput, setShowInput] = useState(false)
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 展开input
    setValue(e.target.value)
  }
  const onFocus = () => setShowInput(true)
  const onBlur = () => !value && setShowInput(false)

  const inputEle = useRef(null)

  const onHandleSearch = () => {
    history.push(`/search?kw=${encodeURIComponent(value)}`)
  }

  useEffect(() => {
    const enterListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        onHandleSearch()
      }
    }
    inputEle.current.addEventListener('keypress', enterListener)

    return () => {
      inputEle.current.removeEventListener('keypress', enterListener)
    }
  }, [inputEle, value])

  return (
    <label className={`${styles.box} ${className}`}>
      <SearchIcon className={`${styles.icon} ${showInput ? styles.showIcon : ''}`} />
      <input
        ref={inputEle}
        placeholder="请输入关键词"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        className={`${styles.input} ${showInput ? styles.showInput : '' }`}
      />
    </label>
  )
}

export default withRouter(NavSearch)
