import { Routes } from '@angular/router';
import { HomeComponent } from './domains/shared/pages/home/home.component';
import { ReservationComponent } from './domains/shared/pages/reservation/reservation.component';
import { ListComponent } from './domains/rooms/pages/list/list.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { PomabambaComponent } from './domains/info/pages/pomabamba/pomabamba.component';
import { ServicesAComponent } from '@shared/pages/services-a/services-a.component';
import { LayoutAComponent } from './domains/admin/components/layout-a/layout-a.component';
import { HomeAComponent } from './domains/admin/pages/home-a/home-a.component';
import { UsersAComponent } from './domains/admin/pages/users-a/users-a.component';
import { RoomsAComponent } from './domains/admin/pages/rooms-a/rooms-a.component';
import { ReservationAComponent } from './domains/admin/pages/reservation-a/reservation-a.component';
import { PayAComponent } from './domains/admin/pages/pay-a/pay-a.component';
import { ServicesAAComponent } from './domains/admin/pages/services-a-a/services-a-a.component';
import { RequestsAComponent } from './domains/admin/pages/requests-a/requests-a.component';

export const routes: Routes = [
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'reservation',
                component: ReservationComponent
            },
            {
                path: 'rooms',
                component: ListComponent
            },
            {
                path:'pomabamba',
                component:PomabambaComponent
            },
            {
                path:'services',
                component:ServicesAComponent
            }
        ]
    },
    {
        path:'admin',
        component:LayoutAComponent,
        children:[
            {
                path:'',
                component:HomeAComponent
            },
            {
                path:'users',
                component:UsersAComponent
            },
            {
                path:'rooms',
                component:RoomsAComponent
            },
            {
                path:'reservationss',
                component:ReservationAComponent
            },
            {
                path:'pays',
                component:PayAComponent
            },
            {
                path:'servicea',
                component:ServicesAAComponent
            },
            {
                path:'requests',
                component:RequestsAComponent
            }
        ]

    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
