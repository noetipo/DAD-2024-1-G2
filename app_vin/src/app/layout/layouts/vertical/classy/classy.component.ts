import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
//import {LanguagesComponent} from 'app/layout/common/languages/languages.component';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, map, takeUntil } from 'rxjs';
import { MenuService } from '../../../../providers/services/setup/menu.service';
import { MenuAcceso } from './menu_accesos';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        NotificationsComponent,
        UserComponent,
        NgIf,
        MatIconModule,
        MatButtonModule,
        FuseFullscreenComponent,
        SearchComponent,
        ShortcutsComponent,
        MessagesComponent,
        RouterOutlet,
        QuickChatComponent,
    ],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: FuseNavigationItem[];
    menu: MenuAcceso[];

    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        // private _navigationService: NavigationService,
        // private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _menuService: MenuService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    test_menu = [
        {
            id: 'example',
            title: 'Example',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example',
            children: [
                {
                    id: 'asdasd',
                    title: 'Juahijon',
                    type: 'basic',
                    icon: 'heroicons_outline:chart-pie',
                    link: '/homeScreen',
                },
            ],
        },
        {
            id: 'juansss',
            title: 'Juansss',
            type: 'group',
            icon: 'heroicons_outline:bolt',
            link: '/homeScreen',
            children: [
                {
                    id: 'juansss',
                    title: 'Juansss',
                    type: 'basic',
                    icon: 'heroicons_outline:bolt',
                    link: '/homeScreen',
                },
                {
                    id: 'SetupRole',
                    title: 'Setup Role',
                    type: 'basic',
                    icon: 'heroicons_solid:user-group',
                    link: '/homeScreen/setup/role',
                },
            ],
        },
    ];
    ngOnInit(): void {
        //this.showmenu();
        this.navigation = [
            {
                id: 'example',
                title: 'Example',
                type: 'group',
                icon: 'heroicons_outline:chart-pie',
                link: '/example',
                children: [
                    {
                        id: 'SetupRole',
                        title: 'Setup Role',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/homeScreen/setup/role',
                    },
                    {
                        id: 'SetupClient',
                        title: 'Setup Cliente',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/homeScreen/setup/client',
                    },
                ],
            },


        ];
        this.user = {
            id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
            name: 'Brian Hughes',
            email: 'hughes.brian@company.com',
            avatar: 'assets/images/avatars/brian-hughes.jpg',
            status: 'online',
        };

        // Subscribe to media changes
        // this._fuseMediaWatcherService.onMediaChange$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(({matchingAliases}) => {
        //         // Check if the screen is small
        //         this.isScreenSmall = !matchingAliases.includes('md');
        //     });
        //this.navigation =  this.test_menu;
    }

    /**
     * On destroy
     */
    showmenu(): void {
        this._menuService
            .getAll$()
            .pipe(
                map((data) => {
                    console.log(data.data);
                    if (data.data.length > 0) {
                        if (Array.isArray(data.data)) {
                            return data.data;
                        } else if (
                            typeof data.data === 'object' &&
                            data.data !== null
                        ) {
                            return Object.values(data.data);
                        } else {
                            return [];
                        }
                    }else{
                        return this.test_menu;
                    }

                }),
                map((formattedData) => {
                    return formattedData.map((item) => ({
                        id: item.id,
                        title: item.title,
                        type: item.type,
                        icon: item.icon,
                        link: item.link,
                        children: item.children.map((child) => ({
                            id: child.id,
                            title: child['title '] ?? child.title,
                            type: child.type,
                            icon: child.icon,
                            link: child.link,
                        })),
                    }));
                })
            )
            .subscribe((formattedData) => {
                // Utiliza los datos formateados en this.navigation
                if (formattedData.length > 0) {
                    this.navigation = formattedData ?? this.test_menu;
                }
                console.log('ds' + formattedData[0]['children'][0]['nombre']);
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
