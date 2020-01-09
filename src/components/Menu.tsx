import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonToggle
} from '@ionic/react';
import { cash, contacts, hammer, help, informationCircle, logIn, logOut, map, person, personAdd } from 'ionicons/icons';
import React, { useState } from 'react';
import { connect } from '../data/connect';
import { RouteComponentProps, withRouter } from 'react-router';
import { setDarkMode } from '../data/user/user.actions';



const routes = {
  appPages: [
    { title: 'Цены, заказ', path: '/tabs/schedule', icon: cash },
    { title: 'Примеры работ', path: '/tabs/speakers', icon: contacts },
    // { title: 'Map', path: '/tabs/map', icon: map },
    { title: 'Контакты', path: '/tabs/about', icon: informationCircle }
  ],
  loggedInPages: [
    // { title: 'Account', path: '/account', icon: person },
    // { title: 'Support', path: '/support', icon: help },
    // { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    // { title: 'Login', path: '/login', icon: logIn },
    // { title: 'Support', path: '/support', icon: help },
    // { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: { ios: string, md: string },
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode }) => {
  const [disableMenu, setDisableMenu] = useState(false);

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection="none">
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={disableMenu} contentId="main">
      <IonHeader>
        {/* <IonToolbar>
          <IonTitle>Меню</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Меню</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        {/* <IonList>
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList> */}
        {/* <IonList>
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem onClick={() => {
            setDisableMenu(true);
            history.push('/tutorial');
          }}>
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList> */}
        {/* <IonList> */}
          <IonItem lines="none">
            <IonLabel>{darkMode ? 'Включить свет' : 'Выключить свет'}</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        {/* </IonList> */}
        {/* <div className="login-logo1">
          <img src="assets/img/appStore.svg" alt="appStore" height="250" width="200"/>
        </div>
        <div className="login-logo1">
          <img src="assets/img/google-play-badge.png" alt="google-play" height="250" width="200"/>
        </div> */}
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
