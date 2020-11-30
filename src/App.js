import React, { useRef, useState } from "react";
import { Brown, Red } from "./sample-components";
import * as samples from "./layout/examples";
import { CloseIcon as CloseAction } from "./layout/icons";
import { registerComponent } from "./layout/registry/ComponentRegistry";

import {
  Component,
  DraggableLayout,
  Flexbox,
  Tabs,
  Toolbar,
  View
} from "./layout";

import "./styles.css";

export default function App() {
  const history = useRef([]);
  const [layout, setLayout] = useState();

  const handleLayoutChange = (layout) => {
    console.log(JSON.stringify(layout, null, 2));
    // history.current.push(layout);
  };

  const back = () => {
    history.current.pop();
    setLayout(history.current.pop());
  };

  const load = (layout) => {
    return setLayout(samples[layout]());
  };

  const StandardToolbar = () => (
    <Toolbar style={{ justifyContent: "flex-end" }} draggable showTitle>
      <CloseAction action="close" />
    </Toolbar>
  );
  registerComponent("StandardToolbar", StandardToolbar);

  return (
    <>
      <DraggableLayout onLayoutChange={handleLayoutChange} layout={layout}>
        <Flexbox
          className="App"
          column
          style={{ height: "90vh", width: "100vw" }}
        >
          <Flexbox style={{ flex: 1 }}>
            <View
              closeable
              header
              resizeable
              style={{ minWidth: 50, width: 200 }}
              title="Left Panel"
            >
              <Red style={{ height: "100%" }} />
            </View>
            <Flexbox resizeable column style={{ flex: 1 }}>
              <View header resizeable style={{ flex: 1 }} title="Brown Bear">
                <Toolbar
                  id="palegoldenrod"
                  tools={[
                    "close",
                    "close",
                    "close",
                    [
                      "PaddingTop",
                      "PaddingRight",
                      "PaddingBottom",
                      "PaddingLeft"
                    ],
                    "close",
                    "close",
                    "close",
                    "close",
                    "close"
                  ]}
                />
                <Brown style={{ height: "100%" }} />
              </View>
              <View header resizeable style={{ flex: 1 }} title="Red Panda">
                <Component style={{ backgroundColor: "red", height: "100%" }} />
              </View>

              <Flexbox resizeable style={{ flex: 1 }}>
                <Tabs
                  enableAddTab
                  resizeable
                  style={{ flex: 1 }}
                  keyBoardActivation="manual"
                >
                  <View removable header resizeable title="Home">
                    <Component
                      style={{ backgroundColor: "white", height: "100%" }}
                    />
                  </View>
                  <View title="Transactions">
                    <Toolbar>
                      {/* <input type="text" className="tool-text" value="text 1" />
                      <input type="text" className="tool-text" value="text 2" />
                      <input type="text" className="tool-text" value="text 3" />
                      <input type="text" className="tool-text" value="text 4" /> */}
                      <CloseAction />
                    </Toolbar>
                    <Component style={{ backgroundColor: "yellow", flex: 1 }} />
                  </View>
                  <View removable header resizeable title="Loans">
                    <Component
                      style={{ backgroundColor: "cream", height: "100%" }}
                    />
                  </View>
                  <View removable header resizeable title="Checks">
                    <Component
                      style={{ backgroundColor: "ivory", height: "100%" }}
                    />
                  </View>
                  <View removable header resizeable title="Liquidity">
                    <Component
                      style={{ backgroundColor: "lightgrey", height: "100%" }}
                    />
                  </View>
                </Tabs>
                <Component
                  resizeable
                  style={{ backgroundColor: "green", width: 50 }}
                />
              </Flexbox>
            </Flexbox>
          </Flexbox>
          <Component style={{ backgroundColor: "grey", height: 32 }} />
        </Flexbox>
      </DraggableLayout>

      <br />
      {Object.keys(samples).map((sample, i) => (
        <button key={i} onClick={() => load(sample)}>
          {sample}
        </button>
      ))}
    </>
  );
}

