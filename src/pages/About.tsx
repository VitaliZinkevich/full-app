import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonIcon, IonItem, IonText, IonList } from '@ionic/react';
import './About.scss';
import { person, call, pin, logoAndroid, logoApple } from 'ionicons/icons';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  // const [showPopover, setShowPopover] = useState(false);
  // const [popoverEvent, setPopoverEvent] = useState();

  // const presentPopover = (e: React.MouseEvent) => {
  //   setPopoverEvent(e.nativeEvent);
  //   setShowPopover(true);
  // };
  // const conferenceDate = '2047-05-17';

  return (
    <IonPage id="about-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Контакты</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton icon-only onClick={presentPopover}>
              <IonIcon slot="icon-only" icon={more}></IonIcon>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        {/* <div className="about-header">
          <img src="assets/img/ionic-logo-white.svg" alt="ionic logo" />
        </div> */}
        {/* <div className="about-info"> */}
        <IonItem>
          <IonIcon icon={person} />
          <IonText className='about-item'>ИП Стрижевский Андрей Игоревич</IonText>
        </IonItem>

        <IonItem>
          <IonIcon icon={call} />
          <IonText className='about-item'>+375 29 8727844</IonText>
        </IonItem>

        {/* <IonItem>
          <IonIcon icon={chatbubbles} />
          <IonText>Viber</IonText>
        </IonItem> */}
        
        <IonItem>
          <IonIcon icon={pin} />
          <IonText className='about-item'>Минск, Минская область</IonText>
        </IonItem>
        {/* ВСТАВИТЬ ССыЛКИ */}
        {/* <IonItem>
          <IonIcon icon={logoApple} />
          <IonText className='about-item'>Apple Store</IonText>
        </IonItem>

        <IonItem>
          <IonIcon icon={logoAndroid} />
          <IonText className='about-item'>Google Play</IonText>
        </IonItem> */}
        
          {/* <h4 className="ion-padding-start">What is Lorem Ipsum?</h4> */}

          {/* <IonList lines="none">
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
          </IonList> */}

          {/* <p className="ion-padding-start ion-padding-end">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p> */}
          

        {/* </div> */}
              
        </ IonList>
        
      </IonContent>
      {/* <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} /> 
      </IonPopover> */}
    </IonPage>
  );
};

export default React.memo(About);