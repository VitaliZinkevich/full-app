import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonItem,
  IonText,
  IonList,
  IonActionSheet,
  IonLabel
} from "@ionic/react";
import "./About.scss";
import {
  person,
  call,
  pin,
  logoAndroid,
  logoApple,
  mail,
  logoInstagram
} from "ionicons/icons";
import { ActionSheetButton } from "@ionic/core";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<
    ActionSheetButton[]
  >([]);
  const [actionSheetHeader, setActionSheetHeader] = useState("");

  function openContact(speaker: {
    phone?: string;
    name: string;
    email?: string;
  }) {
    let options = [];
    if (speaker.email) {
      options.push({
        text: `Email ( ${speaker.email} )`,
        handler: () => {
          window.open("mailto:" + speaker.email);
        }
      });
    }
    if (speaker.phone) {
      options.push({
        text: `Телефон ( ${speaker.phone} )`,
        handler: () => {
          window.open("tel:" + speaker.phone);
        }
      });
    }
    setActionSheetButtons(options);
    setActionSheetHeader(`${speaker.name}`);
    setShowActionSheet(true);
  }

  function getOS() {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }

    return os;
  }

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

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
            <IonText className="about-item">
              ИП Стрижевский Андрей Игоревич
            </IonText>
          </IonItem>
          <IonItem>
            <IonIcon icon={pin} />
            <IonText className="about-item">Минск, Минская область</IonText>
          </IonItem>

          <IonItem
            button
            onClick={() =>
              openContact({ name: "Андрей", phone: "+375 29 8727844" })
            }
          >
            <IonIcon color="primary" icon={call} />
            <IonText color="primary" className="about-item">
              +375 29 8727844
            </IonText>
          </IonItem>

          <IonItem
            button
            onClick={() =>
              openContact({ name: "Андрей", email: "otdelkavdome@mail.ru" })
            }
          >
            <IonIcon color="primary" icon={mail} />
            <IonLabel color="primary" className="about-item">
              otdelkavdome@mail.ru
            </IonLabel>
          </IonItem>

          {/* <IonItem>
          <IonIcon icon={chatbubbles} />
          <IonText>Viber</IonText>
        </IonItem> */}

          <IonItem
            button
            onClick={() => openLink("https://www.instagram.com/strizh_andrei/")}
          >
            <IonIcon color="primary" icon={logoInstagram} />
            <IonText color="primary" className="about-item">
              Instagram
            </IonText>
          </IonItem>

          {/* ВСТАВИТЬ ССыЛКИ */}
          {/* <IonItem>
          <IonIcon icon={logoApple} />
          <IonText className='about-item'>Apple Store</IonText>
        </IonItem> */}
          {getOS() === "Windows" ||
          getOS() === "Mac OS" ||
          getOS() === "Linux" ? (
            <>
              <IonItem
                button
                onClick={() => {
                  openLink(
                    "https://play.google.com/store/apps/details?id=build.minsk.app"
                  );
                }}
              >
                <IonIcon color="primary" icon={logoAndroid} />
                <IonText color="primary" className="about-item">
                  Доступно в Google Play
                </IonText>
              </IonItem>

              {/* <IonItem button>
          <IonIcon color="primary"  icon={logoApple} />
          <IonText color="primary"  className='about-item'>Доступно в Apple Store</IonText>
        </IonItem> */}
            </>
          ) : null}

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
        </IonList>
        <IonActionSheet
          isOpen={showActionSheet}
          header={actionSheetHeader}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={actionSheetButtons}
        />
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
