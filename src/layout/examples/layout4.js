export const layout4 = () => ({
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
                flex: 1,
                display: "flex",
                flexDirection: "row",
                height: "auto",
                flexBasis: 336,
                flexShrink: 1,
                flexGrow: 1
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
                      path: "0",
                      style: {
                        height: "100%"
                      },
                      type: "Brown"
                    },
                    "0.0.1.0.0.0"
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
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
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
                backgroundColor: "pink",
                flexBasis: 322,
                flexGrow: 1,
                flexShrink: 1,
                height: "auto"
              },
              type: "Component"
            },
            {
              path: "0.0.1.2",
              resizeable: true,
              style: {
                backgroundColor: "yellow",
                flexBasis: 329,
                flexGrow: 1,
                flexShrink: 1,
                height: "auto"
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
