import React, { useState, ReactElement } from 'react';
import { IonIcon, IonSelect,  IonSelectOption, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './AddWorkForm.scss';
import { call, person, build } from 'ionicons/icons';
import toast from '../pages/toast'
import validator from 'validator';
import { IonLoading } from '@ionic/react';

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

const AddWorkForm: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+375');
  const [workType, setWorkType] = useState([]);
  const [loading, setLoading] = useState(false);

  const phoneMask = (e: string)=>{
    if (!Number.isInteger (Number (e.split("").pop()))){
      return toast('Не верный символ. Только числа.');
    }
    setPhone(e);
  }

  const postOrder = async (e: React.FormEvent ) => {
    e.preventDefault();
    if (!validator.isMobilePhone(phone, ['ru-RU', 'be-BY'])){
     return toast('Введите валидный номер телефона для Беларуси.')
    }
    let order = {
      name,
      phone,
      workType
    }
    setLoading (true);
    postData('https://t8vlnama64.execute-api.us-east-1.amazonaws.com/dev/order', order)
    .then((data) => {
      setLoading (false);
      if (data) {
        toast("Заказ получен. Вам перезвонят.", 4000);
        setName ('')
        setPhone ('+375')
        setWorkType ([])
      } else {
        toast("Ошибка, попробуйте еще раз.", 4000);
      };
    });

  };

  const Loader = ()=>{
    return (
      <IonLoading
      isOpen={loading}
      message={'Размещение заказа...'}
      duration={0}
      spinner={"bubbles"}
    />
    )
  }

  return (
    <>
    <form noValidate className="orderForm" onSubmit={postOrder}>
              <IonList>
                <IonItem>
                <IonLabel position="floating" color="primary"><IonIcon icon={person}/> <IonText>Ваше имя</IonText></IonLabel>
                  <IonInput color={'dark'} clearInput name="name" type="text" value={name} spellCheck={false} autocapitalize="off" onIonChange={e => setName(e.detail.value!)}
                    required>
                  </IonInput>
                </IonItem>
                <IonItem>
                <IonLabel position="floating"  color="primary"><IonIcon icon={call}/> <IonText>Номер телефона</IonText> </IonLabel>
                  <IonInput color={'dark'} placeholder='+375291234567' name="phone" type="text" value={phone} onIonChange={e => phoneMask(e.detail.value!)}>
                  </IonInput>
                </IonItem>
              </IonList>

        <IonList>
        <IonItem>
        
            {/* <IonIcon color='primary' icon={build}/> */}
            <IonLabel color='primary'>Тип работ</IonLabel>
            <IonSelect className='myselect' color={'dark'} value={workType} multiple={true} cancelText="Отмена" okText="Выбрать" onIonChange={(e)=>{setWorkType(e.detail.value!)}}>
              <IonSelectOption value="bacon">Штукатутрка внешняя</IonSelectOption>
              <IonSelectOption value="olives">Штукатутрка внутренния</IonSelectOption>
              <IonSelectOption value="xcheese">Отделка внутренния</IonSelectOption>
              <IonSelectOption value="peppers">Отделка чистовая</IonSelectOption>
              <IonSelectOption value="mushrooms">Выравнивание потолков</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
              <IonRow>
                <IonCol>
                  <IonButton type="submit" expand="block">Заказать</IonButton>
                </IonCol>
              </IonRow>
      </form>
    <Loader />
    </>
  );
};

export default AddWorkForm