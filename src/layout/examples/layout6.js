export const layout6 = () => ({
  props: {
    style: {
      height: 1000,
      width: 1200,
      display: "flex",
      flexDirection: "column"
    }
  },
  type: "Flexbox",
  children: [
    {
      props: {
        style: {
          display: "flex",
          flexDirection: "row",
          flexBasis: 0,
          flexGrow: 1,
          flexShrink: 1
        }
      },
      type: "Flexbox",
      children: [
        {
          props: {
            resizeable: true,
            style: {
              minWidth: 50,
              width: 115,
              flexBasis: "auto",
              flexShrink: 1,
              flexGrow: 1
            }
          },
          type: "View",
          children: [
            {
              props: {
                style: {
                  height: "100%"
                }
              },
              type: "Red"
            }
          ]
        },
        {
          props: {
            resizeable: true,
            style: {
              display: "flex",
              flexDirection: "column",
              flexBasis: 1079,
              flexGrow: 1,
              flexShrink: 1,
              width: "auto"
            }
          },
          type: "Flexbox",
          children: [
            {
              props: {
                resizeable: true,
                style: {
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: 0,
                  flexGrow: 1,
                  flexShrink: 1
                }
              },
              type: "Flexbox",
              children: [
                {
                  props: {
                    resizeable: true,
                    style: {
                      minWidth: 50,
                      width: 150
                    }
                  },
                  type: "View",
                  children: [
                    {
                      props: {
                        style: {
                          height: "100%"
                        }
                      },
                      type: "Brown"
                    }
                  ]
                },
                {
                  props: {
                    resizeable: true,
                    style: {
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  },
                  type: "View",
                  children: [
                    {
                      props: {
                        style: {}
                      },
                      type: "Toolbar"
                    },
                    {
                      props: {
                        style: {
                          backgroundColor: "cornflowerblue",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      },
                      type: "Component"
                    }
                  ]
                },
                {
                  props: {
                    resizeable: true,
                    style: {
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  },
                  type: "View",
                  children: [
                    {
                      props: {
                        style: {}
                      },
                      type: "Toolbar"
                    },
                    {
                      props: {
                        style: {
                          backgroundColor: "palegoldenrod",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      },
                      type: "Component"
                    }
                  ]
                },
                {
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
                  type: "Flexbox",
                  children: [
                    {
                      props: {
                        resizeable: true,
                        style: {
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      },
                      type: "View",
                      children: [
                        {
                          props: {
                            style: {}
                          },
                          type: "Toolbar"
                        },
                        {
                          props: {
                            style: {
                              backgroundColor: "purple",
                              flexBasis: 0,
                              flexGrow: 1,
                              flexShrink: 1
                            }
                          },
                          type: "Component"
                        }
                      ]
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
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: 0,
                  flexGrow: 1,
                  flexShrink: 1
                }
              },
              type: "Flexbox",
              children: [
                {
                  props: {
                    resizeable: true,
                    style: {
                      flexBasis: 0,
                      flexGrow: 1,
                      flexShrink: 1
                    }
                  },
                  type: "Tabs",
                  active: 0,
                  children: [
                    {
                      type: "Component",
                      props: {
                        title: "Snow White",
                        removable: true,
                        style: {
                          backgroundColor: "white",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      }
                    },
                    {
                      type: "View",
                      props: {
                        title: "Yellow Fever",
                        removable: true,
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
                              props: {
                                style: {}
                              },
                              type: "input"
                            },
                            {
                              props: {
                                style: {}
                              },
                              type: "input"
                            },
                            {
                              props: {
                                style: {}
                              },
                              type: "input"
                            },
                            {
                              props: {
                                style: {}
                              },
                              type: "input"
                            },
                            {
                              type: "CloseIcon",
                              props: {
                                style: {}
                              }
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "Component",
                      props: {
                        title: "Blue Monday",
                        removable: true,
                        style: {
                          backgroundColor: "blue",
                          flexBasis: 0,
                          flexGrow: 1,
                          flexShrink: 1
                        }
                      }
                    }
                  ]
                },
                {
                  props: {
                    resizeable: true,
                    style: {
                      backgroundColor: "green",
                      width: 50
                    }
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
