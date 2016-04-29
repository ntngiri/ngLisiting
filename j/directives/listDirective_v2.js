angular.module('naukri.listing', [])
    .directive('ngRepeatDoneNotification', function() {
        return function(scope, element, attrs) {

            if (!scope.$parent.multiSelect) {

                if (scope.selectedId && scope.selectedId.length != 0 && scope.$last && !scope.$parent.firstReapet) {
                    scope.$parent.firstReapet = 1;
                    scope.callback({
                        'item': {
                            id: scope.selectedId[0],
                            name: scope.data[scope.idHash.indexOf(scope.selectedId[0])].name,
                            allSelected: scope.selectedId,
                            checked: null,
                            first: true
                        }
                    });
                }
            }
            //console.log(scope.$parent.idHash);
        };
    }).directive('listing', function($compile) {
        return {
            restrict: 'E',
            transclude: true,
            require: '?^listing',
            replace: true,
            scope: {
                'data': '=',
                'tupleCount': '=',
                'selectedId': '=',
                'maxHeight': '@',
                'callback': '&listingCallback',
                'multiSelect': '=',
                'filterName': "=",
                'active': '=',
                'parent': '=',
                'callbackRef': '='
            },

            //template: '<ul><li ng-repeat="item in data|limitTo:tupleCount|filter:{$:filterName}" ng-repeat-done-notification={{item.id}} ng-click="checkItem(this)"><input ng-if="multiSelect" type="checkbox" ng-model=item.checked><div style="display:inline-block;" ng-transclude></div></li></ul>',
            template: '<ul>' +
                '<li ng-repeat="item in data|limitTo:tupleCount|filter:{$:filterName}" ng-repeat-done-notification={{item.id}} ng-click="checkItem(this.item,$event)">' +
                '<div ng-class="{notSelectable:item.notSelectable}"><input ng-if="multiSelect && !item.notSelectable" type="checkbox" ng-checked=isChecked(item)>{{item.name}}</div>' +
                '<listing filter-name="filterName" tuple-count="tupleCount" multi-select="multiSelect" parent="item" ng-if="item.list" selected-id ="selectedId" listing-callback="callbackRef(item)" callback-ref="callbackRef" data="item.list"><div><span>{{$parent.item.name}}</span></div></listing>' +
                '</li>' +
                '</ul>',
            compile: function(tElement, tAttr, trans) {
                var contents = tElement.contents().remove();
                var compiledContents;

                return function(scope, iElement, iAttr, controllers) {

                    if (!compiledContents) {
                        compiledContents = $compile(contents, trans);
                    }
                    var foo = compiledContents(scope, function(clone) {
                        return clone;
                    });
                    iElement.append(foo);

                    scope.firstReapet = 0;
                    scope.selObj = {};
                    scope.idHash = [];

                    if (scope.data) {
                        scope.data.forEach(function(x) {
                            scope.idHash.push(x.id);
                        });
                    }


                    scope.$on('select', function(event, someData, flag) {
                        var elemToSel;
                        if (flag) {
                            elemToSel = scope.data[scope.idHash.indexOf(flag)];
                        } else {
                            elemToSel = scope.data[scope.active];
                        }

                        scope.checkItem({
                            'item': elemToSel
                        });
                    });

                    scope.$on('deSelect', function(event, id) {

                    });

                    scope.isActive = function(matchIdx) {
                        if (scope.active < iElement.find('li').length) {
                            return scope.active === matchIdx;
                        } else {
                            scope.active = 0;
                            //  return scope.active === matchIdx;
                        }
                    };

                    scope.xxx = function() {
                        console.log(arguments);
                        // if (scope.filterName && arguments[0].notSelectable)
                        //     return false;
                        // else if (arguments[0].name.indexOf(scope.filterName) > -1)
                        //     return true;
                        return true;
                    };

                    scope.isChecked = function(item) {
                        /*
                        for selecting parent and child on initial load
                         */
                        /*(scope.selectedId.indexOf(item.id) > -1) && item.list ? checkChild(item, item.list) : angular.noop();

                        scope.$parent.data ? checkParent(scope) : angular.noop();*/

                        if (scope.selectedId.indexOf(item.id) > -1) {
                            item.checked = false;
                            return true;
                        } else {
                            item.checked = true;
                            return false;
                        }
                        // return scope.selectedId.indexOf(item.id) > -1 ? true : false;
                    };


                    scope.checkItem = function(item, $event) {

                        var arr = [];
                        scope.attr = iAttr;

                        if (item.notSelectable) {
                            //iElement.addClass('notSelectable');
                            return;
                        }

                        $event.stopPropagation();

                        scope.checkSelection(item);

                        //for selecting child elements
                        item.list ? checkChild(item, item.list) : angular.noop();

                        //for selecting parent elements
                        scope.parent ? checkParent(scope) : angular.noop();

                        scope.callback({
                            'item': {
                                id: item.id,
                                name: item.name,
                                allSelected: scope.selectedId,
                                checked: item.checked
                            }
                        });
                    };

                    /**
                     * [checkChild description]
                     * @param  {[obj]} item [selected item]
                     * @param  {[arr]} list [child list of selected item]
                     * @return {[]}      [end recursion]
                     */
                    function checkChild(item, list) {
                        if (scope.selectedId.indexOf(item.id) > -1) {
                            for (var i = list.length - 1; i >= 0; i--) {
                                if (scope.selectedId.indexOf(list[i].id) < 0) {
                                    scope.checkSelection(list[i]);
                                }
                            }
                        } else {
                            for (var i = list.length - 1; i >= 0; i--) {
                                if (scope.selectedId.indexOf(list[i].id) > -1) {
                                    scope.selectedId.splice(scope.selectedId.indexOf(list[i].id), 1);
                                }
                            }
                        }

                        if (list) {
                            for (var i = list.length - 1; i >= 0; i--) {
                                if (list[i].list) {
                                    checkChild(list[i], list[i].list);
                                }
                            }
                        } else {
                            return;
                        }
                    }

                    /**
                     * [checkParent description]
                     * @param  {[obj]} sc [selected item scope obj]
                     * @return {[]}    [end recursion]
                     */
                    function checkParent(sc) {
                        if (!sc.parent) {
                            return;
                        }

                        var flag = 1;

                        for (var i = sc.parent.list.length - 1; i >= 0; i--) {
                            if (sc.selectedId.indexOf(sc.parent.list[i].id) < 0) {
                                flag = 0;
                                break;
                            }
                        }

                        if (flag) {
                            if (sc.selectedId.indexOf(sc.parent.id) < 0 && !sc.parent.notSelectable) sc.selectedId.push(sc.parent.id);
                        } else {
                            if (sc.selectedId.indexOf(sc.parent.id) > -1) sc.selectedId.splice(sc.selectedId.indexOf(sc.parent.id), 1);
                        }

                        checkParent(sc.$parent);
                    }

                    scope.checkSelection = function(item) { // array and selectedId will be the same after this, 
                        var id = item.id;
                        scope.selectedId = scope.selectedId || [];
                        if (scope.multiSelect) {
                            var index = scope.selectedId.indexOf(id);
                            if (index == -1 && !item.notSelectable) {
                                scope.selectedId.push(id);
                                // scope.selObj[id] = item.name;
                                // item.checked = true;
                            } else {
                                scope.selectedId.splice(index, 1);
                                // delete scope.selObj[id];
                                // item.checked = false;
                            }

                        } else {
                            scope.selectedId = [];
                            scope.selectedId.push(id);
                            //item.checked = true;
                        }
                    };

                };
            }
        };
    });