export const layout5 = () => ({
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
        display: "flex",
        flexDirection: "row",
        flexBasis: 0,
        flexGrow: 1,
        flexShrink: 1
      },
      type: "Flexbox",
      children: [
        {
          path: "0.0.0",
          resizeable: true,
          style: {
            minWidth: 50,
            width: 200
          },
          type: "View",
          children: [
            {
              path: "0.0.0.0",
              style: {
                height: "100%"
              },
              type: "Red"
            }
          ]
        },
        {
          path: "0.0.1",
          resizeable: true,
          style: {
            display: "flex",
            flexDirection: "column",
            flexBasis: 0,
            flexGrow: 1,
            flexShrink: 1
          },
          type: "Flexbox",
          children: [
            {
              path: "0.0.1.0",
              resizeable: true,
              style: {
                display: "flex",
                flexDirection: "row",
                flexBasis: 477,
                flexGrow: 1,
                flexShrink: 1,
                height: "auto"
              },
              type: "Flexbox",
              children: [
                {
                  path: "0.0.1.0.0",
                  resizeable: true,
                  style: {
                    minWidth: 50,
                    width: 150
                  },
                  type: "View",
                  children: [
                    {
                      path: "0.0.1.0.0.0",
                      style: {
                        height: "100%"
                      },
                      type: "Brown"
                    }
                  ]
                },
                {
                  path: "0.0.1.0.1",
                  resizeable: true,
                  style: {
                    backgroundColor: "cornflowerblue",
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "Component"
                },
                {
                  path: "0.0.1.0.2",
                  resizeable: true,
                  style: {
                    backgroundColor: "palegoldenrod",
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "Component"
                },
                {
                  path: "0.0.1.0.3",
                  resizeable: true,
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "Flexbox",
                  children: [
                    {
                      path: "0.0.1.0.3.0",
                      resizeable: true,
                      style: {
                        backgroundColor: "purple",
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      type: "Component"
                    },
                    {
                      path: "0.0.1.0.3.1",
                      resizeable: true,
                      style: {
                        backgroundColor: "lightgrey",
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      type: "Component"
                    }
                  ]
                }
              ]
            },
            {
              path: "0.0.1.1",
              resizeable: true,
              style: {
                flexBasis: 517,
                flexGrow: 1,
                flexShrink: 1,
                height: "auto"
              },
              type: "Tabs",
              children: [
                {
                  path: "0.0.1.1.0",
                  style: {
                    backgroundColor: "pink",
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "Component"
                },
                {
                  path: "0.0.1.1.1",
                  style: {
                    backgroundColor: "yellow",
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "Component"
                }
              ]
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
