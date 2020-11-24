export const layout6 = () => ({
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
            width: 115,
            flexBasis: "auto",
            flexShrink: 1,
            flexGrow: 1
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
            flexBasis: 1079,
            flexGrow: 1,
            flexShrink: 1,
            width: "auto"
          },
          type: "Flexbox",
          children: [
            {
              path: "0.0.1.0",
              resizeable: true,
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
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "View",
                  children: [
                    {
                      path: "0.0.1.0.1.0",
                      style: {},
                      type: "Toolbar"
                    },
                    {
                      path: "0.0.1.0.1.1",
                      style: {
                        backgroundColor: "cornflowerblue",
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      type: "Component"
                    }
                  ]
                },
                {
                  path: "0.0.1.0.2",
                  resizeable: true,
                  style: {
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "View",
                  children: [
                    {
                      path: "0.0.1.0.2.0",
                      style: {},
                      type: "Toolbar"
                    },
                    {
                      path: "0.0.1.0.2.1",
                      style: {
                        backgroundColor: "palegoldenrod",
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      type: "Component"
                    }
                  ]
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
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      type: "View",
                      children: [
                        {
                          path: "0.0.1.0.3.0.0",
                          style: {},
                          type: "Toolbar"
                        },
                        {
                          path: "0.0.1.0.3.0.1",
                          style: {
                            backgroundColor: "purple",
                            flexBasis: 0,
                            flexGrow: 1,
                            flexShrink: 1
                          },
                          type: "Component"
                        }
                      ]
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
                display: "flex",
                flexDirection: "row",
                flexBasis: 0,
                flexGrow: 1,
                flexShrink: 1
              },
              type: "Flexbox",
              children: [
                {
                  path: "0.0.1.1.0",
                  resizeable: true,
                  style: {
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1
                  },
                  type: "Tabs",
                  active: 0,
                  children: [
                    {
                      path: "0.0.1.1.0.0",
                      removable: true,
                      style: {
                        backgroundColor: "white",
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      title: "Snow White",
                      type: "Component"
                    },
                    {
                      path: "0.0.1.1.0.1",
                      removable: true,
                      style: {
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      title: "Yellow Fever",
                      type: "View",
                      children: [
                        {
                          path: "0.0.1.1.0.1.0",
                          style: {},
                          type: "Toolbar",
                          children: [
                            {
                              path: "0.0.1.1.0.1.0.0",
                              style: {},
                              type: "input"
                            },
                            {
                              path: "0.0.1.1.0.1.0.1",
                              style: {},
                              type: "input"
                            },
                            {
                              path: "0.0.1.1.0.1.0.2",
                              style: {},
                              type: "input"
                            },
                            {
                              path: "0.0.1.1.0.1.0.3",
                              style: {},
                              type: "input"
                            },
                            {
                              path: "0.0.1.1.0.1.0.4",
                              style: {},
                              type: "CloseIcon"
                            }
                          ]
                        },
                        {
                          path: "0.0.1.1.0.1.1",
                          style: {
                            backgroundColor: "yellow",
                            flexBasis: 0,
                            flexGrow: 1,
                            flexShrink: 1
                          },
                          type: "Component"
                        }
                      ]
                    },
                    {
                      path: "0.0.1.1.0.2",
                      removable: true,
                      style: {
                        backgroundColor: "blue",
                        flexBasis: 0,
                        flexGrow: 1,
                        flexShrink: 1
                      },
                      title: "Blue Monday",
                      type: "Component"
                    }
                  ]
                },
                {
                  path: "0.0.1.1.1",
                  resizeable: true,
                  style: {
                    backgroundColor: "green",
                    width: 50
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
