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
          // {
          //   name: 'accounts',
          //   icon: 'UserAddOutlined',
          //   path: '/accounts',
          //   routes: [
          //     {
          //       path: '/accounts',
          //       redirect: '/accounts/list',
          //     },
          //     {
          //       name: 'list',
          //       icon: 'smile',
          //       path: '/accounts/list',
          //       component: './accounts/',
          //     },

          //     {
          //       name: 'create',
          //       path: '/accounts/create',
          //       hideInMenu: true,
          //       component: './accounts/create',
          //     },
          //   ],
          // },

          // BRAND
          {
            name: 'brands',
            icon: 'BoldOutlined',
            path: '/brands',
            hideInMenu: true,
            // authority: ['Business'],
            routes: [
              {
                path: '/brands',
                redirect: '/brands/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/brands/list',
                component: './brands/',
              },
              {
                name: 'create',
                path: '/brands/create',
                hideInMenu: true,
                component: './brands/create',
              },
              {
                name: 'update',
                path: '/brands/update',
                hideInMenu: true,
                component: './brands/update',
              },
            ],
          },

          // CAMPAIGN
          {
            name: 'campaigns',
            icon: 'CopyrightOutlined',
            path: '/campaigns',
            hideInMenu: true,
            routes: [
              {
                path: '/campaigns',
                redirect: '/campaigns/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/campaigns/list',
                component: './campaigns/',
              },
              {
                name: 'create',
                path: '/campaigns/create',
                hideInMenu: true,
                component: './campaigns/create',
              },
              {
                name: 'update',
                path: '/campaigns/update',
                hideInMenu: true,
                component: './campaigns/update',
              },
              {
                name: 'update',
                path: '/campaigns/update',
                hideInMenu: true,
                component: './campaigns/update',
              },
            ],
          },

          // CAMPAIGN APPLIES
          {
            name: 'campaignapplies',
            icon: 'CopyrightOutlined',
            path: '/campaignapplies',
            hideInMenu: true,
            routes: [
              {
                path: '/campaignapplies',
                redirect: '/campaignapplies/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/campaignapplies/list',
                component: './campaignapplies/',
              },
              // {
              //   name: 'create',
              //   path: '/campaignapplies/create',
              //   hideInMenu: true,
              //   component: './campaignapplies/create',
              // },
              {
                name: 'update',
                path: '/campaignapplies/update',
                hideInMenu: true,
                component: './campaignapplies/update',
              },
            ],
          },

           // POST
           {
            name: 'posts',
            hideInMenu: true,
            icon: 'SolutionOutlined',
            path: '/posts',
            routes: [
              {
                path: '/posts',
                redirect: '/posts/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/posts/list',
                component: './posts/',
              },
              // {
              //   name: 'create',
              //   path: '/posts/create',
              //   hideInMenu: true,
              //   component: './posts/create',
              // },
              {
                name: 'update',
                path: '/posts/update',
                hideInMenu: true,
                component: './posts/update',
              },
            ],
          },
          // REVIEWER
          {
            name: 'reviewers',
            icon: 'SolutionOutlined',
            path: '/reviewers',
            hideInMenu: true,
            routes: [
              {
                name: 'detail',
                path: '/reviewers/detail',
                hideInMenu: true,
                component: './reviewers/detail',
              },
            ],
          },

//========================================================================================
          // MASONS
          {
            name: 'masons',
            icon: 'TeamOutlined',
            path: '/masons',
            routes: [
              {
                path: '/masons',
                redirect: '/masons/list',
              },
              {
                name: 'list',
                icon: 'smile',
                path: '/masons/list',
                component: './masons/',
              },
              {
                name: 'create',
                path: '/masons/create',
                hideInMenu: true,
                component: './masons/create',
              },
              {
                name: 'update',
                path: '/masons/update',
                hideInMenu: true,
                component: './masons/update',
              },
              {
                name: 'detail',
                path: '/masons/detail',
                hideInMenu: true,
                component: './masons/detail',
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
              //   path: '/masons/create',
              //   hideInMenu: true,
              //   component: './masons/create',
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
