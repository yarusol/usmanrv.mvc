window.addEventListener(
	"load",
	function (event) {

		setClickhandler("sendJS", sendByJS);


		function setClickhandler(buttonId, clickHandler) {

			if ("string" !== typeof buttonId) {
				console.error("setClickhandler: parameter 1 type mismatch - " + typeof buttonId + " (expected string)");
				return;
			}

			if ("function" !== typeof clickHandler) {
				console.error("setClickhandler: parameter 2 type mismatch - " + typeof clickHandler + " (expected function)");
				return;
			}

			var targetElement = document.getElementById(buttonId);
			if (targetElement === null) {
				console.error("SetClickhandler: parameter 1 is not an Id  of the page element");
				return;
			}

			targetElement.addEventListener("click", sendByJS);

		}
		
		function sendByJS() {
			var table = document.getElementById("registered");
			if (table === null) {
				console.error("sendByJS: the required <table> element is not found.");
				return;
			}

			var newRow = table.insertRow();
			var oldRow = table.rows[newRow.rowIndex - 1];
			
			for (var i = 0; i < oldRow.cells.length ; i++  )
			{
				var cell = newRow.insertCell();
				cell.setAttribute("class", oldRow.cells[i].getAttribute("class"));
				cell.innerHTML = i;
			}

		}


	}
);


