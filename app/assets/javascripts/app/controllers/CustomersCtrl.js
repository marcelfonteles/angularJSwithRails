'use strict';

var app = angular.module('app02');

app.controller('CustomersCtrl', ["$scope", "$log", "Customer", function($scope, $log, Customer) {
  $scope.app = "Customers List";
  $scope.isIndex;
  
  $scope.getCustomers = function() {
    Customer.getCustomers()
      .then(function(response) {
        $scope.customers = response.data.data
        $scope.isIndex = true;
      })
  };
  $scope.getCustomers();

  $scope.disabledDeleteCustomers = function(customers) {
    return !$scope.customers.some(function(customer) {
      return customer.selected === true
    })
  };

  $scope.deleteCustomers = function(customers) {
    if (window.confirm("Tem certeza que deseja apagar os contatos selecionados?")) {
      var deleteCustomers = customers.filter(function(customer) {
        return customer.selected === true
      });  
      
      deleteCustomers.forEach(function(customer) {
        Customer.deleteCustomer(customer.id).then(function(response) {
          if (response.data.status === 200) {
            $scope.customers = $scope.customers.filter(function(customer_i) {
              return customer_i !== customer;
            });
          };
        });
      });
    }
  };
  
  $scope.addCustomer = function(customer) {
    Customer.addCustomer(angular.copy(customer)).then(function(response) {
      $log.log('batata')
      $scope.customers.push(angular.copy(response.data.data));
      alert("Cliente cadastrado com sucesso!");
    });
  };


  // Second part - Show Customer and your Loans
  $scope.showCustomer = function(customer) {
    Customer.showCustomer(customer.id).then(function(response) {
      $scope.customers = []
      $scope.customers.push(response.data.data);
      $scope.loans = response.data.data2
      $scope.isIndex = false;
    });
  }

  $scope.deleteLoans = function(loans) {
    loans.forEach(function(loan) {
      Customer.deleteLoan(loan.id).then(function(response) {
        $log.log(response.data.message)
        $scope.loans = loans.filter(function(loan) {
          return loan.selected !== true
        });
      });
    });    
  };

  $scope.disabledDeleteLoans = function(loans) {
    return !loans.some(function(loan) {
      return loan.selected === true
    })
  }

  $scope.addLoan = function(loan) {
    loan.customer_id = $scope.customers[0].id;
    Customer.addLoan(loan).then(function(response) {
      alert(response.data.message);
      $scope.loans.push(response.data.data);
    })


  }

}])