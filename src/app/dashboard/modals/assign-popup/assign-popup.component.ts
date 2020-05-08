import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

interface users {
  userID: number;
  userName: string;
  emailID: string;
  phone: number;
}

@Component({
  selector: 'app-assign-popup',
  templateUrl: './assign-popup.component.html',
  styleUrls: ['./assign-popup.component.css']
})
export class AssignPopupComponent implements OnInit, OnDestroy {
  @Output() response: EventEmitter<any> = new EventEmitter();

  userSearch = '';
  selectedAssignUser = {} as users;
  isAssignLoading = false;
  assignUsersList: users[] = [];
  page = 1;
  pageSize = 10;
  totalUsersRecords: number = 0;

  subscription: Subscription;

  constructor(private dashboardService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsersListForAssign();
  }

  getUsersListForAssign() {
    this.isAssignLoading = true;
    // const payload = `page=${this.page}&pageSize=${this.pageSize}`;
    let payload = `page=${this.page}&pageSize=${this.pageSize}`;
    if (this.userSearch && this.userSearch.length > 3) {
      payload = payload + `&userName=${this.userSearch}`;
    }
    this.subscription = this.dashboardService.getUsersListWithPagination(payload).subscribe({
      next: result => {
        if (result['items'] && result['items'].length) {
          this.addUsersToAssignUsersList(result['items']);
          this.totalUsersRecords = result['totalrows'] ? result['totalrows'] : 0;
        } else {
          this.isAssignLoading = false;
        }
      },
      error: error => this.toastr.error('Server Error', 'Error')
    });
  }

  getUsersByUserName() {
    if (this.userSearch && this.userSearch.length > 3) {
      this.resetUsersList();
      this.getUsersListForAssign();
    }
  }

  addUsersToAssignUsersList(data) {
    data.forEach((item, index) => {
      this.assignUsersList.push(item);
      if (index === (data.length - 1)) {
        this.isAssignLoading = false;
      }
    });
  }

  onUserTableScroll() {
    this.page++;
    this.getUsersListForAssign();
  }

  resetUsersList() {
    this.page = 1;
    this.pageSize = 10;
    this.totalUsersRecords = 0;
    this.assignUsersList = [];
  }

  closeAssignModel() {
    let res = {
      success: false,
      data: null
    };

    this.response.emit(res);
  }

  onSelectUser(user: users) {
    this.selectedAssignUser = {} as users;
    this.selectedAssignUser = user;
  }

  onAssign() {
    let res = {
      success: true,
      data: this.selectedAssignUser
    };

    this.response.emit(res);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
