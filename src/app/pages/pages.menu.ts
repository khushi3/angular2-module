export const PAGES_MENU = [
{
  path: 'pages',
  children: [
  {
    path: 'dashboard',
    data: {
      menu: {
        title: 'User Groups ',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0
      }
    },

  },

   {
    path: 'tables',
    data: {
      menu: {
        title: 'Configuration Modules',
        icon: 'ion-grid',
        selected: false,
        expanded: false,
        order: 500,
      }
    },

  },
 
  ]
}
];
