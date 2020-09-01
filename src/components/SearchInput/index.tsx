import React, { useState, useEffect, useRef } from 'react'

import SearchIcon from '@/static/search.svg'
import styles from './index.css'

export interface SearchInputProps {
  className?: string
  keyword?: string
  onSearch: (keyword: string) => void
}

const SearchInput = ({ className = '', onSearch, keyword = '' }: SearchInputProps) => {
  const [ value, setValue ] = useState(keyword)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

  }
  const onHandleSearch = () => {
    onSearch(value)
  }

  const inputEle = useRef(null)

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

  useEffect(() => {
    setValue(keyword)
  }, [keyword])

  return (
    <div className={`${styles.box} ${className}`}>
      <div className={styles.wrapper}>
        <input
          ref={inputEle}
          type="text"
          className={styles.input}
          placeholder="请输入关键词"
          value={value}
          onChange={onChange}
        />
        <SearchIcon className={styles.icon} onClick={onHandleSearch} />
      </div>
    </div>
  )
}

export default SearchInput
