import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import App from "./main";
import ReactDOM from "react-dom";

//Redux Store
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

//Match state, dispatch to props
const mapStateToProps = (state) => {
    return {
        state: state
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

class Presentation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
};

export default Presentation;

ReactDOM.render(
    <Presentation />,
    document.getElementById("root"));