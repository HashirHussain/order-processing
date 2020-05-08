import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

interface users {
  userID: number;
  userName: string;
}
interface selected {
  taskTrackingId: number;
  taskName: string;
  orderNumber: string;
  loanNumber: string;
  transactionType: string;
  lender: string;
  submitted: string;
  age: string;
  clientduedate: string;
  orderNumbborrowerer: string;
  address: string;
  country: string;
  state: string;
  loanPurpose: string;
  status: string;
  dueData: string;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  // For user search
  search: FormControl = new FormControl();
  usersList: users[] = [];

  // For Assign modal
  assignModalReference: NgbModalRef;
  searchUser: FormControl = new FormControl();
  selectedAssignUser = {} as users;
  isAssignLoading = false;
  assignUsersList: users[] = [];

  // For table
  page = 1;
  pageSize = 10;
  totalRecords: number = 0;
  selectedUser: object;

  isLoading = false;
  tasksList: any[] = [];

  // For checkbox
  checked: any = {};
  isCheckedAll: boolean;
  isAssignButton: boolean = false;

  constructor(private dashboardService: UsersService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.search.valueChanges.subscribe(term => {
      if (term.length > 3) {
        this.dashboardService.getUsersList(term).subscribe(data => {
          this.usersList = data.items;
        })
      }
    });
  }

  getUsersList(value) {
    if (this.usersList.length) {
      this.selectedUser = this.usersList.find(f => f.userName === value);
      this.resetList();
      this.getTasksList();
    }
    if (!this.selectedUser) {
      this.usersList = [];
      if (value.length > 3) {
        this.dashboardService.getUsersList(value).subscribe(data => {
          this.usersList = data.items;
        });
      }
    }
  }

  getTasksList() {
    if (this.selectedUser && this.selectedUser['userID']) {
      this.isLoading = true;
      const payload = `userId=${this.selectedUser['userID']}&page=${this.page}&pageSize=${this.pageSize}`;
      this.dashboardService.getManagerTasksList(payload).subscribe({
        next: result => {
          // console.log('result', result);
          if (result['items'] && result['items'].length) {
            this.addTasksToTasksList(result['items']);
            this.totalRecords = result['totalrows'];
          } else {
            this.isLoading = false;
          }
        },
        error: error => this.toastr.error('Server Error', 'Error')
      });
    }
  }

  addTasksToTasksList(data) {
    data.forEach((item, index) => {
      this.tasksList.push(item);
      if (index === (data.length - 1)) {
        this.isLoading = false;
        // console.log('Length', this.tasksList.length);
      }
    });

    this.isCheckedAllRow();
  }

  onScroll() {
    this.page++;
    this.getTasksList();
    console.log('on Scroll');
  }

  resetList() {
    this.page = 1;
    this.pageSize = 10;
    this.totalRecords = 0;
    this.tasksList = [];
  }

  onScrollUp() {
    console.log('on scroll up');
  }

  isCheckedAllRow() {
    let keys = Object.keys(this.checked);

    this.isCheckedAll = keys.length == this.tasksList.length ? true : false;
    this.isAssignButton = keys.length > 0 ? true : false;
  }

  checkAll(selectedItem: selected[], check: HTMLInputElement) {
    this.checked = {};

    if (check.checked == true) {
      selectedItem.forEach(item => this.checked[item.taskTrackingId] = true);
    }

    this.isCheckedAllRow();
  }

  checkedItem(selectedItem: selected, check: HTMLInputElement, i) {
    if (check.checked == true) {
      this.checked[selectedItem.taskTrackingId] = true;
    } else if (check.checked == false) {
      delete this.checked[selectedItem.taskTrackingId];
    }

    this.isCheckedAllRow();
  }

  // Assign Modal

  openAssignModel(model) {
    this.assignModalReference = this.modalService.open(model, { ariaLabelledBy: 'modal-basic-title' });
    this.getUsersListForAssign();
  }

  getUsersListForAssign() {
    this.isAssignLoading = true;
    this.assignUsersList = [];
    const payload = `page=${this.page}&pageSize=${this.pageSize}`;
    this.dashboardService.getUsersListWithPagination(payload).subscribe({
      next: result => {
        if (result['items'] && result['items'].length) {
          this.addUsersToAssignUsersList(result['items']);
          // this.totalRecords = result['totalrows'];
        } else {
          this.isAssignLoading = false;
        }
      },
      error: error => this.toastr.error('Server Error', 'Error')
    });
  }


  addUsersToAssignUsersList(data) {
    data.forEach((item, index) => {
      this.assignUsersList.push(item);
      if (index === (data.length - 1)) {
        this.isAssignLoading = false;
      }
    });
  }

  closeAssignModel() {
    this.assignModalReference.close();
    this.selectedAssignUser = {} as users;
  }

  onSelectUser(user: users) {
    this.selectedAssignUser = {} as users;
    this.selectedAssignUser = user;
  }

  onAssign() {
    let taskTrackingIds = Object.keys(this.checked);

    let requestObj = {
      taskTrackingIds: taskTrackingIds.join(','),
      userId: this.selectedAssignUser.userID
    }

    console.log(requestObj);


    this.dashboardService.assignUser(requestObj).subscribe(res => {
      this.toastr.success('User Assigned Successfully', 'Success');
      this.assignModalReference.close();
    }, error => {
      this.toastr.error(error.error, 'Error');
    });
  }
}
