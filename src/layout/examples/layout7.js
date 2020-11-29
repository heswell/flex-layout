export const layout7 = () => ({
  type: "DraggableLayout",
  children: [
    {
      type: "Flexbox",
      props: {
        column: true,
        style: {
          flexDirection: "column",
          height: 1000,
          width: 1200,
          display: "flex"
        }
      },
      children: [
        {
          type: "Flexbox",
          props: {
            style: {
              flexDirection: "row",
              display: "flex",
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
                  width: 205,
                  flexBasis: "auto",
                  flexShrink: 1,
                  flexGrow: 1
                }
              },
              children: [
                {
                  type: "StandardToolbar",
                  props: {
                    style: {}
                  }
                },
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
                column: true,
                style: {
                  flexDirection: "column",
                  display: "flex",
                  flexBasis: 989,
                  flexGrow: 1,
                  flexShrink: 1,
                  width: "auto"
                }
              },
              children: [
                {
                  type: "View",
                  props: {
                    resizeable: true,
                    style: {
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    },
                    title: "Brown Bear"
                  },
                  children: [
                    {
                      type: "StandardToolbar",
                      props: {
                        style: {}
                      }
                    },
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
                  type: "View",
                  props: {
                    resizeable: true,
                    style: {
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    },
                    title: "Red Panda"
                  },
                  children: [
                    {
                      type: "StandardToolbar",
                      props: {
                        style: {}
                      }
                    },
                    {
                      type: "Component",
                      props: {
                        style: {
                          backgroundColor: "red",
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
                      flexDirection: "row",
                      display: "flex",
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  },
                  children: [
                    {
                      type: "Tabs",
                      props: {
                        enableAddTab: true,
                        resizeable: true,
                        style: {
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        },
                        keyBoardActivation: "manual"
                      },
                      children: [
                        {
                          type: "Component",
                          props: {
                            style: {
                              backgroundColor: "white",
                              flexBasis: 0,
                              flexGrow: 1,
                              flexShrink: 1
                            },
                            title: "Home"
                          }
                        },
                        {
                          type: "View",
                          props: {
                            title: "Transactions",
                            style: {
                              flexBasis: 0,
                              flexGrow: 1,
                              flexShrink: 1
                            }
                          },
                          children: [
                            {
                              type: "Toolbar",
                              props: {
                                style: {}
                              },
                              children: [
                                {
                                  type: "input",
                                  props: {
                                    type: "text",
                                    className: "tool-text",
                                    value: "text 1",
                                    style: {}
                                  }
                                },
                                {
                                  type: "input",
                                  props: {
                                    type: "text",
                                    className: "tool-text",
                                    value: "text 2",
                                    style: {}
                                  }
                                },
                                {
                                  type: "input",
                                  props: {
                                    type: "text",
                                    className: "tool-text",
                                    value: "text 3",
                                    style: {}
                                  }
                                },
                                {
                                  type: "input",
                                  props: {
                                    type: "text",
                                    className: "tool-text",
                                    value: "text 4",
                                    style: {}
                                  }
                                },
                                {
                                  type: "CloseIcon",
                                  props: {
                                    style: {}
                                  }
                                }
                              ]
                            },
                            {
                              type: "Component",
                              props: {
                                style: {
                                  backgroundColor: "yellow",
                                  flexBasis: 0,
                                  flexGrow: 1,
                                  flexShrink: 1
                                }
                              }
                            }
                          ]
                        },
                        {
                          type: "Component",
                          props: {
                            removable: true,
                            style: {
                              backgroundColor: "blue",
                              flexBasis: 0,
                              flexGrow: 1,
                              flexShrink: 1
                            },
                            title: "Loans"
                          }
                        },
                        {
                          type: "Component",
                          props: {
                            removable: true,
                            style: {
                              backgroundColor: "ivory",
                              flexBasis: 0,
                              flexGrow: 1,
                              flexShrink: 1
                            },
                            title: "Checks"
                          }
                        },
                        {
                          type: "Component",
                          props: {
                            removable: true,
                            style: {
                              backgroundColor: "lightgrey",
                              flexBasis: 0,
                              flexGrow: 1,
                              flexShrink: 1
                            },
                            title: "Liquidity"
                          }
                        }
                      ]
                    },
                    {
                      type: "Component",
                      props: {
                        resizeable: true,
                        style: {
                          backgroundColor: "green",
                          width: 50
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
          type: "Component",
          props: {
            style: {
              backgroundColor: "grey",
              height: 32
            }
          }
        }
      ]
    }
  ]
});
