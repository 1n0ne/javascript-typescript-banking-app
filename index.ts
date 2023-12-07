class Transaction {
    amount: number;
    date: Date;
  
    constructor(amount: number, date?: Date) {
      this.amount = amount;
      this.date = date || new Date();
    }
  }
  
  class Customer {
    name: string;
    id: number;
    transactions: Transaction[];
  
    constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
      this.transactions = [];
    }
  
    getName(): string {
      return this.name;
    }
  
    getId(): number {
      return this.id;
    }
  
    getTransactions(): Transaction[] {
      return this.transactions;
    }
  
    getBalance(): number {
      return this.transactions.reduce((total, transaction) => {
        return total + transaction.amount;
      }, 0);
    }
  
    addTransaction(amount: number): boolean {
      if (this.validateAmount(amount)) {
        if (this.getBalance() + amount >= 0) {
          this.transactions.push(new Transaction(amount));
          return true;
        } else {
          console.log("Error: The account balance cannot be negative.");
        }
      }
      return false;
    }
  
    validateAmount(amount: number): boolean {
      if (typeof amount === "number") {
        return true;
      }
      console.log("Error: Amount should be a number.");
      return false;
    }
  }
  
  class Branch {
    name: string;
    customers: Customer[];
  
    constructor(name: string) {
      this.name = name;
      this.customers = [];
    }
  
    getName(): string {
      return this.name;
    }
  
    getCustomers(): Customer[] {
      return this.customers;
    }
  
    addCustomer(customer: Customer): boolean {
      if (this.validateCustomer(customer)) {
        if (!this.customers.find((c) => c.id === customer.id)) {
          this.customers.push(customer);
          return true;
        }
        console.log("Error: The customer already exists.");
      }
      return false;
    }
  
    addCustomerTransaction(customerId: number, amount: number): boolean {
      const customer = this.customers.find((c) => c.id === customerId);
      if (customer) {
        if (customer.validateAmount(amount)) {
          customer.addTransaction(amount);
          return true;
        }
      }
      console.log("Error: The customer does not exist.");
      return false;
    }
  
    validateCustomer(customer: Customer): boolean {
      if (customer instanceof Customer) {
        return true;
      }
      console.log("Error: Customer should be an instance of the Customer class.");
      return false;
    }
  }
  
  class Bank {
    name: string;
    branches: Branch[];
  
    constructor(name: string) {
      this.name = name;
      this.branches = [];
    }
  
    addBranch(branch: Branch): boolean {
      if (this.validateBranch(branch)) {
        if (!this.branches.includes(branch)) {
          this.branches.push(branch);
          return true;
        }
        console.log("Error: The branch already exists.");
      }
      return false;
    }
  
    addCustomer(branch: Branch, customer: Customer): boolean {
      if (this.validateBranch(branch) && customer instanceof Customer) {
        let customerExists = false;
        this.branches.forEach((b) => {
          if (b.customers.includes(customer)) {
            customerExists = true;
            return;
          }
        });
  
        if (customerExists) {
          console.log(
            "Error: The customer already exists in another branch."
          );
          return false;
        }
  
        const foundBranch = this.branches.find((b) => b === branch);
        if (foundBranch) {
          return foundBranch.addCustomer(customer);
        }
        console.log("Error: Branch not found.");
      }
      return false;
    }
  
    addCustomerTransaction(
      branch: Branch,
      customerId: number,
      amount: number
    ): boolean {
      if (this.validateBranch(branch)) {
        const foundBranch = this.branches.find((b) => b === branch);
        if (foundBranch) {
          return foundBranch.addCustomerTransaction(customerId, amount);
        }
        console.log("Error: The branch not found.");
      }
      return false;
    }
  
    validateBranch(branch: Branch): boolean {
      if (branch instanceof Branch) {
        return true;
      }
      console.log("Error: The branch should be an instance of the Branch class.");
      return false;
    }
  
    findBranchByName(branchName: string): Branch[] | null {
      const matchedBranches = this.branches.filter(
        (branch) => branch.name === branchName
      );
      return matchedBranches.length > 0 ? matchedBranches : null;
    }
  
    checkBranch(branch: Branch): boolean {
      return this.branches.includes(branch);
    }
  
    listCustomers(branch: Branch, includeTransactions: boolean): void {
      if (this.validateBranch(branch)) {
        const foundBranch = this.branches.find((b) => b === branch);
      if (foundBranch) {
        foundBranch.customers.forEach((c) => {
          console.log(`Name: ${c.name}`);
          console.log(`ID: ${c.id}`);
          if (includeTransactions && c.transactions.length > 0) {
            console.log('Transactions:');
            c.transactions.forEach((t, index) => {
              console.log(`Transaction ${index + 1}:`);
              console.log(`Amount: ${t.amount}`);
              console.log(`Date: ${t.date}`);
            });
          } else {
            console.log('No transactions found.');
          }
          console.log('______________________________________________________________');
        });
      }
    }
  }

  searchCustomer(id: number): void {
    let found = false;
    for (const branch of this.branches) {
      for (const customer of branch.customers) {
        if (customer.id === id) {
          console.log("The customer is found");
          console.log(`Branch: ${branch.getName()}`);
          console.log(`Customer: ${customer.getName()}`);
          found = true;
          return;
        }
      }
    }

    console.log("The customer is not registered");
  }
}


//test cases
const arizonaBank = new Bank("Arizona");
const lalalandBank = new Bank("lalaland");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

console.log(arizonaBank.addBranch(westBranch));
console.log(arizonaBank.addBranch(sunBranch));
console.log(arizonaBank.addBranch(westBranch)); 
console.log("______________________________________________________________")

console.log(arizonaBank.findBranchByName("West Branch"));
console.log(arizonaBank.findBranchByName("sun"));

console.log("______________________________________________________________")
console.log(arizonaBank.addCustomer(westBranch, customer1));
console.log(arizonaBank.addCustomer(westBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
console.log(arizonaBank.addCustomer(sunBranch, customer2));
console.log("______________________________________________________________")
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000));
console.log("_________________________________________________________________")
console.log(customer1.addTransaction(-8000));
console.log(customer2.addTransaction(-50000));
console.log("_________________________________________________________________")

console.log(customer1.getBalance());
console.log("______________________________westBranch________________________________")
console.log(arizonaBank.listCustomers(westBranch, true));
console.log("__________________________________sunBranch_____________________________")
console.log(arizonaBank.listCustomers(sunBranch,true));
console.log("__________________________________Search the customer with id_____________________________")
arizonaBank.searchCustomer(customer1.getId());
lalalandBank.searchCustomer(customer2.getId());

