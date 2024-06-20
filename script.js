let main = document.createElement('main')
main.classList.add('container')
document.body.prepend(main)

let projectName = document.createElement('h1')
projectName.innerHTML="Let's do it"
main.append(projectName)

let listBlock = document.createElement('div')
listBlock.classList.add('mainBlock')
main.append(listBlock)

let firstDiv = document.createElement('div')
listBlock.append(firstDiv)

let textIn = document.createElement('input')
textIn.classList.add('textIn')
textIn.setAttribute('placeholder', 'Gonna do...')
firstDiv.append(textIn)

let setDate = document.createElement('input')
setDate.setAttribute('type', 'date')
firstDiv.append(setDate)

let addBtn = document.createElement('button')
addBtn.innerHTML='Add'
addBtn.id='AddBtn'
firstDiv.append(addBtn)
// let delAll = document.createElement('button')
// delAll.innerHTML='Delete all'
// delAll.id='delAllEls'
// firstDiv.append(delAll)

let list = document.createElement('ul')
list.classList.add('list')

listBlock.append(list)

let toDoArray = localStorage.getItem('todos') == null 
? []
:[...JSON.parse(localStorage.getItem('todos'))]



const AddToDo =()=>{
let newTask = textIn.value
let date = setDate.value

    if(newTask !=''){
        toDoArray.push({
            text:newTask,
            checked:false,
            date:date,
        })

        localStorage.setItem('todos',JSON.stringify(toDoArray))
        textIn.value=''
        setDate.value=''
        renderTodoItem()
    }
    
}   

//parentNode - parent of an element

let makeDone=(e)=>{

    let todoTemporary = [...toDoArray]
    let index = e.target.parentNode.id

    let objectElement = todoTemporary[index].checked
    todoTemporary[index].checked = !objectElement

    localStorage.setItem('todos',JSON.stringify(toDoArray))


    let isDone = e.target.parentNode.classList.contains('done')

    isDone
    ?
    e.target.parentNode.classList.remove('done')
    :
    e.target.parentNode.classList.add('done')
    // task.classList.toggle('done')
    
}
const delTask =(e)=>{
    let index = e.target.parentNode.id
    toDoArray.splice(index,1)
    localStorage.setItem('todos',JSON.stringify(toDoArray))
    renderTodoItem()
    // e.target.parentNode.remove(e.parentNode)
}
// const RemAll=()=>{
//     list.remove()
// }
addBtn.addEventListener('click', AddToDo)
// delAll.addEventListener('click', RemAll)
const renderTodoItem =()=>{
    list.innerHTML = ''
    toDoArray.map((todo,id)=>{
        let task = document.createElement('li')
        task.className = todo.checked ? 'taskItem done' : 'taskItem';
        task.id = id
    
        let doneBtn = document.createElement('img')
        doneBtn.src = 'done.png'
        doneBtn.classList.add('btn')
doneBtn.addEventListener('click',makeDone)


        let deleteBtn = document.createElement('img')
        deleteBtn.src = 'delete.png'
        deleteBtn.classList.add('btn')
deleteBtn.addEventListener('click',delTask)
        let label = document.createElement('label')
        label.append(todo.text+' '+ '-'+' ' +todo.date)
    
        task.append(label)
        task.append(doneBtn)
        task.append(deleteBtn)
        // task.append(newTask)
        // task.append(date)
        list.append(task)
    
    })
}
renderTodoItem()