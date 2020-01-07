import React, { useState } from 'react';
import { Session } from '../models/Session';
import { Speaker } from '../models/Speaker';
import { IonCard, IonCardHeader, IonItem, IonAvatar, IonCardContent, IonList, IonRow, IonCol, IonButton, IonIcon, IonActionSheet } from '@ionic/react';
import { logoTwitter, shareAlt, chatboxes } from 'ionicons/icons';
import { ActionSheetButton } from '@ionic/core';
import "./SpeakerItem.scss"


interface SpeakerItemProps {
  speaker: Speaker;
  sessions: Session[];
}

const SpeakerItem: React.FC<SpeakerItemProps> = ({ speaker, sessions }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openSpeakerShare(speaker: Speaker) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${speaker.name}`);
    setShowActionSheet(true);
  }

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

  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} routerLink={`/tabs/speakers/${speaker.id}`} lines="none">
            {/* <IonAvatar> */}
              <img className="avatarFoto" src={speaker.profilePic} alt={`${speaker.profilePic}`} height="100%"  />
            {/* </IonAvatar> */}
            {/* {speaker.name} */}
          </IonItem>
        </IonCardHeader>

        <IonCardContent class="outer-content">
          <IonList>
            {/* {sessions.map(session => (
              <IonItem routerLink={`/tabs/speakers/sessions/${session.id}`} key={session.name}>
                <h3>{session.name}</h3>
              </IonItem>
            ))} */}
            <IonItem className="blocktext" lines="none" button detail={false} routerLink={`/tabs/speakers/${speaker.id}`}>
              <h2>{speaker.name}</h2>            
            </IonItem>
            
          </IonList>
        </IonCardContent>

        <IonRow justify-content-center>
          {/* <IonCol text-left size="4">
            <IonButton
              fill="clear"
              size="small"
              color="primary"
              href={`https://www.twitter.com/${speaker.twitter}`}
              target="_blank"
            >
              <IonIcon slot="start" icon={logoTwitter} />
              Tweet
          </IonButton>
          </IonCol>
          <IonCol text-left size="4">
            <IonButton fill="clear" size="small" color="primary" onClick={() => openSpeakerShare(speaker)}>
              <IonIcon slot="start" icon={shareAlt} />
              Share
          </IonButton>
          </IonCol> */}
          {/* <IonCol text-left size="4"> */}
            <IonButton fill="clear" size="small" color="primary" onClick={() => openContact(speaker)}>
              <IonIcon className="mr-15" icon={chatboxes} />
              Контакты
            </IonButton>
          {/* </IonCol> */}
        </IonRow>
      </IonCard>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </>
  );
};

export default SpeakerItem;