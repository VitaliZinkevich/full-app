import React, { useState, useRef } from 'react';
import { IonList, IonListHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react';
import { connect } from '../data/connect';
import { options } from 'ionicons/icons';
import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import './SchedulePage.scss'
import * as selectors from '../data/selectors';
import { setSearchText, addFavorite, removeFavorite } from '../data/sessions/sessions.actions';
import ShareSocialFab from '../components/ShareSocialFab';
import { SessionGroup } from '../models/SessionGroup';

import AddWorkForm from '../forms/AddWorkForm';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const setItem: any = async function (key: string, value:string) {
  Storage.set({
    key: key,
    value: value
  });
}


const getItem: any = async function (key: string) {
  const { value } = await Storage.get({ key: key });
  return value;
}

interface OwnProps { }

interface StateProps {
  sessionGroups: SessionGroup[];
  favoriteGroups: SessionGroup[];
  mode: 'ios' | 'md',
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type SchedulePageProps = OwnProps & StateProps & DispatchProps;

const SchedulePage: React.FC<SchedulePageProps> = ({ favoriteGroups, sessionGroups, setSearchText, mode }) => {
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [searchTextLocal, setSearchTextLocal] = useState('');
  

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  const searchText = (e: any) => {
    setSearchTextLocal(e);
    setSearchText(e);
  }

  const switchSegment = async (e: any)=>{
    if (e === 'all') {
      const searchStorage = await getItem('search');
      if (searchStorage) {
        setSearchText(searchStorage);
        setSearchTextLocal(searchStorage);
      }
    } else {
      setItem('search', searchTextLocal)
    }
    setSegment(e);
  }

  return (
    <IonPage id="price-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonSegment onIonChange={(e) =>{switchSegment(e.detail.value as any)} }>
            <IonSegmentButton value="all" checked={segment === 'all'}>
              Цены
            </IonSegmentButton>
            <IonSegmentButton value="favorites" checked={segment === 'favorites'}>
              Заказать звонок
            </IonSegmentButton>
          </IonSegment>

          {/* <IonButtons slot="end">
            <IonButton onClick={() => setShowFilterModal(true)}>
              {mode === 'ios' ? 'Filter' : <IonIcon icon={options} slot="icon-only" />}
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
        
        {segment === 'all' ? (<IonToolbar>
          <IonSearchbar
            placeholder="Поиск"
            onIonChange={(e: CustomEvent) => {searchText(e.detail.value)}}
            value={searchTextLocal}
          />
        </IonToolbar>) : null}
        
      </IonHeader>

      <IonContent>
        {/* <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher> */}
        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
        {segment === 'all' ? (
          <SessionList
          sessionGroups={sessionGroups}
          listType={segment}
        />
        ) : <AddWorkForm />}
        {/* <SessionList
          sessionGroups={sessionGroups}
          listType={segment}
          hide={segment === 'favorites'}
        />

        <SessionList
          sessionGroups={favoriteGroups}
          listType={segment}
          hide={segment === 'all'}
        /> */}
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
        <SessionListFilter
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>

      {/* <ShareSocialFab /> */}

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    sessionGroups: selectors.getGroupedSessions(state),
    favoriteGroups: selectors.getGroupedFavorites(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText,
    },
  component: React.memo(SchedulePage)
});