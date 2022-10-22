
const Baseurl="http://127.0.0.1:8000/crud"

const parentElement = document.querySelector('#tbody')
window.onload=function(){
axios({
    method:"get",
    url:Baseurl
}).then((result)=>{
    // console.log(result.data)
    result.data.forEach((element) => {
        console.log(element)
        createTdelement(element)
    });
}).catch((error)=>{
    console.log(error)
})
}
///enter submit file
let enter_student_details = document.querySelector("#Enter_student_details")
Enter_student_details.addEventListener('click',function(){
    // console.log("Enter submit file is clicked")
    $('#Enter_student_details_Modal').modal('toggle')
})
//

const submitbutton = document.querySelector("#submitbutton")
submitbutton.addEventListener('click',()=>{
    const buttonname = document.querySelector("#name")
    const buttonemail = document.querySelector("#email")
    const buttonage = document.querySelector("#age")
    let formvalue={
        "name":buttonname.value,
        "email":buttonemail.value,
        "age":buttonage.value,
    }
    axios.post(Baseurl,formvalue).then((response)=>{
        console.log(response);
    }).catch((error)=>{
        console.log(error)
    })
})
console.log(submitbutton)

function createTdelement(element){
    const tbody = document.querySelector("#tableshow")
    const TR = document.createElement("tr")
    const tdId = document.createElement("td")
    tdId.innerHTML =element.id
    TR.appendChild(tdId)

    const tdname = document.createElement("td")
    tdname.innerHTML =element.name
    TR.appendChild(tdname)
    
    const tdemail = document.createElement("td")
    tdemail.innerHTML =element.email
    TR.appendChild(tdemail)

    const tdage = document.createElement("td")
    tdage.innerHTML =element.age
    TR.appendChild(tdage)
    tbody.append(TR)
    
    const tdaction = document.createElement("td")
    const buttonedit = document.createElement("button")
    const editname = document.querySelector("#editname")
    const editemail = document.querySelector("#editemail")
    const editage = document.querySelector("#editage")
    buttonedit.innerHTML="Edit"
    buttonedit.className="btn btn-success mx-1"
    buttonedit.addEventListener('click',function(){
        $('#exampleModal').modal('toggle')
        editname.value = element.name
        editemail.value = element.email
        editage.value=element.age
        const submitbutton = document.querySelector("#submitbuttonedit")
        submitbutton.addEventListener('click',function(){
        axios.put(`${Baseurl}/update/${element.id}/`,{
                id:element.id,
                name:editname.value,
                email:editemail.value,
                age:editage.value,

            }).then((res)=>{
                tdname.innerHTML=res.data.name
                tdemail.innerHTML=res.data.email
                tdage.innerHTML=res.data.age
                $('#exampleModal').modal('hide')
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        })
    }
    )
    TR.appendChild(buttonedit)
    console.log(submitbutton)


    const buttondelete = document.createElement("button")
    buttondelete.innerHTML="Delete"
    buttondelete.className="btn btn-danger"
    buttondelete.addEventListener('click',function(){
        
        console.log("data delete click")
        console.log(`${Baseurl}/update/${element.id}/`)
        axios.delete(`${Baseurl}/update/${element.id}/`).then((res)=>{
        window.location.reload(true);
        parentElement.removeChild(TR)
        }).catch(err=>console.log(err))
    })
    TR.append(buttondelete)
}
// submit button

// const submitbutton = document.querySelector("#submitbutton")
// submitbutton.addEventListener('click',()=>{
//     const buttonname = document.querySelector("#name")
//     const buttonemail = document.querySelector("#email")
//     const buttonage = document.querySelector("#age")
//     let formvalue={
//         "name":buttonname.value,
//         "email":buttonemail.value,
//         "age":buttonage.value,
//     }
//     axios.post(Baseurl,formvalue).then((response)=>{
//         console.log(response);
//     }).catch((error)=>{
//         console.log(error)
//     })
// })
// console.log(submitbutton)


