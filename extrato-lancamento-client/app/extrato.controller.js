var app = angular.module("extratoLancamento", []);
    app.controller("extratoLancamentoController", function ($scope, $http){
        $scope.msgErro = true;
        $http.get("http://localhost:8080/extratos").then(function(response) {
            $scope.lancamentos = response.data;
        });
        
        $scope.filtrar = function(){
            
            if($scope.banco != undefined && $scope.banco > 0 
                && $scope.agencia != undefined && $scope.agencia > 0 
                && $scope.conta != undefined && $scope.conta >0){
                    $scope.lancamentos = [];
                    $http.get("http://localhost:8080/extratos/banco/" + $scope.banco + "/agencia/" + $scope.agencia + "/conta/" + $scope.conta).then(function(response) {
                        $scope.lancamentos = response.data;
                    });
            } else {
                $scope.msgErro = false;
                return;
            }
        }
        
        $scope.limpar = function(){
            $scope.lancamentos = [];
            $scope.banco = "";
            $scope.agencia = "";
            $scope.conta = "";
            $http.get("http://localhost:8080/extratos").then(function(response) {
                $scope.lancamentos = response.data;
            });
        }
        
        $scope.pad  = function(str, length){
            const resto = length - String(str).length;
            return '0'.repeat(resto > 0 ? resto : '0') + str;
        } 
        
    });
   