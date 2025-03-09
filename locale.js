const inputName = document.getElementById('name'); 
const inputEmail = document.getElementById('email');
const dataTable = document.querySelector('#tableDataUser tbody');
let userList = [];
let editingIndex = null;

renderUserFromLocal();

function onSaveClick() {
    let name = inputName.value.trim();
    let email = inputEmail.value.trim();
    let oldLists = getUserFromLocalStorage();
    if (name === "" || email === "") {
        alert("Please enter both name and email.");
        return;
    }
    if(editingIndex == null){
        oldLists.push({ name, email });
    }else{
        oldLists[editingIndex].name=name;
        oldLists[editingIndex].email=email;
    }
    localStorage.setItem('UserLists', JSON.stringify(oldLists));
    renderUserFromLocal();
    clearForm();
}
function renderUserFromLocal() {
    dataTable.innerHTML = '';
    let lists = getUserFromLocalStorage();
    lists.forEach(function(item, index) {
        let newDataOfRow = document.createElement('tr');
        newDataOfRow.innerHTML = `
            <td>${index + 1}</td> 
            <td>${item.name}</td> 
            <td>${item.email}</td>  
             <td>
                <input onclick="deleteUser(${index})" type="button" value="❌" />
                <input onclick="getItemToEdit(${index})" type="button" value="📝" />
            </td>
        `;
        dataTable.appendChild(newDataOfRow);
    });
}
function clearForm(){
  inputName.value = "";
  inputEmail.value = "";
  editingIndex = null;
  document.querySelector('.buttonEdit').value = "Submit";
  inputName.focus();
}
function getUserFromLocalStorage() {
    let storedUsers = localStorage.getItem('UserLists');
    return storedUsers ? JSON.parse(storedUsers) : [];
}
function deleteUser(index){
  if(confirm("Do you want to delete?")){
    let oldLists = getUserFromLocalStorage();
    oldLists.splice(index,1);
    localStorage.setItem('UserLists', JSON.stringify(oldLists));
    renderUserFromLocal();
  }
}
function getItemToEdit(index){
    let userListEditting = getUserFromLocalStorage();
    let currentUser = userListEditting[index];
    editingIndex = index;
    document.querySelector('.buttonEdit').value = "Edit";
    inputName.value = currentUser.name;
    inputEmail.value = currentUser.email;
}