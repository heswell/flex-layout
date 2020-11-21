export const layout2 = () => ({
  id: "ab014ba0-2b7c-11eb-824f-13a22c3d85aa",
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
        flexDirection: "column"
      },
      type: "Flexbox",
      children: [
        {
          path: "0.0.0",
          resizeable: true,
          style: {
            backgroundColor: "lilac",
            height: "auto",
            flexBasis: 350,
            flexShrink: 1,
            flexGrow: 1
          },
          type: "Component"
        },
        {
          path: "0.0.1",
          resizeable: true,
          style: {
            backgroundColor: "pink",
            height: "auto",
            flexBasis: 644,
            flexShrink: 1,
            flexGrow: 1
          },
          type: "Component"
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
