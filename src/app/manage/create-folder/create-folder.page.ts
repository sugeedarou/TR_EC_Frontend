import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.page.html',
  styleUrls: ['./create-folder.page.scss'],
})
export class CreateFolderPage implements OnInit {

  @Input() parentId: any;
  @ViewChild('folderNameInput', {static: false}) folderNameInput: IonInput;

  public createFolderForm: FormGroup;
  public folderNameValid: boolean;
  /* allow any characters except \,/,:,*,<,>,|
     but not filenames starting with white-spaces or the character . */
  private validatorPattern = new RegExp('^(?!\\.|\\s)[^\\\\\/:\\*"<>\\|]+$');
  private existingFolderNames: string[];

  constructor(
    private formBuilder: FormBuilder,
    public viewCtrl: ModalController
  ) {
    this.createFolderForm = this.formBuilder.group({
      folderName: ['', (control) => this.folderNameValidator(control)]
    });

    this.folderNameValid = false;
  }

  ngOnInit() {
  }

  folderNameValidator(control: FormControl) {
    const folderName = control.value;
    this.folderNameValid = (this.validatorPattern.test(folderName) &&
                            folderName.trim() != '' &&
                            !folderName.includes('__') &&
                            !this.existingFolderNames.includes(folderName));
    if (this.folderNameValid) {return null;}
    else {
      return {folderName: true};
    }
  }

  submitForm() {
    const formData = this.createFolderForm.value;
    // close the modal passing its data
    this.viewCtrl.dismiss({
      folderName: formData.folderName,
    });
  }

  dismissForm() {
    // close the modal without passing data
    this.viewCtrl.dismiss();
  }

}
