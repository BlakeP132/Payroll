
const members= document.querySelector('.members');
const loader=document.querySelector('.loading-text');
const revenue=document.querySelector('.revenue')
const addEmployee=document.querySelector('.add-btn')
var perfEntries = performance.getEntriesByType("navigation");

if (perfEntries[0].type === "back_forward") {
    location.reload();
}

const showMembers = async () => {
  loader.style.visibility='visible'
    try {
      total=0
      await fetch('http://localhost:3000/api/v1/employees').then((res)=>{
        return  res.json()
      })
      .then((data)=>{
        const allEmployees=data["employees"]
        allEmployees.map((employee)=>{
          const {_id:employeeID,name,Salary,Position}= employee
          total+=Salary
          let div = document.createElement('div');
          const info=`<div class="SingleEmployee"><h1>${name}</h1>
          <dl class="Information-Desc"><dd>ID: ${employeeID}</dd>
              <dd>Salary: $${Salary.toLocaleString()}</dd>
              <dd>Position: ${Position}</dd>
          </dl></div>
          <div class="Edit-Links">

          <!-- EDIT -->
          <a style="text-decoration: none" href="Employee.html?id=${employeeID}"  class="edit-link">
          <i class="fas fa-edit">Edit</i>
          </a>
          
          <!-- delete btn -->
          <button type="button" class="delete-btn" data-id="${employeeID}">
          <i class="fas fa-trash" >Delete</i>
          </button>
          </div>`

          div.innerHTML=info
          members.appendChild(div);
          
        })
        revenue.innerHTML=`<h1>Revenue Lost Monthly: $${total.toLocaleString()}</h1>`

      
      
  
      })
      .catch((err)=>{
        console.log(err)
      })
    
    } catch (error) {
      console.log(error)
    }
    loader.style.visibility='hidden'
  }
  
showMembers()
  
members.addEventListener('click', async (e) => {
  const el = e.target
  console.log(el.parentElement)
  if (el.parentElement.classList.contains('delete-btn')) {
    loader.style.visibility='visible'
    const id = el.parentElement.dataset.id
    try {
      await fetch(`http://localhost:3000/api/v1/employees/${id}`,{
        method:'DELETE'
      })
      location.reload()
      $("members").load(location.href +  " members");
      showMembers()
    } catch (error) {
      console.log(error)
    }
    
  }
  loader.style.visibility='hidden'
})


window.addEventListener("pageshow", function (event) {
  var historyTraversal = event.persisted,
    perf = window.performance,
    perfEntries =
      perf && perf.getEntriesByType && perf.getEntriesByType("navigation"),
    perfEntryType = perfEntries && perfEntries[0] && perfEntries[0].type,
    navigationType = perf && perf.navigation && perf.navigation.type;
  if (
    historyTraversal ||
    perfEntryType === "back_forward" ||
    navigationType === 2 
  ) {
    // Handle page restore.
    window.location.reload();
  }
});