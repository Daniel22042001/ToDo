let updatemod = false;
const cancel = document.getElementById('canceldeletebutton');
cancel.addEventListener('click', function()  {
    const confirmdeletedialog = document.getElementById('confirmdeletedialog');
    confirmdeletedialog.close();
});

const confirmdeletebutton = document.getElementById('confirmdeletebutton');
confirmdeletebutton.addEventListener('click', () => {
    const id = document.getElementById('idtodelete');
    fetch("http://localhost:9000/delete.php?id=" + id.value)
    .then( () =>{ 
        alert('Registro eliminado');
        showTasks();
    })
    .catch( (error) => {
        console.log(error);
        alert('no se pudo eliminar el registro');
    })


})

function insert(){
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const task = {
        id:id,
        name:name,
        description:description,
        date:date
    };
    let apifile = 'insert.php';
    if(updatemod == true) apifile = 'update.php';

   fetch(`http://localhost:9000/${apifile}`,{method:'post', mode:"no-cors", body: JSON.stringify(task)}) 
   .then(()=>{
            alert("tarea registrada")
            showTasks()

   })
   .catch((eror)=>{
        console.log(eror)  
        alert("no se pudo reistrar la tarea");
   }) 

}

function showTasks(){
    fetch("http://localhost:9000/list.php")
    .then(response => data = response.json())
    .then(data => {
        task = data
        renderTasks(task)
    })
    .catch( error =>{
        console.log(error)
        alert("error al listar las tareas")
    })

}


function renderTasks(task){
    clearTasks();



    for(let i=0; i<task.length; i++){

        const colname = document.createElement('td');
        colname.innerHTML = task[i].name;

        const coldescription = document.createElement('td');
        coldescription.innerHTML = task[i].description;

        const coldate = document.createElement('td');
        coldate.innerHTML = task[i].date;

        const colstaus = document.createElement('td');
        colstaus.innerHTML = task[i].status;

        const colupdate = document.createElement('button');
        colupdate.innerHTML = 'Editar';
        colupdate.setAttribute('onclick', `fillform('${task[i].id}', '${task[i].name}', '${task[i].description}', '${task[i].date}')`);


        const coldelete = document.createElement('button');
        coldelete.innerHTML = 'Eliminar';
        coldelete.setAttribute('onclick', `confirmdelete('${task[i].id}', '${task[i].name}', '${task[i].description}', '${task[i].date}')`);





        row = document.createElement('tr');
        row.setAttribute('class', 'task-data');
        row.appendChild(colname);
        row.appendChild(coldescription);
        row.appendChild(coldate);
        row.appendChild(colstaus);
        row.appendChild(colupdate);
        row.appendChild(coldelete);

        const table = document.getElementById('task');
        table.appendChild(row);
    }

}

function clearTasks(){
    const task = document.getElementsByClassName('task-data');
    const arraytask = [...task];
    arraytask.map(task => task.remove());

}


function fillform(id, name, description, date){
    const txtid = document.getElementById('id');
    txtid.value = id;
    

    const txtname = document.getElementById('name');
    txtname.value = name; 
    const txtdescription = document.getElementById('description');
    txtdescription.value = description; 
    const txtdate = document.getElementById('date');
    txtdate.value = date; 
    updatemod = true;

}

function confirmdelete(id, name, description, date){
    const confirmdeletedialog = document.getElementById('confirmdeletedialog');
    confirmdeletedialog.showModal();
    
    const spanname = document.getElementById('spanname');
    spanname.innerHTML = name;
    const spandescription = document.getElementById('spandescription');
    spandescription.innerHTML = description;
    const spandate = document.getElementById('spandate');
    spandate.innerHTML = date;

    const txtid = document.getElementById('idtodelete'); 
    txtid.value = id;
     

}