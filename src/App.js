import React, { useRef, useState } from "react";
import { Brown, Red } from "./sample-components";
import * as sample from "./layout/examples";
import { CloseIcon as CloseAction } from "./layout/icons";

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
    // console.log(JSON.stringify(layout, null, 2));
    // history.current.push(layout);
  };

  const back = () => {
    history.current.pop();
    setLayout(history.current.pop());
  };

  const load = (layout) => {
    return setLayout(sample[layout]());
  };

  const StandardToolbar = () => (
    <Toolbar style={{ justifyContent: "flex-end" }} draggable>
      <CloseAction action="close" />
    </Toolbar>
  );

  return (
    <>
      <DraggableLayout>
        <Flexbox column style={{ height: 1000, width: 1200 }}>
          <Flexbox style={{ flex: 1 }}>
            <View resizeable style={{ minWidth: 50, width: 200 }}>
              <StandardToolbar />
              <Red style={{ height: "100%" }} />
            </View>
            <Flexbox resizeable column style={{ flex: 1 }}>
              <View resizeable style={{ flex: 1 }} title="Brown Bear">
                <StandardToolbar />
                <Brown style={{ height: "100%" }} />
              </View>
              <View resizeable style={{ flex: 1 }} title="Red Panda">
                <StandardToolbar />
                <Component style={{ backgroundColor: "red", height: "100%" }} />
              </View>

              <Flexbox resizeable style={{ flex: 1 }}>
                <Tabs
                  enableAddTab
                  resizeable
                  style={{ flex: 1 }}
                  keyBoardActivation="manual"
                >
                  <Component
                    style={{ backgroundColor: "white" }}
                    title="Home"
                  />
                  <View title="Transactions">
                    <Toolbar>
                      <input type="text" className="tool-text" value="text 1" />
                      <input type="text" className="tool-text" value="text 2" />
                      <input type="text" className="tool-text" value="text 3" />
                      <input type="text" className="tool-text" value="text 4" />
                      <CloseAction />
                    </Toolbar>
                    <Component style={{ backgroundColor: "yellow", flex: 1 }} />
                  </View>
                  <Component
                    removable
                    style={{ backgroundColor: "blue" }}
                    title="Loans"
                  />
                  <Component
                    removable
                    style={{ backgroundColor: "ivory" }}
                    title="Checks"
                  />
                  <Component
                    removable
                    style={{ backgroundColor: "lightgrey" }}
                    title="Liquidity"
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

      <br />
      <button onClick={back}>Back</button>
      <button onClick={() => load("layout1")}>Test1</button>
      <button onClick={() => load("layout2")}>Test2</button>
      <button onClick={() => load("layout3")}>Test3</button>
      <button onClick={() => load("layout4")}>Test4</button>
      <button onClick={() => load("layout5")}>Test5</button>
      <button onClick={() => load("layout6")}>Test6</button>
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
