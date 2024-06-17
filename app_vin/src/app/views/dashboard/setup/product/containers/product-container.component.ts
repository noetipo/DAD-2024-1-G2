import {Product} from '../models/product';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProductNewComponent} from '../components/form/product-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductEditComponent} from '../components/form/product-edit.component';
import {ConfirmDialogService} from "../../../../../shared/confirm-dialog/confirm-dialog.service";
import {ClientListComponent} from "../components";
import {ProductService} from "../../../../../providers/services/setup/product.service";
import {CategoryService} from "../../../../../providers/services/setup/category.service";
import {Category} from "../models/category";

@Component({
    selector: 'app-clients-container',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        ClientListComponent,
        ProductNewComponent,
        ProductEditComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
        <app-products-list
            class="w-full"
            [products]="products"
            (eventNew)="eventNew($event)"
            (eventEdit)="eventEdit($event)"

            (eventDelete)="eventDelete($event)"
        ></app-products-list>
    `,
})
export class ProductContainerComponent implements OnInit {
    public error: string = '';
    public products: Product[] = [];
    public categories: Category[] = [];
    public client = new Product();

    constructor(
        private _productService: ProductService,
        private _categoryService: CategoryService,
        private _confirmDialogService:ConfirmDialogService,
        private _matDialog: MatDialog,
    ) {}

    ngOnInit() {
        this.getProducts();
        this.getCategories();
    }

    getProducts(): void {
        this._productService.getAll$().subscribe(
            (response) => {
                console.log(response);
                this.products = response;
            },
            (error) => {
                this.error = error;
            }
        );
    }
    getCategories(): void {
        this._categoryService.getAll$().subscribe(
            (response) => {

                this.categories = response;
                console.log("this.categories",this.categories);
            },
            (error) => {
                this.error = error;
            }
        );
    }

    public eventNew($event: boolean): void {
        if ($event) {
            const productForm = this._matDialog.open(ProductNewComponent);
            productForm.componentInstance.title = 'Nuevo Product' || null;
            productForm.componentInstance.categories = this.categories;
            productForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    console.log(result);
                    this.saveProduct(result);
                }
            });
        }
    }

    saveProduct(data: any): void {
        const params= new Product();
        params.nombre=data.nombre;
        params.categoria=this.categories.find(categories=>categories.id==data.categoria);
        this._productService.add$(params).subscribe((response) => {
        if (response) {
            this.getProducts()
        }
        });
    }

    eventEdit(idClient: number): void {
        const listById = this._productService
            .getById$(idClient)
            .subscribe(async (response) => {
                this.client = (response) || {};
                this.openModalEdit(this.client);
                listById.unsubscribe();
            });
    }

    openModalEdit(data: Product) {
        console.log(data);
        if (data) {
            const productForm = this._matDialog.open(ProductEditComponent);
            productForm.componentInstance.title =`Editar <b>${data.nombre||data.id} </b>`;
            productForm.componentInstance.client = data;
            productForm.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.editClient( data.id,result);
                }
            });
        }
    }

    editClient( idClient: number,data: Object) {
        this._productService.update$(idClient,data).subscribe((response) => {
            if (response) {
                this.getProducts()
            }
        });
    }


    public eventDelete(idClient: number) {
        this._confirmDialogService.confirmDelete(
            {
                // title: 'Confirmación Personalizada',
                // message: `¿Quieres proceder con esta acción ${}?`,
            }
        ).then(() => {
            this._productService.delete$(idClient).subscribe((response) => {
                this.products = response;
            });
            this.getProducts();
        }).catch(() => {
        });

    }
}
