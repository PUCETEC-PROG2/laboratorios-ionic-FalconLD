import React from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className='card'>
            <img src="https://avatars.githubusercontent.com/u/200696133?v=4" alt="FalconLD" />
            <IonCardHeader>
              <IonCardTitle>Leonardo David Falconi Velastegui</IonCardTitle>
              <IonCardSubtitle>FalconLD</IonCardSubtitle>
            </IonCardHeader>
            
            <IonCardContent>
              Desarrollador de Software, cinturón negro en Tae Kwon Do, Peak Elo Diamante en League of Legends
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
