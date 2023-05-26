const EmployeeName=document.querySelector('.Add-Name')
const EmployeeSalary=document.querySelector('.Add-Salary')
const EmployeePosition=document.querySelector('.Add-Position')
const AdditionForm=document.querySelector('.Employee-Addition')
const alert=document.querySelector('.FormAlert')


AdditionForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const newName=EmployeeName.value;
    const newSalary=EmployeeSalary.value;
    const newPos=EmployeePosition.value;
    try {
        await fetch('http://localhost:3000/api/v1/employees',{
            method:'POST',
            body: JSON.stringify({
                name:newName,
                Salary:newSalary,
                Position: newPos,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then((res)=>{
            return res.json()
        })
        alert.style.display = 'block'
        alert.textContent = `success, added employee`
        alert.classList.add('text-success')

    } catch (error) {
        console.log(error)
        alert.style.display = 'block'
        alert.textContent = `error, try again`
    }
    setTimeout(() => {
        alert.style.display = 'none'
        alert.classList.remove('text-success')
      }, 3000)
})