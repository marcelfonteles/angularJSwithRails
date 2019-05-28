'use strict';

var app = angular.module('app02');

app.controller('CustomersCtrl', ["$scope", "$log", "Customer", function($scope, $log, Customer) {
  $scope.app = "Customers List";
  $scope.customer = [];
  
  $scope.getCustomers = function() {
    Customer.getCustomers()
      .then(function(response) {
        $scope.customers = response.data.data
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
      $scope.customers.push(angular.copy(response.data.data));
      alert("Cliente cadastrado com sucesso!");
    });
  };

  $scope.showCustomer = function(customer) {
    $scope.customers = []
  }

}])