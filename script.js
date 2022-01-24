const api_url = "http://lic-db.herokuapp.com/policies"
//const api_url = "http://localhost:8088/policies"
// const api_url = "http://localhost:8080/policies"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].policyId}</td>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].term}</td>`;
		table_data += `<td>${records[i].amount}</td>`;
		table_data += `<td>${records[i].interest}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("policyId").value = data.policyId;
		document.getElementById("name").value = data.name;
		document.getElementById("term").value = data.term;
		document.getElementById("amount").value = data.amount;
		document.getElementById("interest").value = data.interest;
	})
}


function postData() {
	var policyId = document.getElementById("policyId").value;
	var name = document.getElementById("name").value;
	var term = document.getElementById("term").value;
	var amount = document.getElementById("amount").value;
	var interest = document.getElementById("interest").value;
	
	data = {policyId:policyId, name:name, term:term, amount:amount, interest:interest};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var policyId = document.getElementById("policyId").value;
	var name = document.getElementById("name").value;
	var term = document.getElementById("term").value;
	var amount = document.getElementById("amount").value;
	var interest = document.getElementById("interest").value;
	
	data = {_id: _id, policyId:policyId, name:name, term:term, amount:amount, interest:interest};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}