/*

      <DraggableLayout>
        <Flexbox
          column
          layoutModel={layout}
          style={{ height: 1000, width: 1200, flexDirection: "column" }}
          onLayoutChange={handleLayoutChange}
        >
          <Flexbox style={{ flex: 1 }}>
            <View resizeable style={{ minWidth: 50, width: 200 }}>
              <Red style={{ height: "100%" }} />
            </View>
            <Flexbox resizeable column style={{ flex: 1 }}>
              <Flexbox resizeable style={{ flex: 1 }}>
                <View
                  header={{ closeButton: true, title: "A Study in Brown" }}
                  resizeable
                  style={{ minWidth: 50, width: 150 }}
                >
                  <Brown style={{ height: "100%" }} />
                </View>
                <View resizeable style={{ flex: 1 }}>
                  <Toolbar
                    id="cornflowerblue"
                    stops={{ sm: 75, lg: 300 }}
                    getTools={(size) => {
                      switch (size) {
                        case "sm":
                          return [
                            [
                              "PaddingTop",
                              "PaddingRight",
                              "PaddingBottom",
                              "PaddingLeft"
                            ],
                            "close",
                            "close",
                            "close",
                            "close",
                            "close",
                            "close",
                            "close",
                            "close"
                          ];
                        default:
                          return [
                            "close",
                            "close",
                            "close",
                            [
                              "PaddingTop",
                              "PaddingRight",
                              "PaddingBottom",
                              "PaddingLeft"
                            ],
                            "close",
                            "close",
                            "close",
                            "close",
                            "close"
                          ];
                      }
                    }}
                  />
                  <Component
                    style={{ backgroundColor: "cornflowerblue", flex: 1 }}
                  />
                </View>

                <View resizeable style={{ flex: 1 }}>
                  <Toolbar
                    id="palegoldenrod"
                    tools={[
                      "close",
                      "close",
                      "close",
                      [
                        "PaddingTop",
                        "PaddingRight",
                        "PaddingBottom",
                        "PaddingLeft"
                      ],
                      "close",
                      "close",
                      "close",
                      "close",
                      "close"
                    ]}
                  />
                  <Component
                    style={{ backgroundColor: "palegoldenrod", flex: 1 }}
                  />
                </View>
                <Flexbox resizeable column style={{ flex: 1 }}>
                  <View resizeable style={{ flex: 1 }}>
                    <Toolbar
                      tools={[
                        "close",
                        "close",
                        "close",
                        "close",
                        "close",
                        "close",
                        "close",
                        "close",
                        "close",
                        "close"
                      ]}
                    />
                    <Component style={{ backgroundColor: "purple", flex: 1 }} />
                  </View>
                  <Component
                    resizeable
                    style={{ backgroundColor: "lightgrey", flex: 1 }}
                  />
                </Flexbox>
              </Flexbox>
              <Flexbox resizeable style={{ flex: 1 }}>
                <Tabs resizeable style={{ flex: 1 }}>
                  <Component
                    removable
                    style={{ backgroundColor: "white" }}
                    title="Snow White"
                  />
                  <View title="Yellow Fever" removable>
                    <Toolbar>
                      <input type="text" className="tool-text" value="text 1" />
                      <input type="text" className="tool-text" value="text 2" />
                      <input type="text" className="tool-text" value="text 3" />
                      <input type="text" className="tool-text" value="text 4" />
                      <CloseIcon />
                    </Toolbar>
                    <Component style={{ backgroundColor: "yellow", flex: 1 }} />
                  </View>
                  <Component
                    removable
                    style={{ backgroundColor: "blue" }}
                    title="Blue Monday"
                  />
                </Tabs>
                <Component
                  resizeable
                  style={{ backgroundColor: "green", width: 50 }}
                />
              </Flexbox>
            </Flexbox>
          </Flexbox>
          <Component style={{ backgroundColor: "grey", height: 32 }} />
        </Flexbox>
      </DraggableLayout>
*/
