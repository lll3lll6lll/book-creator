import React, { Suspense } from "react";
import { AppRouter } from "./app/router";
import { Navbar } from "./widgets/Navbar";

function App() {
  return (
    <div className="App">
      <Suspense fallback="">
        <Navbar />
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
