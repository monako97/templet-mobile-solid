import { lazy } from 'solid-js';
import type { RouteConfig } from 'app:routes';

const router: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/layout')),
    children: [
      {
        path: '/',
        component: lazy(() => import('@/pages')),
      },
      // 配置自定义路由
      {
        path: 'user',
        children: [
          {
            path: ':id',
            children: [
              {
                path: '/',
                metadata: {
                  title: '用户详情',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'about',
        children: [
          {
            path: '/',
            component: lazy(() => import('@/pages/home')),
          },
          {
            path: ':id',
            component: lazy(() => import('@/pages/home')),
          },
        ],
      },
    ],
  },
];

export default router;
