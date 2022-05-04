import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ResumeInterface, TransactionInterface } from 'src/app/interfaces/transaction';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public modalRef?: BsModalRef;
  public transactions?: TransactionInterface[];
  public resume?: ResumeInterface;
  public transactionForm = new FormGroup({
    value: new FormControl(),
    description: new FormControl(),
    entry: new FormControl(true)
  });

  constructor(public dashboardService: DashboardService, private modalService: BsModalService, private authService: AuthService, public route: Router) { }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  async ngOnInit(): Promise<void> {
    await this.handleDashboard();
  }


  public async handleDashboard() {
    this.transactions = await this.dashboardService.listTransactions();
    this.resume = await this.dashboardService.getResume();
  }


  logout() {
    this.authService.logout()
    this.route.navigate(['/login'])
  }


  formatDate(date: any) {
    return Date.apply(this, date);
  }

  async deleteTransaction(transaction: TransactionInterface) {
    await this.dashboardService.deleteTransaction(transaction.id);
    await this.handleDashboard();
  }

  async addTransaction() {
    if(this.transactionForm.valid) {
      await this.dashboardService.addNewTransaction(this.transactionForm.value);
      await this.handleDashboard();
      await this.modalRef?.hide()
    }
  }



}
