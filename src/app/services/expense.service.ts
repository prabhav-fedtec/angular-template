import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Expense } from "../../types/expense";
import { Page } from "../../types/page";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly baseUrl = '/api/expenses';

  constructor(private http: HttpClient) {}

  getExpensesForUser(): Observable<Page<Expense>> {
    return this.http.get<Page<Expense>>(`${this.baseUrl}/user`, {withCredentials: true});
  }

  createExpenseForUser(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}/user`, expense, {withCredentials: true});
  }

  deleteExpenseForUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/user`, {withCredentials: true});
  }
}
