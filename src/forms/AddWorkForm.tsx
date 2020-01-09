import React, { useState, ReactElement } from 'react';
import { IonIcon, IonSelect,  IonSelectOption, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './AddWorkForm.scss';
import { call, person, build } from 'ionicons/icons';
import toast from '../pages/toast'
import validator from 'validator';




const AddWorkForm: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+375');
  const [workType, setWorkType] = useState([]);

  const phoneMask = (e: string)=>{
    if (!Number.isInteger (Number (e.split("").pop()))){
      return toast('Не верный номер. Только числа, пожалуйста.');
    }
    setPhone(e);
  }

  const postOrder = async (e: React.FormEvent ) => {
    e.preventDefault();
    if (!validator.isMobilePhone(phone, ['ru-RU', 'be-BY'])){
     return toast('Введите валидный номер телефона для Беларуси.')
    }
    console.log(phone)
    // идем оставлять заявку
  };

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
      </>
  );
};

export default AddWorkForm