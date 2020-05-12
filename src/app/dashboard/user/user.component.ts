import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { FormControl, FormGroup } from '@angular/forms';

interface users {
  userId: number;
  userName: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  page = 1;
  pageSize = 10;
  totalRecords: number = 0;
  selectedUser: object;
  isLoading = false;
  userSearch: string = '';
  _orderNumberSearch: boolean;
  orderNumberSearch: string = '';
  loanNumberSearch: string = '';

  userListTotal: users[] = [];
  userList: users[] = [];
  userName: string;
  private _searchTerm: string;
  tasksList: any[];
  isTextBoxVisible: boolean = false;

  taskDetails: any[] = [];

  pieChart: object = {
    labels: ['Yesterday', 'Week', 'Month'],
    datasets: [
      {
        label: '# of Votes',
        data: [10, 0, 0],
        backgroundColor: [
          'rgba(124,181,236,1)'
        ],
        borderColor: [
          'rgba(124,181,236,1)'
        ],
        borderWidth: 1
      }
    ]
  };

  doughnutChart: object = {
    labels: ['Yesterday', 'Week', 'Month'],
    datasets: [
      {
        label: '# of Votes',
        data: [10, 0, 0],

        backgroundColor: [
          'rgba(255,255,0,0.7)'
        ],
        borderColor: [
          'rgba(255,255,0,0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  lineChart: object = {
    labels: [20,40,60,80,100],
    // labels: ['Blue', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My Rank',
        backgroundColor: "#fff",
        borderColor: '#037ffc',
        fill: false,
        lineTension: 0,
        data: [20, 45, 60, 35, 85, 50],
      },
      /* {
        label: 'XYZW',
        backgroundColor: "#fff",
        borderColor: 'green',
        fill: false,
        data: [0, 25, 40, 15, 45, 70],
      }, */
      {
        label: 'Average Peer Rank',
        backgroundColor: "#fff",
        fill: false,
        borderColor: '#fc0339',
        lineTension: 0,
        data: [50, 35, 40, 65, 25, 90],
      }
    ]
    /* datasets: [
      {
        label: '# of Votes',
        data: [5, 9, 15, 7, 3],
        backgroundColor: [
          'rgba(0, 0, 0, 0)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ] */
  };

  highchartPie: object = {
    title: 'Review Decision',
    // subTitle: '<b>Request Decision</b>'
    // title: 'Review Decision <b>Request Decision</b>'
  }

  highchartDounut: object = {
    title: 'My Completed Goal'
  }

  toggle() {
    this.isTextBoxVisible = !this.isTextBoxVisible;
  }


  constructor(private _userService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.tasksList = this.taskDetails;
    // this.selectedUser = {};
    // this.selectedUser['userID'] = 104;
    // this.getTasksList();
  }

  /**
   * @description Method to get Searched User List
   * @author Krunal Shriram Sakharkar
   * @date 2020-05-07
   * @param {*} value
   * @memberof UserComponent
   */
  getUsersList(value) {
    if (this.userList.length) {
      this.selectedUser = this.userList.find(f => f.userName === value);
      this.resetList();
      this.orderNumberSearch = '';
      this.getTasksList();
    }
    if (!this.selectedUser) {
      this.userList = [];
      if (value.length > 3) {
        this._userService.getUsersList(value).subscribe(data => {
          this.userList = data.items;
        });
      }
    }
  }

  /**
   * @description Metho to Get Tasks
   * @author Krunal
   * @date 2020-05-07
   * @memberof UserComponent
   */
  getTasksList() {
    if (this.selectedUser && this.selectedUser['userID']) {
      this.isLoading = true;
      let payload = `userId=${this.selectedUser['userID']}&page=${this.page}&pageSize=${this.pageSize}`;
      if (this.orderNumberSearch && this.orderNumberSearch.length > 1) {
        payload = payload + `&orderNumber=${this.orderNumberSearch}`;
      }
      // const payload = `userId=${this.selectedUser['userID']}&page=${this.page}&pageSize=${this.pageSize}`;
      this._userService.getTasksList(payload).subscribe({
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

  /**
   * @description Method to Search Task by Order Number
   * @author Krunal Shriram Sakharkar
   * @date 2020-05-08
   * @memberof UserComponent
   */
  getTasksByorderNumberSearch() {
    if (this.orderNumberSearch.length > 1) {
      this.resetList();
      this.getTasksList();
    }
  }

  /**
   * @description Method to a Tasks in Table Task List
   * @author Krunal
   * @date 2020-05-07
   * @param {*} data
   * @memberof UserComponent
   */
  addTasksToTasksList(data) {
    data.forEach((item, index) => {
      this.tasksList.push(item);
      if (index === (data.length - 1)) {
        this.isLoading = false;
        // console.log('Length', this.tasksList.length);
      }
    });
  }

  /**
   * @description Metho to get Next Tasks On scroll
   * @author Krunal
   * @date 2020-05-07
   * @memberof UserComponent
   */
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

  
}
