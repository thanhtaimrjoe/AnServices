export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            name: 'login',
            icon: 'smile',
            path: '/user/login',
            component: './user/login',
          },
          // {
          //   name: 'Sign Up',
          //   icon: 'UserAddOutlined',
          //   // hideInMenu: true,
          //   path: '/user/create',
          //   component: './user/create',
          // },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            name: 'DASHBOARD',
            path: '/welcome',
            hideInMenu: true,
            component: './welcome',
            // authority: ['admin'],
          },
          {
            path: '/',
            redirect: '/user/login',
          },
          

          // ACCOUNTS
          {
            name: 'accounts',
            icon: 'UserAddOutlined',
            path: '/accounts',
            routes: [
              {
                path: '/accounts',
                redirect: '/accounts/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/accounts/list',
                component: './accounts/',
              },
              {
                name: 'create',
                path: '/accounts/create',
                hideInMenu: true,
                component: './accounts/create',
              },
              {
                name: 'detail',
                path: '/accounts/detail',
                hideInMenu: true,
                component: './accounts/detail',
              },
            ],
          },

//========================================================================================
          // WORKER
          {
            name: 'workers',
            icon: 'TeamOutlined',
            path: '/workers',
            routes: [
              {
                path: '/workers',
                redirect: '/workers/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/workers/list',
                component: './workers/',
              },
              {
                name: 'create',
                path: '/workers/create',
                hideInMenu: true,
                component: './workers/create',
              },
              {
                name: 'update',
                path: '/workers/update',
                hideInMenu: true,
                component: './workers/update',
              },
              {
                name: 'detail',
                path: '/workers/detail',
                hideInMenu: true,
                component: './workers/detail',
              },
            ],
          },

          // REQUEST SERVICE
          {
            name: 'requestservices',
            icon: 'ToolOutlined',
            path: '/requestservices',
            routes: [
              {
                path: '/requestservices',
                redirect: '/requestservices/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/requestservices/list',
                component: './requestservices/',
              },
              {
                name: 'detail',
                path: '/requestservices/detail',
                hideInMenu: true,
                component: './requestservices/detail',
              },
              // {
              //   name: 'update',
              //   path: '/requestservices/update',
              //   hideInMenu: true,
              //   component: './requestservices/update',
              // },
            ],
          },

          // REQUEST MATERIAL
          {
            name: 'requestmaterials',
            icon: 'ShoppingOutlined',
            path: '/requestmaterials',
            hideInMenu: true,
            routes: [
              {
                path: '/requestmaterials',
                redirect: '/requestmaterials/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/requestmaterials/list',
                component: './requestmaterials/',
              },
              // {
              //   name: 'create',
              //   path: '/workers/create',
              //   hideInMenu: true,
              //   component: './workers/create',
              // },
              {
                name: 'update',
                path: '/requestmaterials/update',
                hideInMenu: true,
                component: './requestmaterials/update',
              },
            ],
          },


          {
            component: './404',
          },
        ],
      },
    ],
  },
];
