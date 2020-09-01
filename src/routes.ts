import AdminArticle from '@/containers//AdminArticle'
import AdminEssay from '@/containers/AdminEssay'
import AdminPhoto from '@/containers/AdminPhoto'
import AdminToken from '@/containers/AdminToken'
import AdminDashboard from '@/containers/AdminDashboard'
import { icons } from '@/components/Icon'

interface Routes {
  admin: RouteItem[]
}

interface RouteItem {
  id: string
  path: string
  name: string
  icon: icons
  exact: boolean
  component: React.FC | React.ComponentClass
}

const routes: Routes = {
  admin: [
    {
      id: 'admin-dashboard',
      path: '/admin',
      name: '管理主页',
      icon: 'dashboard',
      exact: true,
      component: AdminDashboard
    }, {
      id: 'article-admin',
      path: '/admin/article',
      name: '文章管理',
      icon: 'highlight',
      exact: true,
      component: AdminArticle,
    }, {
      id: 'essay-admin',
      path: '/admin/essay',
      name: '随想管理',
      icon: 'files',
      exact: true,
      component: AdminEssay
    }, {
      id: 'photo-admin',
      path: '/admin/photo',
      name: '摄影管理',
      icon: 'image',
      exact: true,
      component: AdminPhoto
    }, {
      id: 'token-admin',
      path: '/admin/token',
      name: '授权管理',
      icon: 'user',
      exact: true,
      component: AdminToken
    }
  ]
}

export default routes
