import React, { useRef, useState } from "react";
import { Brown, Red } from "./sample-components";
import * as sample from "./layout/examples";

import { Component, Flexbox, View } from "./layout";

import "./styles.css";

export default function App() {
  const history = useRef([]);
  const [layout, setLayout] = useState();

  const handleLayoutChange = (layout) => {
    console.log(JSON.stringify(layout, null, 2));
    history.current.push(layout);
  };

  const back = () => {
    history.current.pop();
    setLayout(history.current.pop());
  };

  const load = (layout) => {
    return setLayout(sample[layout]());
  };

  return (
    <>
      <Flexbox
        column
        layoutModel={layout}
        style={{ height: 1000, width: 1200 }}
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
              <Component
                id="cornflowerblue"
                resizeable
                style={{ backgroundColor: "cornflowerblue", flex: 1 }}
              />
              <Component
                id="palegoldenrod"
                resizeable
                style={{ backgroundColor: "palegoldenrod", flex: 1 }}
              />
              <Flexbox resizeable column style={{ flex: 1 }}>
                <Component
                  id="purple"
                  resizeable
                  style={{ backgroundColor: "purple", flex: 1 }}
                />
                <Component
                  id="lightgrey"
                  resizeable
                  style={{ backgroundColor: "lightgrey", flex: 1 }}
                />
              </Flexbox>
            </Flexbox>
            <Component
              id="pink"
              resizeable
              style={{ backgroundColor: "pink", flex: 1 }}
            />
            <Component
              id="yellow"
              resizeable
              style={{ backgroundColor: "yellow", flex: 1 }}
            />
          </Flexbox>
        </Flexbox>
        <Component style={{ backgroundColor: "green", height: 32 }} />
      </Flexbox>
      <br />
      <button onClick={back}>Back</button>
      <button onClick={() => load("layout1")}>Test1</button>
      <button onClick={() => load("layout2")}>Test2</button>
      <button onClick={() => load("layout3")}>Test3</button>
      <button onClick={() => load("layout4")}>Test4</button>
    </>
  );
}
