window.addEventListener(
	"load",
	function ( event ) {

		setClickhandler( "sendJS", sendByJS );
		return;


		function setClickhandler( buttonId, clickHandler ) {

			if ( "string" !== typeof buttonId ) {
				console.error( "setClickhandler: parameter 1 type mismatch - " + typeof buttonId + " (expected string)" );
				return;
			}

			if ( "function" !== typeof clickHandler ) {
				console.error( "setClickhandler: parameter 2 type mismatch - " + typeof clickHandler + " (expected function)" );
				return;
			}

			var targetElement = document.getElementById( buttonId );
			if ( targetElement === null ) {
				console.error( "SetClickhandler: parameter 1 is not an Id  of the page element" );
				return;
			}

			targetElement.addEventListener( "click", sendByJS );

		}// function setClickhandler( buttonId, clickHandler )

		function sendByJS() {
			var table = document.getElementById( "registered" );
			if ( table === null ) {
				console.error( "sendByJS: the required <table> element is not found." );
				return;
			}

			var newRow = table.insertRow();
			var oldRow = table.rows[newRow.rowIndex - 1];

			for ( var i = 0; i < oldRow.cells.length ; i++ ) {
				var cell = newRow.insertCell();
				cell.setAttribute( "class", oldRow.cells[i].getAttribute( "class" ) );
				cell.innerHTML = i;
			}

			var form = document.getElementById( "employeeForm" );
			validateForm( form );

			return;

			function validateForm( form ) {

				var validationErrorsDiv = null;
				var validableInputs = null;
				if ( !initializeVariables() ) {
					return;
				}

				emptyValidationErrorsDiv();
				validableInputs.forEach( validateInput );

				return;


				function initializeVariables() {

					if ( form.elements === undefined ) {
						console.error( "validateForm: the passed parameter is not an HTMLFormElement." );
						return false;
					}

					validationErrorsDiv = getvalidationErrorsDiv();
					if ( validationErrorsDiv === null ) {
						console.info( "validateForm : there is no <div> for validation errors in the passed form" );
						return false;
					}

					validableInputs = getValidableInputs();

					return true;

					function getvalidationErrorsDiv() {
						var allDivs = form.getElementsByTagName( "div" );
						for ( var i = 0 ; i < allDivs.length ; i++ ) {
							var div = allDivs[i];
							if ( div.hasAttribute( "data-valmsg-summary" ) ) {
								return div;
							}
						}
						return null;
					}
					function getValidableInputs() {
						var needInputs = [];
						Array.prototype.forEach.call(
							form.elements,
							( function ( element, index, array ) {
								if ( element.tagName !== "INPUT" || element.type !== "text" ) {
									return;
								}
								if ( element.hasAttribute( "data-val" ) && element.getAttribute( "data-val" ) === "true" ) {
									needInputs.push( element );
								}
							} )
						);
						return needInputs;

						function processFormElement( element, index, array ) {
							if ( element.tagName !== "INPUT" || element.type !== "text" ) {
								return;
							}
							if ( element.hasAttribute( "data-val" ) && element.getAttribute( "data-val" ) === "true" ) {
								needInputs.push( element );
							}
						}
					}
				}
				function emptyValidationErrorsDiv() {
					validationErrorsDiv.classList.remove( "validation-summary-errors" );
					validationErrorsDiv.classList.add( "validation-summary-valid" );
					var li = validationErrorsDiv.getElementsByTagName( "li" )[0];
					if ( li === undefined ) {
						return;
					}
					var ul = li.parentElement;
					while ( li !== undefined ) {
						ul.removeChild( li );
						li = validationErrorsDiv.getElementsByTagName( "li" )[0];
					}
				}
				function validateInput( input, index, array ) {
					input.classList.remove( "input-validation-error" );
					var attributes = input.getAttributeNames();
					attributes.forEach( validateByAttribute );

					return;

					function validateByAttribute( attributeName ) {
						switch ( attributeName ) {
							case "data-val-required":
								checkIsFilled();
								break;
							case "data-val-number":
								checkIsNumber();
								break;
							case "data-val-range":
								checkIsInRange();
								break;
							case "data-val-regex":
								checkWithRegex();
								break;
						}
						return;


						function checkIsFilled() {
							if ( input.value.length == 0 ) {
								var message = input.getAttribute( attributeName );
								addError( input, message );
							}
						}// function checkIsFilled()
						function checkIsNumber() {
							if ( input.value.length != 0 && !Number.isInteger( +input.value ) ) {
								var message = input.getAttribute( attributeName );
								addError( input, message );
							}
						}// function checkIsNumber()
						function checkIsInRange() {
							if ( input.value.length != 0 && Number.isInteger( +input.value ) ) {
								var value = +input.value;
								var min = +input.getAttribute( "data-val-range-min" );
								var max = +input.getAttribute( "data-val-range-max" );
								if ( value < min || value > max ) {
									var message = input.getAttribute( attributeName );
									addError( input, message );
								}
							}
						}// function checkIsInRange()
						function checkWithRegex() {
							if ( input.value.length != 0 ) {
								var regexp = new RegExp( input.getAttribute( "data-val-regex-pattern" ) );
								if ( !regexp.test( input.value ) ) {
									var message = input.getAttribute( attributeName );
									addError( input, message );
								}
							}
						}// function checkIsGreatherOrEqual() 

						function addError( input, message ) {
							input.classList.add( "input-validation-error" );
							var errorsUL = validationErrorsDiv.firstElementChild;
							var errorLI = document.createElement( "li" );
							errorLI.innerHTML = message;
							errorsUL.appendChild( errorLI );
							validationErrorsDiv.classList.add( "validation-summary-errors" );
							validationErrorsDiv.classList.remove( "validation-summary-valid" );
						}
					}// function validateByAttribute( attributeName )
				}
			}
		}// function sendByJS()



	}
);


