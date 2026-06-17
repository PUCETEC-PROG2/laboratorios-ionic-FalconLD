import { IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/200696133?v=4" alt="avatar" />
            <IonCardHeader>
               <IonTitle>Leonardo David Falconi Velastegui</IonTitle>
              <IonCardSubtitle>FalconLD</IonCardSubtitle>
            </IonCardHeader>

            <IonCardHeader>
              Desarollador de Software, cinturon negro en Tae Kwon Do, Peak Elo Diamante en League of Legends, en busca de madres solteras de padre ausente
            </IonCardHeader>
          </IonCard>

        </div>




      </IonContent>
    </IonPage>
  );
};

export default Tab3;