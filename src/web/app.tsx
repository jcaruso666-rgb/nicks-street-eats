import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Order from "./pages/order";
import { Provider } from "./components/provider";

function App() {
        return (
                <Provider>
                        <Switch>
                                <Route path="/" component={Index} />
                                <Route path="/order" component={Order} />
                        </Switch>
                </Provider>
        );
}

export default App;
