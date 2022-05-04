import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ResumeInterface, TransactionInterface } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient) { }


  getResume() : Promise<ResumeInterface> { 
    return firstValueFrom(this.http.get<ResumeInterface>('/transactions/resume'));
  }

  deleteTransaction(id: number) {
    return firstValueFrom(this.http.delete('/transactions/' + id, {responseType: 'text'}))
  }


  addNewTransaction(transaction: Partial<TransactionInterface>) : Promise<TransactionInterface> { 
    return firstValueFrom(this.http.post<TransactionInterface>('/transactions', transaction));
  }

  public listTransactions() : Promise<TransactionInterface[]> { 
    return firstValueFrom(this.http.get<TransactionInterface[]>('/transactions'));
  }

}
