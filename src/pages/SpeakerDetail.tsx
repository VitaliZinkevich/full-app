import React, {useState} from 'react';
import { RouteComponentProps } from 'react-router';
import { IonActionSheet, IonIcon, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import './SpeakerDetail.scss';
import { logoVk , logoSkype, logoInstagram, call } from 'ionicons/icons';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import { Speaker } from '../models/Speaker';
import { ActionSheetButton } from '@ionic/core';

interface OwnProps extends RouteComponentProps {
  speaker?: Speaker;
};

interface StateProps {};

interface DispatchProps {};

interface SpeakerDetailProps extends OwnProps, StateProps, DispatchProps {};

const SpeakerDetail: React.FC<SpeakerDetailProps> = ({ speaker }) => {

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openContact(speaker: Speaker) {
    setActionSheetButtons([
      // {
      //   text: `Email ( ${speaker.email} )`,
      //   handler: () => {
      //     window.open('mailto:' + speaker.email);
      //   }
      // },
      {
        text: `Телефон ( ${speaker.phone} )`,
        handler: () => {
          window.open('tel:' + speaker.phone);
        }
      }
    ]);
    setActionSheetHeader(`${speaker.name}`);
    setShowActionSheet(true);
  }

  if (!speaker) {
    return <div>Пример не найден</div>
  }

  return (
    <IonPage id="speaker-detail">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/examples" />
          </IonButtons>
          <IonTitle>{speaker.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding speaker-detail speaker-page-list">
        <div className="ion-text-left">
          
          {/* <img src={speaker.profilePic} alt={speaker.name} />
          <br /> */}
          <IonButton fill="clear" size="small" color="primary" onClick={() => openContact(speaker)}>
              <IonIcon  icon={call} />
          </IonButton>
          {/* <IonButton fill="clear" size="small" color="twitter">
            <IonIcon icon={logoVk} slot="icon-only"></IonIcon>
          </IonButton>
          <IonButton fill="clear" size="small" color="github">
            <IonIcon icon={logoSkype} slot="icon-only"></IonIcon>
          </IonButton> */}
          {/* Вставить ссылку */}
          <IonButton fill="clear" size="small" color="instagram">
            <IonIcon icon={logoInstagram} slot="icon-only"></IonIcon>
          </IonButton>
          
        </div>

        <div>{speaker.about.map ((elem, index:number)=>{
          return (
              <div key={index}>
                <p>{elem.name}</p>
                <p>{elem.descr}</p>
                {elem.foto.map(link=>{
                  return (
                    <div key={link+Math.random()}>
                      <img className="detailesFoto" key={link+Math.random()} src={link} alt="foto example" height="100%" width="100%" />
                    </div>
                  )
                })}
              </div>
          )
        })}</div>
        <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
      </IonContent>
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    speaker: selectors.getSpeaker(state, ownProps)
  }),
  component: SpeakerDetail
});
