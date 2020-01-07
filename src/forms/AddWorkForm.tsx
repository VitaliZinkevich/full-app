import React, { useState } from 'react';
import { IonIcon, IonSelect, IonDatetime, IonSelectOption,IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
// import './Login.scss';
import { calendar, pin, more } from 'ionicons/icons';
// import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
// import { RouteComponentProps } from 'react-router';

// interface OwnProps extends RouteComponentProps {}

// interface DispatchProps {
//   setIsLoggedIn: typeof setIsLoggedIn;
//   setUsername: typeof setUsername;
// }

// interface LoginProps extends OwnProps,  DispatchProps { }

const AddWorkForm: React.FC/*<LoginProps>*/ = ({/*setIsLoggedIn, history, setUsername: setUsernameAction*/}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
    //   await setIsLoggedIn(true);
    //   await setUsernameAction(username);
    //   history.push('/tabs/schedule', {direction: 'none'});
    }
  };
  const conferenceDate = '2047-05-17';

  return (
    <>
       {/* <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div> */}
        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonList lines="none">
            <IonItem>
              <IonIcon icon={calendar} slot="start"></IonIcon>
              <IonLabel position="stacked">Date</IonLabel>
              <IonDatetime displayFormat="MMM DD, YYYY" max="2056" value={conferenceDate}></IonDatetime>
            </IonItem>

            <IonItem>
              <IonIcon icon={pin} slot="start"></IonIcon>
              <IonLabel position="stacked">Location</IonLabel>
              <IonSelect>
                <IonSelectOption value="madison" selected>Madison, WI</IonSelectOption>
                <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Заказать</IonButton>
            </IonCol>
            {/* <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol> */}
          </IonRow>
        </form>
      </>
  );
};

export default AddWorkForm