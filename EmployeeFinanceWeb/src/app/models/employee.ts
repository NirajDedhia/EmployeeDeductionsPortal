import { Plan } from '../models/plan';

export class Employee {
    id: number;
    name: string;
    address: string;
    phone: number;
    salary: number;
    plan: Plan[];
}
