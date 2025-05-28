
enum Role {
  Admin = "Admin",
  Manager = "Manager",
  Developer = "Developer",
  Intern = "Intern",
}

type EmployeeStatus = "Active" | "Inactive" | "On Leave";

interface Person {
  readonly id: number;
  name: string;
  age: number;
  email?: string;
}

interface Employee extends Person {
  role: Role;
  department: string;
  isActive: boolean;
  employeeStatus: EmployeeStatus;
}

class Company {
  private employees: Employee[] = [];

  constructor(public companyName: string, public id: number) {
    this.companyName = companyName;
    this.id = id;
  }

  public addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  public removeEmployeeById(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  public listEmployeesByRole(role: Role): Employee[] {
    return this.employees.filter((employee) => employee.role === role);
  }

  public deactivateEmployee(id: number): void {
    this.employees.forEach((employee) => {
      if (employee.id === id) {
        employee.isActive = false;
        employee.employeeStatus = "Inactive";
      }
    });
  }

  public getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  public getAllEmployees(): Employee[] {
    return this.employees;
  }
}

function promoteEmployee(employee: Employee, newRole: Role): Employee {
  employee.role = newRole;
  return employee;
}

// Working for DOM manipulation

let allCompanies: Company[] = [];
let selectedCompanyId: number = 0;
let currentEmployeeId: number = 0;

// localStorage
function setCompaniesToStorage(companies: Company[]): void {
  localStorage.setItem("companies", JSON.stringify(companies));
}
async function getCompaniesFromStorage(): Promise<Company[]> {
  const com = JSON.parse(localStorage.getItem("comp") || "[]") as Company[];
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

function showComponent(id: string) {
  const components = document.querySelectorAll(".component");
  components.forEach((comp) => comp.classList.add("hidden"));
  document.getElementById(id)?.classList.remove("hidden");
}
function addCompany() {
  const input = document.getElementById("companyName") as HTMLInputElement;
  const name = input.value.trim();

  if (!name) return alert("Please enter company name");

  // Check if company with the same name already exists
  const companyExists = allCompanies.some(
    (company) => company.companyName.toLowerCase() === name.toLowerCase()
  );

  if (companyExists) {
    return alert("Company with this name already exists!");
  }

  const company = new Company(name, Math.floor(Math.random() * 100000000));
  allCompanies.push(company);
  setCompaniesToStorage(allCompanies);
  input.value = "";
  showCompanyTable();
}


function showCompanyTable(): void {
  const table = document.getElementById("companyTable") as HTMLTableSectionElement;
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

function viewHandler(e: MouseEvent): void {
  const target = e.target as HTMLElement;
  if (target.id !== "viewButton") return;

  const { cid } = target.dataset;
  selectedCompanyId = Number(cid);
  showComponent("component2");
  const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
  displayEmployeeTable(currentCompany?.getAllEmployees() || []);
}

document.getElementById("companyTable")?.addEventListener("click", viewHandler);
document.getElementById("addCompany")?.addEventListener("click", addCompany);

// DOM manipulation for component 2
function displayEmployeeTable(employees: Employee[]): void {
  const employeeTable = document.querySelector("#employeeTable") as HTMLTableElement;
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
function addEmployeeHandler(e: SubmitEvent): void {
  e.preventDefault();

  const nameInput = document.querySelector("#ename") as HTMLInputElement;
  const ageInput = document.querySelector("#eage") as HTMLInputElement;
  const emailInput = document.querySelector("#eemail") as HTMLInputElement;
  const roleInput = document.querySelector("#erole") as HTMLSelectElement;
  const departmentInput = document.querySelector("#edepart") as HTMLInputElement;

  const newEmployee: Employee = {
    id: Math.floor(Math.random() * 100000000),
    name: nameInput.value,
    age: Number(ageInput.value),
    email: emailInput.value,
    role: roleInput.value as Role,
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

  const filterSelect = document.getElementById("filter") as HTMLSelectElement;
  filterSelect.value = "all";
}


const addempForm = document.querySelector("#employeeForm") as HTMLFormElement;
 addempForm?.addEventListener("submit", addEmployeeHandler);
// Edit and Delete Part
const employeeTable = document.querySelector("#employeeTable") as HTMLTableElement;

employeeTable.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);

  if (target.id === "empDelete") {
    const { eid } = target.dataset;
    currentCompany?.removeEmployeeById(Number(eid));
    setCompaniesToStorage(allCompanies);
    displayEmployeeTable(currentCompany?.getAllEmployees() || []);
  } else if (target.id === "empEdit") {
    const { eid } = target.dataset;
    currentEmployeeId = Number(eid);
    showComponent("component3");
    displayEmployeeDetails();
  }
});

document.getElementById("back2")?.addEventListener("click", () => showComponent("component2"));

// Filter
const filterSelect = document.getElementById("filter") as HTMLSelectElement;
filterSelect.addEventListener("change", (e: Event) => {
  const selectedRole = (e.target as HTMLSelectElement).value;
  const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
  if (selectedRole === "all") {
    displayEmployeeTable(currentCompany?.getAllEmployees() || []);
  } else {
    displayEmployeeTable(currentCompany?.listEmployeesByRole(selectedRole as Role) || []);
  }
});

// Component 3 - Display Employee Details
function displayEmployeeDetails(): void {
  const idInput = document.querySelector("#did") as HTMLInputElement;
  const nameInput = document.querySelector("#dname") as HTMLInputElement;
  const ageInput = document.querySelector("#dage") as HTMLInputElement;
  const emailInput = document.querySelector("#demail") as HTMLInputElement;
  const roleSelect = document.querySelector("#drole") as HTMLSelectElement;
  const departmentInput = document.querySelector("#ddepart") as HTMLInputElement;
  const statusBtn = document.querySelector("#statusBtn") as HTMLButtonElement;
  const statusLabel = document.querySelector("#status") as HTMLHeadingElement;

  const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
  const currentEmployee = currentCompany?.getEmployeeById(currentEmployeeId);

  idInput.value = String(currentEmployee?.id);
  nameInput.value = String(currentEmployee?.name);
  ageInput.value = String(currentEmployee?.age);
  emailInput.value = String(currentEmployee?.email);
  roleSelect.value = String(currentEmployee?.role);
  departmentInput.value = String(currentEmployee?.department);
  statusBtn.disabled = !currentEmployee?.isActive!;
  statusLabel.innerText = `Status : ${currentEmployee?.employeeStatus}`;
}

// Update Role
const editEmployeeForm = document.querySelector("#editEmployeeForm") as HTMLFormElement;
editEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const roleSelect = document.querySelector("#drole") as HTMLSelectElement;
  const currentCompany = allCompanies.find((company) => company.id === selectedCompanyId);
  const currentEmployee = currentCompany?.getEmployeeById(currentEmployeeId);

  if (currentEmployee?.role === roleSelect.value) return alert("Please change employee role");

  promoteEmployee(currentEmployee!, roleSelect.value as Role);
  //pushing all companies to localStorage after a small change
  setCompaniesToStorage(allCompanies);
  showComponent("component2");
  displayEmployeeTable(currentCompany?.getAllEmployees() || []);
  currentEmployeeId = 0;
  alert("Employee promoted");
});

// Deactivate Employee
const statusBtn = document.querySelector("#statusBtn") as HTMLButtonElement;
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