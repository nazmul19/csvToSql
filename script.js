var csvToSQL = angular.module('csvToSQL',['ngClipboard']);

csvToSQL.config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("zeroClipboard/ZeroClipboard.swf");
  }]);

csvToSQL.controller('CsvSQLController', function($scope){
		
		$scope.aboutPageRequest = false;
		$scope.contactPageRequest = false;
		$scope.firstStep = true;
		$scope.secondStep = false;
		$scope.finalStep = false;

	    $scope.csvArray = [];
        $scope.csvData ='';
        $scope.avlPlaceholder=[];
        $scope.queryTemplate='';
        $scope.sqlTEXT='SELECT * FROM EMP';

        $scope.testFinalQuery='';
        $scope.finalQuery='';
        
		$scope.loadCsvData = function() {
			//console.log('loadCsvData');
			//console.log($scope.csvData);
			$scope.csvArray = $.csv.toArrays($scope.csvData);   
			$scope.avlPlaceholder = $scope.csvArray[0];
			for(itemIndex in $scope.avlPlaceholder){
				//console.log('foreach loop');
				$scope.avlPlaceholder[itemIndex] =$scope.avlPlaceholder[itemIndex].toUpperCase();	
			}
			if($scope.avlPlaceholder.length > 0){
				$scope.firstStep = false;
				$scope.secondStep = true;
				$scope.finalStep = false;
				$scope.aboutPageRequest = false;
				$scope.contactPageRequest = false;
			}
		};
		$scope.appendPlaceHolder = function(item){
			$scope.queryTemplate = $scope.queryTemplate +item;
		};
		$scope.queryPage = function(){
				$scope.firstStep = false;
				$scope.secondStep = false;
				$scope.finalStep = true;
				$scope.aboutPageRequest = false;
				$scope.contactPageRequest = false;
				$scope.generateTestQuery();
		};
		$scope.generateTestQuery=function(){
			var columnRow = $scope.csvArray[0];
			var oneRow = $scope.csvArray[1];
			var sqlTemplate = $scope.queryTemplate;
			for(var index=0; index < columnRow.length ; index++){
				var columnName = columnRow[index].toUpperCase();
				var searchReplacement = oneRow[index];
				sqlTemplate = sqlTemplate.split(columnName).join(searchReplacement);
			}
			$scope.testFinalQuery=sqlTemplate+";";
		};	
		$scope.generateAllQuery = function(){
			for(var index=1; index < $scope.csvArray.length ; index++){
				var sqlTemplate = $scope.queryTemplate;
				angular.forEach($scope.csvArray[index], function(value, key){
					sqlTemplate = sqlTemplate.split($scope.avlPlaceholder[key]).join(value);	
				});
				$scope.finalQuery = $scope.finalQuery + sqlTemplate +";";
			}

			
		};
		$scope.getTextToCopy = function(){
			return $scope.finalQuery;
		};
		$scope.doSomething = function(){
			//console.log('doSomething');
		};
		$scope.modifyQueryTpl = function(){
			$scope.finalStep = false;
			$scope.secondStep = true;
		};
		$scope.reLoad = function(){
			$scope.firstStep = true;
			$scope.secondStep = false;
			$scope.finalStep = false;

		    $scope.csvArray = [];
	        $scope.csvData ='';
	        $scope.avlPlaceholder=[];
	        $scope.queryTemplate='';
	        $scope.sqlTEXT='SELECT * FROM EMP';

	        $scope.testFinalQuery='';
	        $scope.finalQuery='';
	        $scope.aboutPageRequest = false;
			$scope.contactPageRequest = false;
		};
		$scope.aboutEvent = function(){
			$scope.reLoad();
			$scope.firstStep = false;
			$scope.aboutPageRequest = true;	
		};

		$scope.contactEvent = function(){
			$scope.reLoad();
			$scope.firstStep = false;
			$scope.contactPageRequest = true;	
		};
});