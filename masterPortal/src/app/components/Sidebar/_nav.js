
export default {
  items: [
    {
      title: true,
      name: 'Microfrontend',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'dps-nav-title'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Apps',
      icon: 'green icon-chart',
      svg: "../../../../public/svg/order.svg",
      children: [
        {
          name: 'App1',
          url: '/app1',
          icon: 'green icon-organization',
          svg: "../../../../public/svg/PO_Admin.svg",
          class: 'dps-nav-item',
          accessLevel: ['ADMIN','RW','RO'],
          parent: 'APP1',
          top: "-21px",   
        },
        {
          name: 'App2',
          url: '/app2',
          icon: 'green icon-organization',
          svg: "../../../../public/svg/create_new_po.svg",
          class: 'dps-nav-item',
          accessLevel: ['ADMIN','RW','RO'],
          parent: 'APP2',
          top: "-21px",      
        },
      ]
    }
  ]
};
