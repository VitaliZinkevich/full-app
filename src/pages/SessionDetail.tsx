import React, {useState} from 'react';
import { IonActionSheet, IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import './SessionDetail.scss';
import { Time } from '../components/Time';
import { addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import { Session } from '../models/Session';
import { ActionSheetButton } from '@ionic/core';
import { IonIcon } from '@ionic/react';
import { contacts } from 'ionicons/icons';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  session?: Session;
  favoriteSessions: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type SessionDetailProps = OwnProps & StateProps & DispatchProps;

const SessionDetail: React.FC<SessionDetailProps> = ({ session, addFavorite, removeFavorite, favoriteSessions }) => {

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openContact(speaker: Session) {
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

  if (!session) {
    return <div>Ничего не найдено</div>
  }

  // const isFavorite = favoriteSessions.indexOf(session.id) > -1;
  
  // const toggleFavorite = () => { 
  //   isFavorite ? removeFavorite(session.id) : addFavorite(session.id);
  // };
  // const shareSession = () => { };
  // const sessionClick = (text: string) => { 
  //   console.log(`Clicked ${text}`);
  // };

  return (
    <IonPage id="session-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/price"></IonBackButton>
          </IonButtons>
          {/* <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareSession}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{session.name}</h1>
            {/* {session.tracks.map(track => (
              <span key={track} className={`session-track-${track.toLowerCase()} category`}>{track} </span>
            ))} */}
          <p>{session.description}</p>
          <IonText color="medium">
            <Time date={session.dateTimeStart} /> &ndash; <Time date={session.dateTimeEnd} />
            <br />
            {session.location}
          </IonText>
        </div>
        {/* <IonItem> */}
              

      

        {/* </IonItem> */}
        <IonList>
          {/* <IonItem onClick={() => sessionClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => sessionClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => sessionClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => sessionClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => sessionClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem> */}
          <IonItem onClick={() => openContact(session)} button={true} lines="none">
            <IonLabel color="primary">Позвонить</IonLabel>
          </IonItem>
          {session.tracks.map((track)=>{
                return (
                  <IonItem key={track} routerLink={track}>
                    <IonIcon color="primary" icon={contacts} />
                    <IonText color="medium" style={{'marginLeft': '1%'}}>
                      Пример работы
                    </IonText>
                  </IonItem>
                )
              })}
        </IonList>
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

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    session: selectors.getSession(state, OwnProps),
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(SessionDetail)
})