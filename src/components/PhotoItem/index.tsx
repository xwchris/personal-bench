import React from 'react'

import LocationIcon from '@/static/location.svg'
import { Photo } from '@/types'
import { generateImageUrl } from '@/utils';

import styles from './index.css'

type PhotoProps = {
  data: Photo,
  className?: string
}

const PhotoItem = ({ data, className = '' }: PhotoProps ) => (
  <div className={`${styles.item} ${className}`}>
    <div className={styles.image} style={{ backgroundImage: `url(${generateImageUrl(data.fileId)})`}}></div>
    <p className={styles.desc}>{data.description}</p>
    <div className={styles.footer}>
      <span className={styles.footerText}>{data.shooting_time}</span>
      <span className={styles.footerItem}>
        <LocationIcon className={styles.footerIcon} />
        <span className={styles.footerText}>{data.shooting_place}</span>
      </span>
    </div>
  </div>
)

export default PhotoItem
