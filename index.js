var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        this.amount = amount;
        this.date = date || new Date();
    }
    return Transaction;
}());
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) {
            return total + transaction.amount;
        }, 0);
    };
    Customer.prototype.addTransaction = function (amount) {
        if (this.validateAmount(amount)) {
            if (this.getBalance() + amount >= 0) {
                this.transactions.push(new Transaction(amount));
                return true;
            }
            else {
                console.log("Error: The account balance cannot be negative.");
            }
        }
        return false;
    };
    Customer.prototype.validateAmount = function (amount) {
        if (typeof amount === "number") {
            return true;
        }
        console.log("Error: Amount should be a number.");
        return false;
    };
    return Customer;
}());
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    Branch.prototype.getName = function () {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        if (this.validateCustomer(customer)) {
            if (!this.customers.find(function (c) { return c.id === customer.id; })) {
                this.customers.push(customer);
                return true;
            }
            console.log("Error: The customer already exists.");
        }
        return false;
    };
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (c) { return c.id === customerId; });
        if (customer) {
            if (customer.validateAmount(amount)) {
                customer.addTransaction(amount);
                return true;
            }
        }
        console.log("Error: The customer does not exist.");
        return false;
    };
    Branch.prototype.validateCustomer = function (customer) {
        if (customer instanceof Customer) {
            return true;
        }
        console.log("Error: Customer should be an instance of the Customer class.");
        return false;
    };
    return Branch;
}());
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        if (this.validateBranch(branch)) {
            if (!this.branches.includes(branch)) {
                this.branches.push(branch);
                return true;
            }
            console.log("Error: The branch already exists.");
        }
        return false;
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.validateBranch(branch) && customer instanceof Customer) {
            var customerExists_1 = false;
            this.branches.forEach(function (b) {
                if (b.customers.includes(customer)) {
                    customerExists_1 = true;
                    return;
                }
            });
            if (customerExists_1) {
                console.log("Error: The customer already exists in another branch.");
                return false;
            }
            var foundBranch = this.branches.find(function (b) { return b === branch; });
            if (foundBranch) {
                return foundBranch.addCustomer(customer);
            }
            console.log("Error: Branch not found.");
        }
        return false;
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (this.validateBranch(branch)) {
            var foundBranch = this.branches.find(function (b) { return b === branch; });
            if (foundBranch) {
                return foundBranch.addCustomerTransaction(customerId, amount);
            }
            console.log("Error: The branch not found.");
        }
        return false;
    };
    Bank.prototype.validateBranch = function (branch) {
        if (branch instanceof Branch) {
            return true;
        }
        console.log("Error: The branch should be an instance of the Branch class.");
        return false;
    };
    Bank.prototype.findBranchByName = function (branchName) {
        var matchedBranches = this.branches.filter(function (branch) { return branch.name === branchName; });
        return matchedBranches.length > 0 ? matchedBranches : null;
    };
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        if (this.validateBranch(branch)) {
            var foundBranch = this.branches.find(function (b) { return b === branch; });
            if (foundBranch) {
                foundBranch.customers.forEach(function (c) {
                    console.log("Name: ".concat(c.name));
                    console.log("ID: ".concat(c.id));
                    if (includeTransactions && c.transactions.length > 0) {
                        console.log('Transactions:');
                        c.transactions.forEach(function (t, index) {
                            console.log("Transaction ".concat(index + 1, ":"));
                            console.log("Amount: ".concat(t.amount));
                            console.log("Date: ".concat(t.date));
                        });
                    }
                    else {
                        console.log('No transactions found.');
                    }
                    console.log('______________________________________________________________');
                });
            }
        }
    };
    Bank.prototype.searchCustomer = function (id) {
        var found = false;
        for (var _i = 0, _a = this.branches; _i < _a.length; _i++) {
            var branch = _a[_i];
            for (var _b = 0, _c = branch.customers; _b < _c.length; _b++) {
                var customer = _c[_b];
                if (customer.id === id) {
                    console.log("The customer is found");
                    console.log("Branch: ".concat(branch.getName()));
                    console.log("Customer: ".concat(customer.getName()));
                    found = true;
                    return;
                }
            }
        }
        console.log("The customer is not registered");
    };
    return Bank;
}());


//test cases
var arizonaBank = new Bank("Arizona");
var lalalandBank = new Bank("lalaland");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
console.log(arizonaBank.addBranch(westBranch));
console.log(arizonaBank.addBranch(sunBranch));
console.log(arizonaBank.addBranch(westBranch));
console.log("______________________________________________________________");
console.log(arizonaBank.findBranchByName("West Branch"));
console.log(arizonaBank.findBranchByName("sun"));
console.log("______________________________________________________________");
console.log(arizonaBank.addCustomer(westBranch, customer1));
console.log(arizonaBank.addCustomer(westBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
console.log(arizonaBank.addCustomer(sunBranch, customer2));
console.log("______________________________________________________________");
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000));
console.log("_________________________________________________________________");
console.log(customer1.addTransaction(-8000));
console.log(customer2.addTransaction(-50000));
console.log("_________________________________________________________________");
console.log(customer1.getBalance());
console.log("______________________________westBranch________________________________");
console.log(arizonaBank.listCustomers(westBranch, true));
console.log("__________________________________sunBranch_____________________________");
console.log(arizonaBank.listCustomers(sunBranch, true));
console.log("__________________________________Search the customer with id_____________________________");
arizonaBank.searchCustomer(customer1.getId());
lalalandBank.searchCustomer(customer2.getId());
