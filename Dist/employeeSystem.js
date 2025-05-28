"use strict";
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Manager"] = "Manager";
    Role["Developer"] = "Developer";
    Role["Intern"] = "Intern";
})(Role || (Role = {}));
class Company {
    companyName;
    id;
    employees = [];
    constructor(companyName, id) {
        this.companyName = companyName;
        this.id = id;
        this.companyName = companyName;
        this.id = id;
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployeeById(id) {
        this.employees = this.employees.filter((employee) => employee.id !== id);
    }
    listEmployeesByRole(role) {
        return this.employees.filter((employee) => employee.role === role);
    }
    deactivateEmployee(id) {
        this.employees.forEach((employee) => {
            if (employee.id === id) {
                employee.isActive = false;
                employee.employeeStatus = "Inactive";
            }
        });
    }
    getEmployeeById(id) {
        return this.employees.find((employee) => employee.id === id);
    }
    getAllEmployees() {
        return this.employees;
    }
}
function promoteEmployee(employee, newRole) {
    employee.role = newRole;
    return employee;
}
// Working for DOM manipulation
let allCompanies = [];
let selectedCompanyId = 0;
let currentEmployeeId = 0;
// localStorage
function setCompaniesToStorage(companies) {
    localStorage.setItem("companies", JSON.stringify(companies));
}
async function getCompaniesFromStorage() {
    const com = JSON.parse(localStorage.getItem("comp") || "[]");
    const localStorageComp = com.map((c) => {
        //console.log(c);
        // console.log(new Company(c.companyName, c.id));
        return Object.assign(new Company(c.companyName, c.id), c);
    });
    return localStorageComp;
}
document.addEventListener("DOMContentLoaded", async () => {
    allCompanies = await getCompaniesFromStorage();
    showCompanyTable();
});
function showComponent(id) {
    const components = document.querySelectorAll(".component");
    components.forEach((comp) => comp.classList.add("hidden"));
    document.getElementById(id)?.classList.remove("hidden");
}
function addCompany() {
    const input = document.getElementById("companyName");
    const name = input.value.trim();
    if (!name)
        return alert("Please enter company name");
    // Check if company with the same name already exists
    const companyExists = allCompanies.some((company) => company.companyName.toLowerCase() === name.toLowerCase());
    if (companyExists) {
        return alert("Company with this name already exists!");
    }
    const company = new Company(name, Math.floor(Math.random() * 100000000));
    allCompanies.push(company);
    setCompaniesToStorage(allCompanies);
    input.value = "";
    showCompanyTable();
}
function showCompanyTable() {
    const table = document.getElementById("companyTable");
    table.innerHTML = "";
    allCompanies.forEach((company) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${company.id}</td>
      <td>${company.companyName}</td>
      <td><button data-cid=${company.id} id="viewButton">View</button></td>
    `;
        table.appendChild(row);
    });
}
function viewHandler(e) {
    const target = e.target;
    if (target.id !== "viewButton")
        return;
    const { cid } = target.dataset;
    selectedCompanyId = Number(cid);
    showComponent("component2");
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    displayEmployeeTable(currentCompany?.getAllEmployees() || []);
}
document.getElementById("companyTable")?.addEventListener("click", viewHandler);
document.getElementById("addCompany")?.addEventListener("click", addCompany);
// DOM manipulation for component 2
function displayEmployeeTable(employees) {
    const employeeTable = document.querySelector("#employeeTable");
    employeeTable.innerHTML = "";
    employees.forEach((employee) => {
        employeeTable.innerHTML += `
      <tr>
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.age}</td>
        <td>${employee.email}</td>
        <td>${employee.role}</td>
        <td>${employee.department}</td>
        <td>${employee.isActive ? "Yes" : "No"}</td>
        <td>${employee.employeeStatus}</td>
        <td>
          <button data-eid=${employee.id} id="empEdit">Edit</button>
          <button data-eid=${employee.id} id="empDelete">Delete</button>
        </td>
      </tr>
    `;
    });
}
document.getElementById("backToComp1")?.addEventListener("click", () => showComponent("component1"));
// Add Employee Handler
function addEmployeeHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#ename");
    const ageInput = document.querySelector("#eage");
    const emailInput = document.querySelector("#eemail");
    const roleInput = document.querySelector("#erole");
    const departmentInput = document.querySelector("#edepart");
    const newEmployee = {
        id: Math.floor(Math.random() * 100000000),
        name: nameInput.value,
        age: Number(ageInput.value),
        email: emailInput.value,
        role: roleInput.value,
        department: departmentInput.value,
        isActive: true,
        employeeStatus: "Active",
    };
    nameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
    roleInput.value = "";
    departmentInput.value = "";
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    currentCompany?.addEmployee(newEmployee);
    setCompaniesToStorage(allCompanies);
    displayEmployeeTable(currentCompany?.getAllEmployees() || []);
    const filterSelect = document.getElementById("filter");
    filterSelect.value = "all";
}
const addempForm = document.querySelector("#employeeForm");
addempForm?.addEventListener("submit", addEmployeeHandler);
// Edit and Delete Part
const employeeTable = document.querySelector("#employeeTable");
employeeTable.addEventListener("click", (e) => {
    const target = e.target;
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    if (target.id === "empDelete") {
        const { eid } = target.dataset;
        currentCompany?.removeEmployeeById(Number(eid));
        setCompaniesToStorage(allCompanies);
        displayEmployeeTable(currentCompany?.getAllEmployees() || []);
    }
    else if (target.id === "empEdit") {
        const { eid } = target.dataset;
        currentEmployeeId = Number(eid);
        showComponent("component3");
        displayEmployeeDetails();
    }
});
document.getElementById("back2")?.addEventListener("click", () => showComponent("component2"));
// Filter
const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", (e) => {
    const selectedRole = e.target.value;
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    if (selectedRole === "all") {
        displayEmployeeTable(currentCompany?.getAllEmployees() || []);
    }
    else {
        displayEmployeeTable(currentCompany?.listEmployeesByRole(selectedRole) || []);
    }
});
// Component 3 - Display Employee Details
function displayEmployeeDetails() {
    const idInput = document.querySelector("#did");
    const nameInput = document.querySelector("#dname");
    const ageInput = document.querySelector("#dage");
    const emailInput = document.querySelector("#demail");
    const roleSelect = document.querySelector("#drole");
    const departmentInput = document.querySelector("#ddepart");
    const statusBtn = document.querySelector("#statusBtn");
    const statusLabel = document.querySelector("#status");
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    const currentEmployee = currentCompany?.getEmployeeById(currentEmployeeId);
    idInput.value = String(currentEmployee?.id);
    nameInput.value = String(currentEmployee?.name);
    ageInput.value = String(currentEmployee?.age);
    emailInput.value = String(currentEmployee?.email);
    roleSelect.value = String(currentEmployee?.role);
    departmentInput.value = String(currentEmployee?.department);
    statusBtn.disabled = !currentEmployee?.isActive;
    statusLabel.innerText = `Status : ${currentEmployee?.employeeStatus}`;
}
// Update Role
const editEmployeeForm = document.querySelector("#editEmployeeForm");
editEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const roleSelect = document.querySelector("#drole");
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    const currentEmployee = currentCompany?.getEmployeeById(currentEmployeeId);
    if (currentEmployee?.role === roleSelect.value)
        return alert("Please change employee role");
    promoteEmployee(currentEmployee, roleSelect.value);
    //pushing all companies to localStorage after a small change
    setCompaniesToStorage(allCompanies);
    showComponent("component2");
    displayEmployeeTable(currentCompany?.getAllEmployees() || []);
    currentEmployeeId = 0;
    alert("Employee promoted");
});
// Deactivate Employee
const statusBtn = document.querySelector("#statusBtn");
statusBtn.addEventListener("click", () => {
    const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
    currentCompany?.deactivateEmployee(currentEmployeeId);
    //pushing all companies to localStorage after a small change
    setCompaniesToStorage(allCompanies);
    showComponent("component2");
    displayEmployeeTable(currentCompany?.getAllEmployees() || []);
    currentEmployeeId = 0;
    alert("Employee deactivated");
});
