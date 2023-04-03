﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarService } from './navbar.service';
import { Event, User } from '../../models/app.model';
import { BackendRouterService } from '../../services/backend-router.service';
import { getAuth, deleteUser } from 'firebase/auth';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    userName?: string;

    static navSearch: boolean
    constructor(public navService: NavbarService,
        private router: Router, private routerService: BackendRouterService) {
        sessionStorage.getItem("user") ? this.userName = JSON.parse(sessionStorage.getItem("user")!).username : this.userName = "Invitado";
    }

    goAddEve() {
        this.router.navigate(['/addEvent']);

    }

    goEveList() {
        this.router.navigate(['/events']);

    }
    gologin() {
        this.router.navigate(['/login']);
    }

    goProfile() {
        this.router.navigate(['/profile']);
    }
    logout(): void {

    }
    deleteAcount() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás recuperar tu cuenta!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S&iacute;, eliminar.',
            cancelButtonText: 'No, cancelar.'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.deleteUserInfo();
                //try {
                //    await this.deleteUserInfo();

                //} catch (error) {
                //    Swal.fire({
                //        icon: 'error',
                //        title: 'Error al eliminar la cuenta',
                //        text: 'Intentelo de nuevo en unos minutos'
                //    });
                //}
            }
        })

    }
    async deleteUserInfo(): Promise<void> {
        let user: User = JSON.parse(sessionStorage.getItem("user")!).body;
        // Delete user account, events and games
        this.routerService.endpoints.user.deleteAccount(user.email).subscribe({
            next: (data: any) => {
                this.deleteFromFirebaseAuth();
                // Delete session and redirect to main page
                sessionStorage.removeItem("user");
                this.router.navigate(['/login']);
                // TODO: derigir a home (cuando la creemos):
                //this.router.navigate(['/home']);
            },
            error: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la cuenta',
                    text: 'Intentelo de nuevo en unos minutos'
                });
            }
        });

    }

    async deleteFromFirebaseAuth() {
        try {
            // Delete the user from Firebase Authentication
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await deleteUser(currentUser);
            }
        } catch (error) {
            throw new Error('Error al eliminar la cuenta de firebase auth ');
        }
    }
}