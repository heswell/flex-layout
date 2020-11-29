export const layout4 = () => ({
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
              type: "Flexbox",
              props: {
                resizeable: true,
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  height: "auto",
                  flexBasis: 336,
                  flexShrink: 1,
                  flexGrow: 1
                }
              },
              children: [
                {
                  type: "View",
                  props: {
                    resizeable: true,
                    style: {
                      minWidth: 50,
                      width: 150
                    }
                  },
                  children: [
                    {
                      type: "Brown",
                      props: {
                        style: {
                          height: "100%"
                        }
                      }
                    }
                  ]
                },
                {
                  type: "Component",
                  props: {
                    resizeable: true,
                    style: {
                      backgroundColor: "cornflowerblue",
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  }
                },
                {
                  type: "Component",
                  props: {
                    resizeable: true,
                    style: {
                      backgroundColor: "palegoldenrod",
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  }
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
                          backgroundColor: "purple",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      }
                    },
                    {
                      type: "Component",
                      props: {
                        resizeable: true,
                        style: {
                          backgroundColor: "lightgrey",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
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
                resizeable: true,
                style: {
                  backgroundColor: "pink",
                  flexBasis: 322,
                  flexGrow: 1,
                  flexShrink: 1,
                  height: "auto"
                }
              }
            },
            {
              type: "Component",
              props: {
                resizeable: true,
                style: {
                  backgroundColor: "yellow",
                  flexBasis: 329,
                  flexGrow: 1,
                  flexShrink: 1,
                  height: "auto"
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
          height: 32,
          flexShrink: 0
        }
      }
    }
  ]
});
