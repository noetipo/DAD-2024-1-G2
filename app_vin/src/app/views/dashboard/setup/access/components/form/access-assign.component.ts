import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
//import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { abcForms } from '../../../../../../../environments/generals';
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
// import {ConfirmDialogService} from "../../../../../../shared";
import { Menu } from '../../models/Menu';
import { ModuleFather } from '../../models/ModuleFather';
import { RoleService } from '../../../../../../providers/services';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

//import { ConfirmDialogService } from 'src/app/shared';

@Component({
    selector: 'app-access-assign',
    imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
    standalone: true,
    template: `
        <div class="modal-header">
            <h6 class="modal-title">{{ title }}</h6>
            <button
                type="button"
                class="close"
                aria-label="Close"
                (click)="cancelForm()"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form [formGroup]="rolesForm">
                <div class="form-group row required">
                    <div class="input-group input-group-sm col-sm-3">
                        <label class="col-form-label"
                            ><b>Lista de Modulos:</b></label
                        >
                    </div>
                    <div
                        class="col-sm-9 input-group input-group-sm input-group-rounded"
                    >
                        <select
                            class="form-control form-select form-control-sm"
                            formControlName="Parent_id"
                        >
                            <option value="" disabled="true">
                                Seleccione Módulo
                            </option>
                            <option
                                *ngFor="let mod of modules"
                                [value]="mod.id"
                            >
                                {{ mod.nombre }}
                            </option>
                        </select>
                    </div>
                    <!--          <app-form-validate-errors [group]="rolesForm" [controlName]="'Parent_id'"></app-form-validate-errors>-->
                </div>
            </form>
            <div class="row">
                <div class="col-md-12">
                    <div class="list-group">
                        <a
                            class="list-group-item"
                            *ngFor="let m of menus; let i = index"
                        >
                            <div
                                class="custom-control custom-checkbox d-flex align-items-center"
                            >
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="men{{ i }}"
                                    [(ngModel)]="m.asignado"
                                />
                                <label
                                    class="custom-control-label todo-label badge-gm"
                                    for="men{{ i }}"
                                >
                                    <span
                                        class="badge badge-pill text-bg-{{
                                            m.asignado ? 'success' : 'danger'
                                        }} float-right text-white"
                                    >
                                        {{ m.nombre }}
                                    </span>
                                </label>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn {{ abcForms.btnCancel.class }} btn-sm"
                (click)="cancelForm()"
            >
                <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span>
                {{ abcForms.btnCancel.label }} / Terminar
            </button>
            <button
                type="button"
                class="btn {{ abcForms.btnSave.class }} btn-sm"
                (click)="saveAssign()"
            >
                <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span>
                {{ abcForms.btnSave.label }}
            </button>
        </div>
    `,
})
export class AccessAssignComponent implements OnInit {
    //public rolesForm: FormGroup;
    @Input() title: string = '';
    @Input() idRol: string = '';
    abcForms: any;

    modules: ModuleFather[] = [];
    menus: Menu[] = [];
    moduleIds: number[] = [];

    rolesForm = new FormGroup({
        modulo_id: new FormControl(''),
        Parent_id: new FormControl(''),
        rol_id: new FormControl(''),
    });

    constructor(
        private formBuilder: FormBuilder,
        // public activeModal: NgbActiveModal,
        // private moduleService: ModuleService,
        // private confirmDialogService: ConfirmDialogService,
        private rolService: RoleService
    ) {}

    ngOnInit() {
        this.abcForms = abcForms;
        this.rolesForm.controls['Parent_id'].valueChanges.subscribe((val) => {
            if (val) {
                this.getListMenu(parseInt(val));
            }
        });
        this.rolesForm.patchValue({
            rol_id: this.idRol,
        });
        this.getListModules();
    }

    getListModules(): void {
        // let m = this.moduleService.getModuleFather$().subscribe(async response => {
        //   this.modules = await response && response.data || [];
        //   await this.rolesForm.patchValue({
        //     Parent_id: String(this.modules[0].id)
        //   });
        //   await this.getListMenu(this.modules[0].id!);
        //   m.unsubscribe();
        // });
    }

    getListMenu(idModule: number) {
        const params: any = {};
        params.rol_id = this.idRol;
        params.modulo_id = idModule;
        // let r = this.rolService.getRolMenu$(params).subscribe(response => {
        //   this.menus = response && response.data || [];
        //   r.unsubscribe();
        // });
    }

    public saveAssign(): void {
        this.menus.map((data) => {
            if (data.asignado) {
                this.moduleIds.push(data.id!);
            }
        });
        // this.confirmDialogService.confirmSave().then(() => {
        //   const params: any = {};
        //   params.rol_id = this.idRol;
        //   params.modulos = this.moduleIds;
        //   params.Parent_id = this.rolesForm.value.Parent_id;
        //   this.rolService.saveRolMenu$(params).subscribe(response => {
        //   });
        // }).catch(() => {
        // });
    }

    public cancelForm(): void {
        // this.activeModal.close('');
    }
}
