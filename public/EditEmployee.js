const EmployeeID=document.querySelector('.Edit-EmployeeID')
const EmployeeName=document.querySelector('.Edit-Name')
const Form=document.querySelector('.EditEmployee-Form')
const EmployeeSalary=document.querySelector('.Edit-EmployeeSalary')
const EmployeePosition=document.querySelector('.Edit-EmployeePOS')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
const formAlertDOM = document.querySelector('.form-alert')
const editBtnDOM = document.querySelector('.edit-btn')
const editForm= document.querySelector('.EditEmployee-Form')


const showEmployee = async () => {
  try {
      await fetch(`http://localhost:3000/api/v1/employees/${id}`).then((res)=>{
      return res.json()
    }).then((data)=>{
      EmployeeData=data["employee"]
      const {_id:employeeID, name, Salary,Position} = EmployeeData
      EmployeeID.textContent=employeeID
      EmployeeName.value=name
      EmployeePosition.value=Position
      EmployeeSalary.value=Salary
    })

  } catch (error) {
    console.log(error)
  }
}
  
showEmployee()

editForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const newName= EmployeeName.value;
    const newSalary=EmployeeSalary.value;
    const newPosition=EmployeePosition.value;
    await fetch(`http://localhost:3000/api/v1/employees/${id}`,{
      method:'PATCH',
      body: JSON.stringify({
        name: newName,
        Salary:newSalary,
        Position:newPosition,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      EmployeeData=data["employee"]
      const { _id: employeeID, name, Salary, Position } = EmployeeData
      EmployeeID.textContent = employeeID
      EmployeeName.value = name
    })
    
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited employee`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Save'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
