let registerForm=document.querySelector(".registerForm");
let allBtn=registerForm.querySelectorAll("button");
let allRegInputs=registerForm.querySelectorAll("input");
let modalRegClose=document.querySelector(".modalRegClose");
let addBtnEdit=document.querySelector(".add-btn");
let searchData=document.querySelector(".searchData")
let allRegData=[];


let dataList=document.querySelector(".dataList");
if(localStorage.getItem("allRegData")!=null){
    allRegData=JSON.parse(localStorage.getItem("allRegData"));
}
console.log(allRegData);
let profileUrl="";
// 
registerForm.onsubmit=(e)=>{
    e.preventDefault()
    let checkEmail=allRegData.find((data)=>{
        return data.email==allRegInputs[1].value;
       
    })
    console.log(checkEmail);
    if(checkEmail==undefined){
        console.log(allRegInputs)
            allRegData.push({
                name:allRegInputs[0].value,
                email:allRegInputs[1].value,
                mobile:allRegInputs[2].value,
                dob:allRegInputs[3].value,
                password:allRegInputs[4].value,
                profile:profileUrl==""?"./images/j.jpg":profileUrl
            })
            localStorage.setItem("allRegData",JSON.stringify(allRegData))
            swal("Registered!","SuccessFully","success");
            getRegData();
            modalRegClose.click();
            registerForm.reset("")
    }
    else{
        swal("Email Already Exist","Try Another!","warning")
    }
    
}
// Get Reg Data
const getRegData=()=>{
      dataList.innerHTML=""
      allRegData.map((data,index)=>{
            let dataStr=JSON.stringify(data);
            let finalStr=dataStr.replace(/"/g,"'")
            return (dataList.innerHTML+=`<tr class="text-center">
            <td>${index+1}</td>
            <td><img src=${data.profile} width="30px" height="30px"></td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.dob}</td>
            <td>${data.mobile}</td>
            <td>
                <button index=${index} data="${finalStr}"  class="btn editBtn btn-primary p-1 px-2 btnShadow"><i class="fa fa-edit"></i></button>
                <button index=${index} class="btn deleteBtn btn-danger p-1 px-2 btnShadow"><i class="fa fa-trash"></i></button>
            </td>
        </tr>`)
      })
      action()
}

const  action=()=>{
    // delete Coding
    let allDelBtn=dataList.querySelectorAll(".deleteBtn");
    for(let btn of allDelBtn){
        btn.onclick=async ()=>{
            try {
                let isConfirm= await confirm();
                console.log(isConfirm)
                if(isConfirm){
                    let index=btn.getAttribute("index");
                    allRegData.splice(index,1);
                    localStorage.setItem("allRegData",JSON.stringify(allRegData));
                    getRegData();
                    swal("Data Deleted","Successfully","success");
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    // update coding
    let allEditBtn=dataList.querySelectorAll(".editBtn");
    for(let btn of allEditBtn){
        btn.onclick=()=>{
            let index=btn.getAttribute("index");
            addBtnEdit.click()
            let dataEditStr=btn.getAttribute("data");
            let dataEditStrReplace=dataEditStr.replace(/'/g,'"');
            let finalEditData=JSON.parse(dataEditStrReplace)
            allRegInputs[0].value=finalEditData.name;
            allRegInputs[1].value=finalEditData.email;
            allRegInputs[2].value=finalEditData.mobile;
            allRegInputs[3].value=finalEditData.dob;
            profileUrl=finalEditData.profile;
            allRegInputs[4].value=finalEditData.password;
            allBtn[0].disabled=false;
            allBtn[1].disabled=true;
            allBtn[0].onclick=()=>{
                allRegData[index]={
                    name:allRegInputs[0].value,
                    email:allRegInputs[1].value,
                    mobile:allRegInputs[2].value,
                    dob:allRegInputs[3].value,
                    password:allRegInputs[4].value,
                    profile:profileUrl==""?"./images/j.jpg":profileUrl
                }
                localStorage.setItem("allRegData",JSON.stringify(allRegData))
                swal("Data Updated","SuccessFully","success");
                modalRegClose.click();
                registerForm.reset("")
                getRegData();
                allBtn[0].disabled=true;
                allBtn[1].disabled=false;
            }
        }
    }
}
getRegData();


// Reading Profile
allRegInputs[5].onchange=()=>{
    let fReader= new FileReader();
    fReader.readAsDataURL(allRegInputs[5].files[0]);
    fReader.onload=(e)=>{
       profileUrl=e.target.result;
       console.log(profileUrl)
    }
}
// Confirm Data
const confirm=()=>{
    return new Promise((resolve,reject)=>{
        swal({
            title: "Are you sure?",
            text: "you want to delete",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              resolve(true)
            } else {
              reject(false)
              swal("Data Saved","Successfully","success");
            }
          });
    })
}
// Searching data
searchData.oninput=()=>{
    search()
}
const search=()=>{
    let value=searchData.value().toLowerCase();
    let tr=dataList.querySelector("tr");
    let i=0;
    for(i=0;i<tr.length;i++){
        let allTd=tr[i].querySelectorAll("td")[2];
    }
}