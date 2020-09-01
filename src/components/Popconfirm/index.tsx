import React, { useState, useEffect } from 'react'

import styles from './index.css'

interface PopconfirmProps {
  className?: string
  children?: React.ReactElement
  onConfirm?: () => void
  onCancel?: () => void
  message: string
}

type RefNode = HTMLElement | null

const Popconfirm = ({ children, onConfirm, onCancel, message = '', className = '' }: PopconfirmProps) => {
  const [show, setShow] = useState(false)
  let node: RefNode = null

  const globalClickListener = (e: Event) => {
    if (node !== null && !node.contains(e.target as Node)) {
      setShow(false)
    }
  }

  useEffect(() => {
    if (show) {
      document.addEventListener('click', globalClickListener)

      return () => {
        document.removeEventListener('click', globalClickListener)
      }
    }

    return () => {}
  }, [show])

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel()
    }

    setShow(false)
  }

  const handleConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm()
    }

    setShow(false)
  }

  return (
    <div
      className={`${styles.wrapper} ${className || ''}`}
    >
      { React.cloneElement(children, { onClick: () => setShow(true) }) }
      {
        show ? (
          <div className={styles.pop} ref={ele => node = ele}>
            <p className={styles.message}>{message}</p>
            <div className={styles.btns}>
              <button
                className={`${styles.btn} ${styles.confirmBtn}`}
                onClick={handleConfirm}
              >确定</button>
              <button
                className={`${styles.btn} ${styles.cancelBtn}`}
                onClick={handleCancel}
              >取消</button>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default Popconfirm
