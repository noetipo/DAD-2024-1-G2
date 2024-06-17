import {Injectable} from '@angular/core';
import {message} from "./messages";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {FuseConfirmationService} from "../../../@fuse/services/confirmation";

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    configForm: UntypedFormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    private createAndOpenDialog(additionalData: any, defaultMessages: any): Promise<void> {
        const title = additionalData?.title || defaultMessages.title;
        const messages = additionalData?.message || defaultMessages.message;
        const icon = additionalData?.icon || defaultMessages.icon;
        const textButton = additionalData?.btnOkText || defaultMessages.textButton;
        const colorIcon = additionalData?.colorIcon || defaultMessages.colorIcon;
        const colorButton = additionalData?.colorButton || defaultMessages.colorButton;

        this.configConfirm({title: title, message: messages, icon: icon, textButton: textButton, colorIcon: colorIcon, colorButton: colorButton, dismissible: defaultMessages.dismissible});
        const modalRef = this._fuseConfirmationService.open(this.configForm.value);

        return new Promise((resolve, reject) => {
            modalRef.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    confirmDelete(additionalData?: any): Promise<void> {
        return this.createAndOpenDialog(additionalData, message.confirmDelete);
    }

    confirmUpdate(additionalData?: any): Promise<void> {
        return this.createAndOpenDialog(additionalData, message.confirmUpdate);
    }
    confirmSave(additionalData?: any): Promise<void> {
        return this.createAndOpenDialog(additionalData, message.confirmSave);
    }
    confirmState(additionalData?: any): Promise<void> {
        return this.createAndOpenDialog(additionalData, message.confirmState);
    }
    confirmDefault(additionalData?: any): Promise<void> {
        return this.createAndOpenDialog(additionalData, message.confirmDefault);
    }
    private configConfirm({title, message, icon, textButton, colorIcon, colorButton, dismissible}: { title: any, message: any, icon: any, textButton: any, colorIcon: any, colorButton: any, dismissible: any }) {
        this.configForm = this._formBuilder.group({
            title: title,
            message: message,
            icon: this._formBuilder.group({
                show: true,
                name: `heroicons_outline:${icon}`,
                color: colorIcon,
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: textButton,
                    color: colorButton,
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancelar',
                }),
            }),
            dismissible: dismissible,
        });
    }
}
