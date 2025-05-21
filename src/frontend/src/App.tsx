import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styled from "styled-components";
import React, { useEffect, useReducer } from "react";
import { InitialState } from "./config";
import { IState } from "./interfaces/state/IState";
import { StateReducer } from "./reducers/StateReducer";
import { IStateReducerAction } from "./interfaces/state/IStateReducerAction";
import { StateReducerActionType } from "./enums/StateReducerActionTypes";
import { DirectorySelectorView } from "./components/views/DirectorySelectorView";
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Routes as NavigationRoutes } from "./enums/Routes";
import { EditorView } from "./components/views/EditorView";
import { AllProjectsView } from "./components/views/AllProjectsView";
import { useAppSettings } from "./hooks/useAppSettings";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  position: fixed;
`;

export const UserContext = React.createContext<[IState, React.Dispatch<IStateReducerAction>?]>([InitialState,])

function App(){
  const stateReducer = useReducer(StateReducer, InitialState);
  const [_state, reducer] = stateReducer;
  const { projectId } = useParams();

  useAppSettings(reducer);

  return (
    <UserContext.Provider value={stateReducer}>
      <StyledContainer>
        <Router>
          <Routes>
            <Route path="/" element={<DirectorySelectorView />} />
            <Route path={NavigationRoutes.DirectorySelector} element={<DirectorySelectorView />} />
            <Route path={NavigationRoutes.AllProjects} element={<AllProjectsView />} />
            <Route path={NavigationRoutes.EditProject} element={<EditorView projectId={projectId} />} />
          </Routes>
        </Router>
      </StyledContainer>
    </UserContext.Provider>
  )
}

export default App;
