export const layout1 = () => ({
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
          flexBasis: 0,
          flexGrow: 1,
          flexShrink: 1,
          display: "flex",
          flexDirection: "row"
        }
      },
      children: [
        {
          type: "Component",
          props: {
            resizeable: true,
            style: {
              backgroundColor: "red",
              width: "auto",
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
              backgroundColor: "yellow",
              width: "auto",
              flexBasis: 844,
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
