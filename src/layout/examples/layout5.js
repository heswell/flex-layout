export const layout5 = () => ({
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
          display: "flex",
          flexDirection: "row",
          flexBasis: 0,
          flexGrow: 1,
          flexShrink: 1
        }
      },
      children: [
        {
          type: "View",
          props: {
            resizeable: true,
            style: {
              minWidth: 50,
              width: 200
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
              display: "flex",
              flexDirection: "column",
              flexBasis: 0,
              flexGrow: 1,
              flexShrink: 1
            }
          },
          children: [
            {
              type: "Flexbox",
              props: {
                resizeable: true,
                style: {
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: 477,
                  flexGrow: 1,
                  flexShrink: 1,
                  height: "auto"
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
                      display: "flex",
                      flexDirection: "column",
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  },
                  children: [
                    {
                      props: {
                        resizeable: true,
                        style: {
                          backgroundColor: "purple",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      },
                      type: "Component"
                    },
                    {
                      props: {
                        resizeable: true,
                        style: {
                          backgroundColor: "lightgrey",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      },
                      type: "Component"
                    }
                  ]
                }
              ]
            },
            {
              props: {
                resizeable: true,
                style: {
                  flexBasis: 517,
                  flexGrow: 1,
                  flexShrink: 1,
                  height: "auto"
                }
              },
              type: "Tabs",
              children: [
                {
                  type: "Component",
                  props: {
                    title: "Flamingo",
                    style: {
                      backgroundColor: "pink",
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  }
                },
                {
                  type: "Component",
                  props: {
                    title: "Canary",
                    style: {
                      backgroundColor: "yellow",
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      props: {
        style: {
          backgroundColor: "green",
          height: 32
        }
      },
      type: "Component"
    }
  ]
});
