import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import Welcome from '../components/welcomePage/welcome';
import AddCase from '../components/addCase/addCase';
import CasesList from '../components/caseList/caseList';

const scenes = Actions.create(
  <Scene key = 'root'>
    <Scene duration = {250} key = 'welcomePage' title = 'Bienvenido' component={Welcome}/>
    <Scene duration = {250} key = 'addCasePage' title = 'Agregar emergencia/adopción' component={AddCase}/>
    <Scene duration = {250} key = 'casesListPage' title = 'Lista de emergencias/adopciones' component={CasesList}/>
  </Scene>
);

export default scenes;