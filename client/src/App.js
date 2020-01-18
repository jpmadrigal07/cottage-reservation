import React, { useEffect } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cottages from "./components/Cottages";
import Reservations from "./components/Reservations";
import AddCottage from "./components/AddCottage";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions/authActions";
import Loading from "./components/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = ({ fetchUser, auth }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const renderComponent = (component, isExact, props) => {
    if (!auth.isLoading && auth.user) {
      if (
        props.location.pathname === "/" ||
        props.location.pathname === "/register"
      ) {
        return <Cottages {...props} title="Cottage Reservation - Cottages" />;
      }
      return component;
    } else if (auth.isLoading && !auth.user) {
      return <Loading {...props} title="Loading..." />;
    } else {
      if (props.location.pathname === "/") {
        return <Login {...props} title="Cottage Reservation - Login" />;
      } else if (props.location.pathname === "/register") {
        return <Register {...props} title="Cottage Reservation - Register" />;
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          exact
          path="/"
          render={props =>
            renderComponent(
              <Login {...props} title="Cottage Reservation - Login" />,
              true,
              props
            )
          }
        />
        <Route
          exact
          path="/register"
          render={props =>
            renderComponent(
              <Register {...props} title="Cottage Reservation - Register" />,
              true,
              props
            )
          }
        />
        <Route
          path="/cottages"
          render={props =>
            renderComponent(
              <Cottages {...props} title="Cottage Reservation - Cottages" />,
              false,
              props
            )
          }
        />
        <Route
          path="/reservations"
          render={props =>
            renderComponent(
              <Reservations {...props} title="Cottage Reservation - Reservation" />,
              false,
              props
            )
          }
        />
        <Route
          path="/add-cottage"
          render={props =>
            renderComponent(
              <AddCottage {...props} title="Cottage Reservation - Add Cottage" />,
              false,
              props
            )
          }
        />
        <Route
          path="/requests"
          render={props =>
            renderComponent(
              <Reservations {...props} title="Cottage Reservation - Requests" />,
              false,
              props
            )
          }
        />
      </div>
    </BrowserRouter>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
