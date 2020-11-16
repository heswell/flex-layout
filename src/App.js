import React from "react";

import { Component, Flexbox } from "./layout";

import "./styles.css";

export default function App() {
  return (
    <Flexbox column style={{ height: 1000, width: 1200 }}>
      <Flexbox style={{ flex: 1 }}>
        <Component resizeable style={{ backgroundColor: "red", width: 100 }} />
        <Flexbox resizeable column style={{ flex: 1 }}>
          <Flexbox resizeable style={{ flex: 1 }}>
            <Component
              resizeable
              style={{ backgroundColor: "brown", flex: 1 }}
            />
            <Component
              resizeable
              style={{ backgroundColor: "cornflowerblue", flex: 1 }}
            />
            <Component
              resizeable
              style={{ backgroundColor: "palegoldenrod", flex: 1 }}
            />
            <Flexbox resizeable column style={{ flex: 1 }}>
              <Component
                resizeable
                style={{ backgroundColor: "purple", flex: 1 }}
              />
              <Component
                resizeable
                style={{ backgroundColor: "cornflowerblue", flex: 1 }}
              />
            </Flexbox>
          </Flexbox>
          <Component
            resizeable
            style={{ backgroundColor: "yellow", flex: 1 }}
          />
          <Component
            resizeable
            style={{ backgroundColor: "yellow", flex: 1 }}
          />
        </Flexbox>
      </Flexbox>
      <Component style={{ backgroundColor: "green", height: 32 }} />
    </Flexbox>
  );
}
