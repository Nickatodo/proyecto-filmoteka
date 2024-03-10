
export function modales() {
    
    const refs = {
        openModalBtn: document.querySelectorAll("[data-modal-open]"),
        closeModalBtn: document.querySelector("[data-modal-close]"),
        modal: document.querySelector("[data-modal]"),
    };
    
    for (let index = 0; index < refs.openModalBtn.length; index++){
        
        refs.openModalBtn[index].addEventListener("click", toggleModal);
        refs.openModalBtn[index].addEventListener("click",startAnimation);
    }   
    
    refs.closeModalBtn.addEventListener("click", toggleCerrar);
    refs.closeModalBtn.addEventListener("click", removeAnimation);
    
    function startAnimation(){
        refs.modal.classList.add("animate__zoomIn")
    }
    function toggleModal() {
        refs.modal.classList.toggle("is-hidden");
    }
    function removeAnimation(){
        refs.modal.classList.remove("animate__zoomIn");
    }
    function toggleCerrar() { 
        refs.modal.classList.add("is-hidden");
    }
    
}

