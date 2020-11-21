export const layout3 = () => ({
  path: "0",
  style: {
    height: 1000,
    width: 1200,
    display: "flex",
    flexDirection: "column"
  },
  type: "Flexbox",
  children: [
    {
      path: "0.0",
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "row"
      },
      type: "Flexbox",
      children: [
        {
          path: "0.0.0",
          resizeable: true,
          style: {
            minWidth: 50,
            width: 100
          },
          type: "View",
          children: [
            {
              path: "0",
              style: {
                height: "100%"
              },
              type: "Red"
            },
            "0.0.0.0"
          ]
        },
        {
          path: "0.0.1",
          resizeable: true,
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column"
          },
          type: "Flexbox",
          children: [
            {
              path: "0.0.1.0",
              resizeable: true,
              style: {
                backgroundColor: "pink",
                height: "auto",
                flexBasis: 392,
                flexShrink: 1,
                flexGrow: 1
              },
              type: "Component"
            },
            {
              path: "0.0.1.1",
              resizeable: true,
              style: {
                backgroundColor: "yellow",
                height: "auto",
                flexBasis: 602,
                flexShrink: 1,
                flexGrow: 1
              },
              type: "Component"
            }
          ]
        }
      ]
    },
    {
      path: "0.1",
      style: {
        backgroundColor: "green",
        height: 32
      },
      type: "Component"
    }
  ]
});
