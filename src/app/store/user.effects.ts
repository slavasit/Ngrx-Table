import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../core/services/user.service';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { 
        console.log('Actions stream:', this.actions$);
    console.log('User service:', this.userService)
    }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.userService.getAll().pipe(
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(() => of({ type: '[User API] Load Users Error' }))
                )
            )
        )
    );
}