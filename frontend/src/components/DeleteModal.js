/* ==========================================================
   DELETE MODAL
   Reusable Confirmation Component
========================================================== */


let deleteCallback = null;



/* ==========================================================
   OPEN MODAL
========================================================== */

export function openDeleteModal(name, callback){


    deleteCallback = callback;



    const modal = document.createElement("div");


    modal.id = "deleteModal";


    modal.className = "delete-modal-overlay";



    modal.innerHTML = `


    <div class="delete-modal">


        <div class="delete-icon">

            🗑️

        </div>



        <h2>

            Delete Member?

        </h2>



        <p>

            Are you sure you want to remove

            <strong>

                ${name}

            </strong>

            from your Family Vault?

        </p>




        <div class="modal-actions">


            <button

                id="cancelDelete"

                class="secondary-btn"

            >

                Cancel

            </button>





            <button

                id="confirmDelete"

                class="danger-btn"

            >

                Delete

            </button>



        </div>



    </div>


    `;



    document.body.appendChild(modal);



    bindEvents(modal);


}





/* ==========================================================
   EVENTS
========================================================== */


function bindEvents(modal){



    const cancel =

        modal.querySelector(
            "#cancelDelete"
        );



    const confirm =

        modal.querySelector(
            "#confirmDelete"
        );




    cancel.onclick = ()=>{


        closeModal(modal);


    };





    confirm.onclick = ()=>{


        if(deleteCallback){

            deleteCallback();

        }


        closeModal(modal);


    };



}






/* ==========================================================
   CLOSE
========================================================== */


function closeModal(modal){


    modal.remove();


    deleteCallback = null;


}