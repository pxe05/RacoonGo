import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../models/app.model';
import { BackendRouterService } from '../../services/backend-router.service';
import { Router } from '@angular/router';
import { getAuth, deleteUser } from 'firebase/auth';

@Component({
    selector: 'delete-user-btn',
    templateUrl: './delete-user-btn.component.html',
    styleUrls: ['./delete-user-btn.component.css']
})
export class DeleteUserBtnComponent implements OnInit {
    user!: User;
    constructor(private routerService: BackendRouterService, private router: Router) { }

  ngOnInit(): void {
  }

    deleteAcount(){
        this.user = JSON.parse(sessionStorage.getItem("user")!).body;
        if (this.user == null) {
            this.router.navigate(['/login']);
        }
        else {
            Swal.fire({
                title: '&#191;Est&aacute;s seguro?',
                text: '&iquest;No podr&aacute;s recuperar tu cuenta!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'S&iacute;, eliminar.',
                cancelButtonText: 'No, cancelar.'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.deleteUserInfo();

                }
            })
        }
    }

    async deleteUserInfo(): Promise<void> {
        // Delete user account, events and games
        this.routerService.endpoints.user.deleteAccount(this.user.email).subscribe({
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
