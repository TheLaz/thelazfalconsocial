
(function(){

    function editable(){
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                
                elm.bind('keydown', function(event) {

                    /*
                        Commit changes when the user pressed:
                        enter, tab
                    */

                    var commit = false;

                    commit =  ( (event.which == 13)  || (event.which == 9) );

                    if (commit) {
                        scope.saveRow(scope.row);
                    }
                });
            }
        };
    }

    falcon.directive('editable', editable);

})();