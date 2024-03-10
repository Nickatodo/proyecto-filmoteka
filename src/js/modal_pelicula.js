
export function modales() {
    
    const refs = {
        openModalBtn: document.querySelectorAll("[data-modal-open]"),
        closeModalBtn: document.querySelector("[data-modal-close]"),
        modal: document.querySelector("[data-modal]"),
    };

    function toggleModal() {
        refs.modal.classList.toggle("is-hidden");
    }

    function toggleCerrar() { 
        refs.modal.classList.add("is-hidden");
    }
    
    for (let index = 0; index < refs.openModalBtn.length; index++){
        refs.openModalBtn[index].addEventListener("click", toggleModal);
    }   

    refs.closeModalBtn.addEventListener("click",toggleCerrar);

}

