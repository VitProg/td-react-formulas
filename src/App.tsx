import './App.css';
import { Container, CssBaseline, Tab, Tabs } from "@mui/material";
import { BrowserRouter, Link as RouterLink, Route, Switch } from "react-router-dom";
import { Damage } from "./stats/Damage";
import { Level } from "./stats/Level";
import { PSpeed } from "./stats/PSpeed";
import { Slowing } from "./stats/Slowing";
import { Poison } from "./stats/Poison";
import { FireRate } from "./stats/FireRate";
import { Lightning } from "./stats/Lightning.tsx";
import { SyntheticEvent, useState } from "react";
import { Shocking } from "./stats/Shocking.tsx";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let i = 0

  return (
    <BrowserRouter>
      <Container component="main" maxWidth="lg">
        <CssBaseline/>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" component={RouterLink} value={i++} to="/"/>
          <Tab label="Level" component={RouterLink} value={i++} to="/level"/>
          <Tab label="Damage" component={RouterLink} value={i++} to="/damage"/>
          <Tab label="Fire Rate" component={RouterLink} value={i++} to="/fire-rate"/>
          <Tab label="Projectile Speed" component={RouterLink} value={i++} to="/projectile-speed"/>
          <Tab label="Slowing" component={RouterLink} value={i++} to="/slowing"/>
          <Tab label="Poison" component={RouterLink} value={i++} to="/poison"/>
          <Tab label="Lightning" component={RouterLink} value={i++} to="/lightning"/>
          <Tab label="Shocking" component={RouterLink} value={i++} to="/shocking"/>
        </Tabs>
        <Switch>
          <Route path="/level" component={Level}/>
          <Route path="/damage" component={Damage}/>
          <Route path="/fire-rate" component={FireRate}/>
          <Route path="/projectile-speed" component={PSpeed}/>
          <Route path="/slowing" component={Slowing}/>
          <Route path="/poison" component={Poison}/>
          <Route path="/lightning" component={Lightning}/>
          <Route path="/shocking" component={Shocking}/>
          <Route path="/">HOME</Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
