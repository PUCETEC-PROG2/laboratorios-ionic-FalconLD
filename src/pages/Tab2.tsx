import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, IonText, useIonToast } from '@ionic/react';import { useHistory, useLocation } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { Repository } from '../interfaces/Repository';
import './Tab2.css';
import { createRepository, updateRepository } from '../services/GitHubService';
import LoadingSpinner from '../components/LoadingSpinner';

interface Tab2LocationState {
  mode?: 'edit';
  repository?: Repository;
}

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<Tab2LocationState>();
  const [presentToast] = useIonToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalOwner, setOriginalOwner] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const editState = location.state;
    if (editState?.mode === 'edit' && editState.repository) {
      setIsEditMode(true);
      setOriginalOwner(editState.repository.owner.login);
      setOriginalName(editState.repository.name);
      setRepositoryData({
        name: editState.repository.name,
        description: editState.repository.description ?? ""
      });
    } else {
      setIsEditMode(false);
      setOriginalOwner("");
      setOriginalName("");
      setRepositoryData({ name: "", description: "" });
    }
    setErrorMsg("");
  }, [location.key, location.state]);
  const saveRepo = async () => {  
    if (!repositoryData.name || repositoryData.name.trim() === ''){
      setErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    const request = isEditMode
      ? updateRepository(originalOwner, originalName, repositoryData)
      : createRepository(repositoryData);

    request
      .then(() => {
        const wasEditMode = isEditMode;
        setIsEditMode(false);
        setOriginalOwner("");
        setOriginalName("");
        setRepositoryData({ name: "", description: "" });
        if (wasEditMode) {
          history.replace({ pathname: '/tab2', state: {} });
        }
        presentToast({
          message: wasEditMode
            ? 'Repositorio actualizado correctamente'
            : 'Repositorio creado correctamente',
          duration: 2000,
          position: 'top',
          positionAnchor: 'tab2-header',
          color: 'celeste',
          onDidDismiss: () => history.push("/tab1")
        });
      })
      .catch((error) => {
        const apiError = error instanceof Error ? error.message : String(error);
        setErrorMsg(
          isEditMode
            ? `Error al actualizar el repositorio: ${apiError}`
            : `Error al crear el repositorio: ${apiError}`
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <IonPage>
      <IonHeader id="tab2-header">
        <IonToolbar>
          <IonTitle>{isEditMode ? 'Actualizar repositorio' : 'Formulario del repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {isEditMode ? 'Actualizar Repositorio' : 'Formulario de Repositorio'}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ingrese el nombre del repositorio"
            value={repositoryData.name}
            onIonInput={(e) => setRepositoryData((prev) => ({ ...prev, name: e.detail.value ?? "" }))}
          />
          <IonTextarea
            className='form-field'
            label='Descripción del repositorio'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repositorio'
            value={repositoryData.description}
            onIonInput={(e) => setRepositoryData((prev) => ({ ...prev, description: e.detail.value ?? "" }))}
            rows={6}
          />
          {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText> }  
          <IonButton
            className='form-field'
            expand='block'
            color="dark"
            shape="round"
            onClick={saveRepo}
          >
            {isEditMode ? 'Actualizar' : 'Guardar'}
          </IonButton>
        </div>
        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
