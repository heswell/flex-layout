export const layout2 = () => ({
  type: "Flexbox",
  props: {
    vertical: true,
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
      vertical: true,
      props: {
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
              backgroundColor: "purple",
              height: "auto",
              flexBasis: 350,
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
              backgroundColor: "pink",
              height: "auto",
              flexBasis: 612,
              flexShrink: 1,
              flexGrow: 1
            }
          }
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
