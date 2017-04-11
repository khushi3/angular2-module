import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';
import { UserGroupService  } from './usergroup.service';
import {UserGroup} from './userGroup';
import {Http, Response} from '@angular/http';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

@Component({
  selector: 'modal-content',
   styleUrls: ['./custom-modal.scss'],
  templateUrl: './custom-modal.html',
  
})
export class CustomModal implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
   usergroup: UserGroup;

  public wrongAnswer: boolean;
  public shouldUseMyClass: boolean;
  private sourceUsers:Array<any>;
  private modalOpen: boolean;
  constructor(private userGroupService: UserGroupService, public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
    this.userGroupService.getUsers().subscribe(data => {
      this.sourceUsers = data;
      console.log("new",data);
    }, error => console.log('Could not load users '));
  }

public  saveUsers() {  
    if (this.confirmed && this.confirmed.length) {
      //this.userGroupName = userGrpName;
     // console.log( "func "+this.usergroup.users);
      //this.userGroupService.saveUsers(this.confirmed)
      //.subscribe((r:Response)=>{
       // console.log(r);
      //});
      console.log("users saved successfully!!");
      this.dialog.close(this.confirmed);
    }
  }
  closeModal() {
    this.modalOpen = false;
    this.dialog.close();
  }
  onKeyUp(value) {
    this.wrongAnswer = value != 5;
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.modalOpen;
  }

  private tab:number = 1;
  private keepSorted:boolean = true;
  private key:string;
  private display:string;
  private filter:boolean = false;
  private source:Array<any>;
  private confirmed:Array<any>;


  private sourceChessmen:Array<any>;
  private confirmedUsers:Array<any>;
  private confirmedChessmen:Array<any>;
  private toggle:boolean = true;
  private userAdd:string = '';
  private chessmen:Array<any> = [
    { _id: 1, name: "Pawn" },
    { _id: 2, name: "Rook" },
  ];

  ngOnInit() {
    this.doReset();
  }

  private useUsers() {
    this.toggle = true;
    this.key = 'userId';
    this.display = 'firstName';
    this.keepSorted = true;
    this.source = this.sourceUsers;;
    this.confirmed = this.confirmedUsers;
  }

  private useChessmen() {
    this.toggle = false;
    this.key = '_id';
    this.display = 'name';
    this.keepSorted = false;
    this.source = this.sourceChessmen;
    this.confirmed = this.confirmedChessmen;
  }

  doSwap() {
    if (this.toggle) {
      this.useChessmen();
    } else {
      this.useUsers();
    }
  }

  doReset() {
    this.sourceChessmen = JSON.parse(JSON.stringify(this.chessmen));
    this.sourceUsers = [];
    this.confirmedChessmen = new Array<any>();
    this.confirmedUsers = new Array<any>();

    if (this.toggle) {
      this.useUsers();
      this.confirmedUsers.push( { key: 32, station: 'Eureka', state: 'CO' } );
    } else {
      this.useChessmen();
    }
  }

  doDelete() {
    if (this.source.length > 0) {
      this.source.splice(0, 1);
    }
  }

  doCreate() {
    let o:any = {};
    o[this.key] = this.source.length + 1;
    o[this.display] = this.userAdd;
    this.source.push( o );
    this.userAdd = '';
  }

  doAdd() {
    for (let i = 0, len = this.source.length; i < len; i += 1) {
      let o = this.source[i];
      let found = this.confirmed.find( (e:any) => e[this.key] === o[this.key] );
      if (!found) {
        this.confirmed.push(o);
        break;
      }
    }
  }

  doRemove() {
    if (this.confirmed.length > 0) {
      this.confirmed.splice(0, 1);
    }
  }

  doFilter() {
    this.filter = !this.filter;
  }

  filterBtn() {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }

}