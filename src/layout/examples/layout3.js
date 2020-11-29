export const layout3 = () => ({
  type: "Flexbox",
  props: {
    style: {
      height: 1000,
      width: 1200,
      display: "flex",
      flexDirection: "column"
    }
  },
  children: [
    {
      type: "Flexbox",
      props: {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "row"
        }
      },
      children: [
        {
          type: "View",
          props: {
            resizeable: true,
            style: {
              minWidth: 50,
              width: 100
            }
          },
          children: [
            {
              type: "Red",
              props: {
                style: {
                  height: "100%"
                }
              }
            }
          ]
        },
        {
          type: "Flexbox",
          props: {
            resizeable: true,
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }
          },
          children: [
            {
              type: "Component",
              props: {
                resizeable: true,
                style: {
                  backgroundColor: "pink",
                  height: "auto",
                  flexBasis: 392,
                  flexShrink: 1,
                  flexGrow: 1
                }
              }
            },
            {
              type: "Component",
              props: {
                resizeable: true,
                style: {
                  backgroundColor: "yellow",
                  height: "auto",
                  flexBasis: 602,
                  flexShrink: 1,
                  flexGrow: 1
                }
              }
            }
          ]
        }
      ]
    },
    {
      type: "Component",
      props: {
        style: {
          backgroundColor: "green",
          height: 32
        }
      }
    }
  ]
});
