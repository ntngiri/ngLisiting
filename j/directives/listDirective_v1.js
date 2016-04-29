angular.module('naukri.listing',[])
.directive("node", function(filterFilter) {
        return {
			restrict:'E',
            require: ['^listing'],
            scope: {
                "parentdata": "=",
                "data": "=",
				"selectedId":"=",
            },
            "template": '<input type="checkbox" ng-checked="selectedId.indexOf(data.id) > -1">',
            link: function(scope, iElement, iAttr, controllers) {}
        }
    }).directive('listing', function($compile) {
        return {
			restrict: 'E',
			//replace:true,
            "scope": {
                "parentdata": "=",
				"selectedId":"=",
                "data": "=",
                "fieldtext": "=",
                "searchtext": "=",
				'callback': '&listingCallback',
                "onChoose": "&onSelect"
            },
            "template": '<div class="act" par-id="{{parentdata.id}}" style="padding-left:10px" ng-repeat="nodedata in data">{{nodedata.name}}' +
				'<node data="nodedata" parentdata="parentdata" selected-id="selectedId" ng-click="checkItem(this)"></node>'+
                '<listing ng-if="nodedata.list" data="nodedata.list" parentdata="nodedata" selected-id="selectedId"/>' +
                '</div>',

            "compile": function(tElement, tAttr) {

                var contents = tElement.contents().remove();
                var compiledContents;
			window._selectedId = [];
            return function(scope,iElement,iAttr,controllers) {
					window.obj={};
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    var foo = compiledContents(scope, function(clone) {
                        return clone;
                    });
                    iElement.append(foo);
//				pre: function(scope){					
					scope.checkParentChildRelation = function(data){
						var selectedCount = 0;
						angular.forEach(data, function(value, key) {
						var id = value.id;
						var len =0;
							if(value.list){
								len = value.list.length;
							}
							
						var idPresent = selectedIDs.indexOf(id); // need to discuss
	
						var idAlrPresent = _selectedId.indexOf(id); // need to removed
							if(idPresent>=0 && idAlrPresent<0){	
								_selectedId.push(id);
								selectedCount++;
	
							}
							obj[id] = {selected:selectedCount,allChild:len};
							
							if(value.list){
								scope.checkParentChildRelation(value.list);
							}
						});
					}
				//},
				//post: function(scope, element, attributes, controller, transcludeFn){
					scope.checkParentChildRelation(json);
					scope.checkAllChildSelected = function(t){ // check if all the child is selected or not if yes make parent select
									window.p =t;
							if(t.parentdata){
								if(obj[t.parentdata.id].allChild>0){
									if(obj[t.parentdata.id].allChild - obj[t.parentdata.id].selected == 0){
										// make parent selcted,checkCheckBox()
									}
								}
							}
					},
					scope.checkParentSelected = function(t){ // check whether if it is a parent of someone and also selected than make all the child selected
					window.pp =t;
							if(t.nodedata.list){	
								angular.forEach(t.nodedata.list, function(value, key) {
										if(scope.checkIdAlrPresent(value.id,_selectedId)){
											_selectedId.push(value.id);
											obj[value.id].selected = obj[value.id].selected+1;
											// make all child selected,checkCheckBox()
											
										}
								});
							}else{
								if(scope.checkIdAlrPresent(t.nodedata.id,_selectedId)){
										_selectedId.push(t.nodedata.id);
										// make child selected,checkCheckBox()
									}
							}
					},				
					scope.checkIdAlrPresent  = function(id,arr){
						var idPresent = arr.indexOf(id);
						if(idPresent>=0)
							return false;
						else	
							return true;
					},
					scope.checkCheckBox = function(t){},
					scope.checkItem = function(_this) {
						var arr = [];
						arr = scope.checkSelection(_this);
	//					console.log(arr,2332);
						scope.callback({
							'item': {
								id: _this.nodedata.id,
								name: _this.nodedata.name,
								allSelected: arr,
								checked: _this.nodedata.checked
							}
						});	
						
						scope.checkParentSelected(_this);
						scope.checkAllChildSelected(_this);
						scope.watchArray();
					};
					
					scope.watchArray = function(){
						scope.arr = _selectedId;
						scope.$watchCollection('arr',function(newArr,oldArr) {
						});
					},
					scope.checkSelection = function(t) { // array and selectedId will be the same after this, 
						var id = t.nodedata.id;
						var array = scope.selectedId;
						//var name = t.item.name;
						//var index = array.indexOf(id);
					  /*  if (scope.attr.multiselect == 'false') {
							var array = [];
							array.push(id);
						} else {
							var index = array.indexOf(id);
							if (index == -1)
								array.push(id);
							else
								array.splice(index, 1);
						}*/
						return ['bdr','mum','ind'];
	
					}
			//	}
				}
				}, 
            "controller": function($scope) {
            	this.s=$scope.selectedId;
            	console.log(this);
/*                $scope.escapeCharacter = "!,";
                this._select = function(data) {
                    $scope.$emit('onChoose', data);
                };
				
                $scope.$on('onChoose', function(e, data) {
                    $scope.onChoose({
                        data: data
                    });
                });*/

            }
        
        }
});