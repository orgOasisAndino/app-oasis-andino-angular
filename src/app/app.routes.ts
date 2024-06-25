import { Routes } from '@angular/router';
import { HomeComponent } from './domains/shared/pages/home/home.component';
import { ReservationComponent } from './domains/shared/pages/reservation/reservation.component';
import { ListComponent } from './domains/rooms/pages/list/list.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { PomabambaComponent } from './domains/info/pages/pomabamba/pomabamba.component';
import { ServicesAComponent } from '@shared/pages/services-a/services-a.component';

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
        path:'**',
        component:NotFoundComponent
    }
];
