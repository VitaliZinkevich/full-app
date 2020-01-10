import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { cash, contacts, map, informationCircle } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import SessionDetail from './SessionDetail';
import MapView from './MapView';
import About from './About';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/price/" />
        {/* 
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.        
        */}
        <Route path="/tabs/price" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/examples" render={() => <SpeakerList />} exact={true} />
        <Route path="/tabs/examples/:id" component={SpeakerDetail} exact={true} />
        <Route path="/tabs/price/:id" component={SessionDetail} />
        {/* <Route path="/tabs/examples/sessions/:id" component={SessionDetail} /> */}
        {/* <Route path="/tabs/map" render={() => <MapView />} exact={true} /> */}
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="price" href="/tabs/price">
          <IonIcon icon={cash} />
          <IonLabel>Цены, заказ</IonLabel>
        </IonTabButton>
        <IonTabButton tab="examples" href="/tabs/examples">
          <IonIcon icon={contacts} />
          <IonLabel>Примеры работ</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={map} />
          <IonLabel>Map</IonLabel>
        </IonTabButton> */}
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />
          <IonLabel>Контакты</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;