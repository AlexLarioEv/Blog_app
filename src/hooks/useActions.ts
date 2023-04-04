import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import * as ArtucleActionCreators from "../store/actionCreators/artucle";
import * as AuthenticationActionCreators from "../store/actionCreators/authentication";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { ...ArtucleActionCreators, ...AuthenticationActionCreators },
    dispatch
  );
};

export default useActions;
