import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import ReactDOM from "react-dom";

import App from "./main";

// Redux Store
const SET_ID = "SET_ID";
const UNSET_ID = "UNSET_ID";
const defaultState = {
    _id: null
};
const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
    case SET_ID:
        return Object.assign({}, state, { _id: action.id });
    case UNSET_ID:
        return Object.assign({}, state, defaultState);
    default:
        return state;
    }
};
const setAction = (id) => {
    return {
        type: "SET_ID",
        id
    };
};
const unsetAction = () => {
    return {
        type: "UNSET_ID"
    };
};
const store = createStore(mainReducer);
store.subscribe(() => console.log(store.getState()));

// Match state, dispatch to props
const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setID: (id) => {
            dispatch(setAction(id));
        },
        unsetID: () => {
            dispatch(unsetAction());
        }
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

const Presentation = () => {
    return (
        <Provider store={store}>
            <Container />
        </Provider>
    );
};

export default Presentation;

ReactDOM.render(
    <Presentation />,
    document.getElementById("root")
);
