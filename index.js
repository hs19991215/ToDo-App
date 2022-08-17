// 1
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let msg= document.getElementById("msg");
let add = document.getElementById("add");
let tasks =document.getElementById("tasks");
//4 collecting the data
 let data=[];



// 2

form.addEventListener('submit', (e)=>{
e.preventDefault();
formVaidation();

});

// 3
let formVaidation =() => {
    if(textInput.value === "" ){
     console.log('failure');
     msg.innerHTML = "Task Title cannot be blank";    
    }else{
        console.log(textInput.value);
        msg.innerHTML= "";
        //on success accept the data that is why we are passing acceptData(); function inside it
        acceptData();


        // 6  closing the modal after submission , by using setAttribute function with anonymous function, using IIFE = imidiatly invoked function expression
        add.setAttribute('data-bs-dismiss','modal');
        add.click();

        // IIFE- imidiatly invoked function expression
        (()=>{
            add.setAttribute('data-bs-dismiss','');
        }) ();
    };
};


// 5
let acceptData = () =>{
    //adding the data inside the array ,, by push method
    data.push({
        text:textInput.value,
        date:dateInput.value,
        discription:textArea.value,
    });


    //7.1 after accepting the data from the user it is stored in local storage, thats why we write at the end of acceptData
    localStorage.setItem("tasks", JSON.stringify(data));
    

        //showTasks(); //8.2
        console.log(data);
    // 10.1 after submiting the data and then we are performing reload the page then all previous data gone
    // we are creating an IIFE 
    (()=>{
        data= JSON.parse(localStorage.getItem('tasks')) ;
        //now we have to call the function 8.2 inside it 
        showTasks();
    }) 
    ();   
};

//8.1
let showTasks =() =>{

    // let tasks =   JSON.parse(localStorage.getItem('tasks')); //8.3
    // console.log(tasks); //8.4
   
    tasks.innerHTML = " ";  //for initialy it is empty
    data.map((item, index)=>{
        return (
            tasks.innerHTML +=            
            
            `<div ID="${index}">
            <span class="fw-bold ">${item.text}</span>
            <span class="small text-secondary">${item.date}</span>
            <p>${item.discription}</p>
            <span class="options" >

             
             <i class="bi bi-pencil-square" 
             onclick="editTask(this)" 
             data-bs-toggle="modal"
             data-bs-target="#form"></i>
             
             
             <i class="bi bi-trash" onclick="deleteTask(this)"></i>
           </span>
           </div>`
        );
    });
    resetForm(); //9.1
}

//9.2   after submiting the form we need to get a fresh form by resetingthe form
let resetForm = ()=> {
 textInput.value =' ';
 dateInput.value =' ';
 textArea.value=' ';   
}

// 11.1 deleting the task function, we was create a onclick function with the span tag, so we are passing this.....
let deleteTask= (e)=>{
    //removing the element from the data and removing the array from the UI
    e.parentElement.parentElement.remove();

    //deleting the element from the data array
    data.splice(e.parentElement.parentElement.id, 1) //splice method is used to add aor insert an array elemment and reprint array element 

    // 11.2 we need to update in localStorage
    localStorage.setItem("tasks", JSON.stringify(data)); 
    console.log("data array after deletion", data);  
}


//12.1 Editing the task
let editTask= (e)=>{

    let selectedTask = e.parentElement.parentElement;
     console.log(selectedTask.children[1]);
    
     textInput.value =selectedTask.children[0].innerHTML;
     dateInput.value =selectedTask.children[1].innerHTML;
     textArea.value=selectedTask.children[2].innerHTML;  
     
     //Delete the previous
     deleteTask(e);
}