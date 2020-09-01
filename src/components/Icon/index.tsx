import React from 'react'

import DashboardIcon from '@/static/dashboard.svg'
import HighlightIcon from '@/static/highlight.svg'
import FilesIcon from '@/static/files.svg'
import ImageIcon from '@/static/image.svg'
import UserIcon from '@/static/user.svg'
import LocationIcon from '@/static/location.svg'
import SearchIcon from '@/static/search.svg'
import TimeIcon from '@/static/time.svg'


const icons = {
  'dashboard': DashboardIcon,
  'highlight': HighlightIcon,
  'files': FilesIcon,
  'image': ImageIcon,
  'user': UserIcon,
  'location': LocationIcon,
  'search': SearchIcon,
  'time': TimeIcon
}

export type icons = keyof typeof icons

export interface IconProps {
  name: icons
  className?: string
}

const Icon = ({ name, className }: IconProps) => {
  const IconComponent = icons[name]

  return <IconComponent className={className || ''} />
}

export default Icon
