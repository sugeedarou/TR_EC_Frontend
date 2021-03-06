import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertManagerService } from '../services/alert-manager.service';
import { CreateFolderPage } from './create-folder/create-folder.page';
import { Folder } from './manage.folder';
import { ShareFolderPage } from './share-folder/share-folder.page';

@Injectable({
  providedIn: 'root'
})
export class ManageFolderUiService {

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private alertManager: AlertManagerService
  ) { }

  initSubfolderList(subfolderInfo) {
    const subfolders = [];
    for (const folderInfo of subfolderInfo) {
      const folder = new Folder(
        folderInfo.id, folderInfo.name, folderInfo.is_sharedfolder
      );
      subfolders.push(folder);
    }
    return subfolders;
  }

  async openCreateFolderModal(currentFolder, subfolders, successCallback) {
    const modal = await this.modalController.create({
      component: CreateFolderPage,
      componentProps: {
        existingFolderNames: subfolders.map((folder) => folder.name),
      },
    });
    modal.onDidDismiss()
        .then(async (returnData) => {
          const data = returnData.data;
          if (data) {
            currentFolder.createSubfolder(data.folderName)
              .subscribe(
                  successCallback,
                  (err) => this.alertManager.showErrorAlertNoRedirection(
                      err.status,
                      err.statusText),
              );
          }
        });
    await modal.present();
  }

  async openDeleteFolderAlert(folder, successCallback) {
    const alert = await this.alertController.create({
      header: 'Attention!',
      message: `Do you really want to delete folder "${folder.name}"?`,
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: async () => {
            folder.delete()
                .subscribe(
                    successCallback,
                    (err) => this.alertManager.showErrorAlertNoRedirection(
                        err.status,
                        err.statusText),
                );
          },
        },
      ],
    });
    await alert.present();
  }

  async openShareFolderModal(currentFolder) {
    const modal = await this.modalController.create({
      component: ShareFolderPage,
      componentProps: {
        // pass variables to the modal
        folderId: currentFolder.id,
        folderName: currentFolder.name,
      },
    });
    return await modal.present();
  }
}
