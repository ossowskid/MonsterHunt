import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
import { HuntingScreen } from "./components/HuntingScreen";
import { HomePage } from "./components/HomePage";
import { MainMenu } from "./components/MainMenu";
import { Armory } from "./components/items/Armory";
import { AdminPanel } from "./components/AdminPanel";
import { StorePage } from "./components/rynek/StorePage";
import { Stats } from "./components/stats/Stats";
import { CharacterViewPage } from "./components/CharacterViewPage";
import { useUser } from "./hooks/useUser";
import { Chat } from "./components/global-chat/Chat";
import { AboutUsPage } from "./components/about/AboutUsPage";

function App() {
  const user = useUser();

  return (
    <Router>
      <div className="content">
        <header className="header">
          <img src="./logo-monster-hunt.png" alt="" className="logo" />
        </header>
        <MainMenu />
        <main className="main__section">
          {user !== null ? (
            <Switch>
              <Route path="/character">
                <CharacterViewPage />
              </Route>
              <Route path="/store">
                <StorePage />
              </Route>
              <Route path="/hunt">
                <HuntingScreen />
              </Route>
              <Route path="/armory">
                <Armory />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutUsPage />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/register">
                <RegistrationPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
            </Switch>
          )}
          {user?.role === "admin" ? (
            <Switch>
              <Route path="/admin">
                <AdminPanel />
              </Route>
            </Switch>
          ) : (
            <></>
          )}
        </main>
        <aside className="advertising"></aside>
      </div>
    </Router>
  );
}

export default App;
