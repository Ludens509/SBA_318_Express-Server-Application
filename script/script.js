

const createBtn = document.getElementById("postBtn");
const form = document.querySelector(".form-create-post");
const textArea = document.getElementById('textarea');
console.log(createBtn);
createBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    const active = form.classList.contains('active');
    
    if(active){
        form.classList.remove('active');
    }else{
        form.classList.add('active');
    }
    textArea.focus();
});