$.validator.addMethod('laterThan', function( value, element, param ) {
    var target = $( param );

    return ((new Date('01/01/1970 ' + value)) > (new Date('01/01/1970 ' + target.val())));
}, 'Please enter a later time.' );

$.validator.addMethod('time', function( value, element ) {
	return this.optional( element ) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test( value );
}, 'Please enter a valid time, between 00:00 and 23:59' );

$.validator.addMethod('greaterThan', function( value, element, param ) {
    var target = $( param );

    if ( this.settings.onfocusout && target.not( '.validate-greaterThan-blur' ).length ) {
        target.addClass( 'validate-greaterThan-blur' ).on( 'blur.validate-greaterThan', function() {
            $( element ).valid();
        } );
    }

    return parseInt(value) > parseInt(target.val());
}, 'Please enter a greater value.' );
