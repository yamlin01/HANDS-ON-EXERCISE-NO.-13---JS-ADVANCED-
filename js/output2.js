const tblRecords = document.getElementById("tblRecords");
const btnClearItems = document.getElementById("btnClearItems");
const btnSave = document.getElementById("btnSave");
const sortSelect = document.getElementById("sorting");
const sortOrderSelect = document.getElementById("a-z");

let arrRecords = [];

const tblTHsLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];

updateButtonVisibility();

btnSave.addEventListener("click", () => {
    localStorage.setItem("records", JSON.stringify(arrRecords));
    alert("Record Successfully Saved to Local Storage!");
});

window.onload = function() {
    const storedRecords = JSON.parse(localStorage.getItem("records"));
    if (storedRecords) {
        arrRecords = storedRecords;
        iterateRecords();
    }
    updateButtonVisibility(); // Update button visibility when page loads
};

document.getElementById("btnInsertUpdate").addEventListener("click", () => {
    const inputTxt = document.getElementsByTagName("input");

    if (btnInsertUpdate.value === "insert") {
        for (const txt of inputTxt) {
            if (txt.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        let infoRecord = {
            fname: inputTxt[0].value,
            mname: inputTxt[1].value,
            lname: inputTxt[2].value,
            age: parseInt(inputTxt[3].value)
        };

        for (const txt of inputTxt) {
            txt.value = "";
        }

        arrRecords.push(infoRecord);

        iterateRecords();
    } else {
        for (const txt of inputTxt) {
            if (txt.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        arrRecords[parseInt(btnInsertUpdate.value)].fname = inputTxt[0].value;
        arrRecords[parseInt(btnInsertUpdate.value)].mname = inputTxt[1].value;
        arrRecords[parseInt(btnInsertUpdate.value)].lname = inputTxt[2].value;
        arrRecords[parseInt(btnInsertUpdate.value)].age = parseInt(inputTxt[3].value);

        iterateRecords();

        for (const txt of inputTxt) {
            txt.value = "";
        }

        btnInsertUpdate.innerHTML = "Insert";
        btnInsertUpdate.value = "insert";
    }
    updateButtonVisibility();
});

document.getElementById("btnClear").addEventListener("click", () => {
    const inputTxt = document.getElementsByTagName("input");

    for (const txt of inputTxt) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

    updateButtonVisibility(); // Update button visibility after clearing inputs
});

btnClearItems.addEventListener("click", () => {
    arrRecords = [];
    localStorage.removeItem("records");
    iterateRecords();
    updateButtonVisibility(); // Update button visibility after clearing all records
});

document.getElementById("sorting").addEventListener("change", () => {
    sortRecords(); // Call the sortRecords function when sorting criteria changes
});

function sortRecords() {
    const sortingCriteria = sortSelect.value;
    const sortOrder = sortOrderSelect.value;

    if (sortingCriteria === "firstName") {
        if (sortOrder === "aTxt") {
            arrRecords.sort((a, b) => a.fname.toLowerCase().localeCompare(b.fname.toLowerCase()));
        } else if (sortOrder === "zTxt") {
            arrRecords.sort((a, b) => b.fname.toLowerCase().localeCompare(a.fname.toLowerCase()));
        }
    } else if (sortingCriteria === "lastName") {
        if (sortOrder === "aTxt") {
            arrRecords.sort((a, b) => a.lname.localeCompare(b.lname));
        } else if (sortOrder === "zTxt") {
            arrRecords.sort((a, b) => b.lname.localeCompare(a.lname));
        }
    }

    iterateRecords();
}

function iterateRecords() {
    while (tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    if (arrRecords.length === 0) {
        document.getElementById("status").style.display = "inline";
    } else {
        document.getElementById("status").style.display     = "none";
    
        const tblHeaderRow = document.createElement("tr");
        const tblHeader = document.createElement("thead");
        tblHeaderRow.style.borderTop = "1px solid black";
        tblHeaderRow.style.borderBottom = "1px solid black";
    
        for (let i = 0; i < 5; i++) {
            const tblTHs = document.createElement("th");
            tblTHs.style.padding = "5px";
    
            if (i !== 4) {
                tblTHs.style.borderRight = "1px solid black";
            }
    
            tblTHs.innerHTML = tblTHsLabels[i];
            tblHeaderRow.appendChild(tblTHs);
        }
    
        tblHeader.appendChild(tblHeaderRow);
        tblRecords.appendChild(tblHeader);
    
        const tblBody = document.createElement("tbody");
    
        arrRecords.forEach((rec, i) => {
            const tblRow = document.createElement("tr");
            const tbdataFname = document.createElement("td");
            const tbdataMname = document.createElement("td");
            const tbdataLname = document.createElement("td");
            const tbdataAge = document.createElement("td");
            const tbdataActionBtn = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnUpdate = document.createElement("button");
    
            tbdataFname.style.borderRight = "1px solid black";
            tbdataFname.style.padding = "10px";
    
            tbdataMname.style.borderRight = "1px solid black";
            tbdataMname.style.padding = "10px";
    
            tbdataLname.style.borderRight = "1px solid black";
            tbdataLname.style.padding = "10px";
    
            tbdataAge.style.borderRight = "1px solid black";
            tbdataAge.style.padding = "10px";
    
            tbdataActionBtn.style.padding = "10px";
    
            tblRow.style.borderBottom = "1px solid black";
    
            tbdataFname.innerHTML = rec.fname;
            tbdataMname.innerHTML = rec.mname;
            tbdataLname.innerHTML = rec.lname;
            tbdataAge.innerHTML = rec.age;
    
            btnDelete.innerHTML = "Delete";
            btnDelete.setAttribute("onclick", `deleteData(${i})`);
            btnDelete.style.marginRight = "5px";
    
            btnUpdate.innerHTML = "Edit";
            btnUpdate.setAttribute("value", "update");
            btnUpdate.setAttribute("onclick", `updateData(${i})`);
            btnUpdate.style.marginRight = "5px";
    
            tbdataActionBtn.appendChild(btnDelete);
            tbdataActionBtn.appendChild(btnUpdate);
    
            tblRow.appendChild(tbdataFname);
            tblRow.appendChild(tbdataMname);
            tblRow.appendChild(tbdataLname);
            tblRow.appendChild(tbdataAge);
            tblRow.appendChild(tbdataActionBtn);
    
            tblBody.appendChild(tblRow);
        });
    
        tblRecords.appendChild(tblBody);
    }
}
    function deleteData(i) 
    {
        arrRecords.splice(i,1);
        iterateRecords();
        updateButtonVisibility();
    }
    
    function updateData(i) 
    {
        const inputTxt = document.getElementsByTagName("input");
    
        inputTxt[0].value = arrRecords[i].fname;
        inputTxt[1].value = arrRecords[i].mname;
        inputTxt[2].value = arrRecords[i].lname;
        inputTxt[3].value = arrRecords[i].age;
    
        btnInsertUpdate.innerHTML = "Update";
        btnInsertUpdate.value = `${i}`;
        updateButtonVisibility();
    }
    
    function updateButtonVisibility() {
        if (arrRecords.length === 0) {
            document.getElementById("btnClearItems").style.display = "none";
            document.getElementById("sortLabel").style.display = "none";
            document.getElementById("sorting").style.display = "none";
            document.getElementById("a-z").style.display = "none";
            document.getElementById("btnSave").style.display = "none";
            document.getElementById("status").style.display = "inline";
        } else {
            document.getElementById("btnClearItems").style.display = "block";
            document.getElementById("sortLabel").style.display = "inline-block";
            document.getElementById("sorting").style.display = "inline-block";
            document.getElementById("a-z").style.display = "inline-block";
            document.getElementById("btnSave").style.display = "inline-block";
            document.getElementById("status").style.display = "none";
        }
    }
    