import './RepoItem.css'
import React from 'react'
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { Repository } from '../interfaces/Repository';

const RepoItem: React.FC<Repository> = (repository) => {
    return [
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot='start'>
                    <img src={repository.avatarUrl} alt='Repo 1' />
                </IonThumbnail>
                <IonLabel>
                    <h3>{repository.name}</h3>
                    <p>{repository.description}</p>
                    <p><strong>Lenguaje: </strong>{repository.language}</p>
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption>
                    <IonIcon icon={pencil} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color={'danger'}>
                    <IonIcon icon={trash} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    ]
}

export default RepoItem