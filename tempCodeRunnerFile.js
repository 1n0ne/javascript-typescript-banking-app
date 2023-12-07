arizonaBank.addBranch(westBranch)
  arizonaBank.addBranch(sunBranch)
  
  arizonaBank.findBranchByName("bank")
  arizonaBank.findBranchByName("sun")
  
  arizonaBank.addCustomer(westBranch, customer1)
  arizonaBank.addCustomer(westBranch, customer3)
  arizonaBank.addCustomer(sunBranch, customer1)
  arizonaBank.addCustomer(sunBranch, customer2)
  
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
  arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
  
  customer1.addTransaction(-1000)
  console.log(customer1.getBalance())
  console.log(arizonaBank.listCustomers(westBranch, true))
  console.log(arizonaBank.listCustomers(sunBranch,true))