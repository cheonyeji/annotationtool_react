import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import LandingPage from "./pages/LandingPage";
import WorkingPage from "./pages/WorkingPage";
import LoginPage from "./pages/LoginPage";
import WorkingPageTest from "./pages/WorkingPageTest";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import UserContextProvider from "./userContext";
import RectInfoContextProvider from "./rectContext";
import { LabelContextProvider } from "./store/labelContext";
import { FileContextProvider } from "./store/fileContext";
import { CurrentContextProvider } from "./store/currentContext";
export default function App() {
  return (
    <>
      <UserContextProvider>
        <RectInfoContextProvider>
          <LabelContextProvider>
            <FileContextProvider>
              <CurrentContextProvider>
                <Router>
                  <div>
                    <Header />
                    <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path="/work" component={WorkingPage} />
                      <Route exact path="/test" component={WorkingPageTest} />
                      <Route exact path="/login" component={LoginPage} />
                    </Switch>
                    <Footer />
                  </div>
                </Router>
              </CurrentContextProvider>
            </FileContextProvider>
          </LabelContextProvider>
        </RectInfoContextProvider>
      </UserContextProvider>
      <GlobalStyles />
    </>
  );
}
