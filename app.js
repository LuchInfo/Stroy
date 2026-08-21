// ================================
// ОСНОВНЫЕ ЭЛЕМЕНТЫ
// ================================


const views =
  document.querySelectorAll(".view");


const navItems =
  document.querySelectorAll(".nav-item");


const sidebar =
  document.querySelector(".sidebar");


const modal =
  document.getElementById("modal");


const toastEl =
  document.getElementById("toast");




// ================================
// ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛОВ
// ================================


function showView(id) {


  views.forEach((view) => {


    view.classList.toggle(
      "active",
      view.id === id
    );


  });




  navItems.forEach((button) => {


    button.classList.toggle(
      "active",
      button.dataset.view === id
    );


  });




  sidebar.classList.remove("open");




  window.scrollTo({


    top: 0,


    behavior: "smooth"


  });


}




// Кнопки меню


navItems.forEach((button) => {


  button.addEventListener(
    "click",
    () => {


      showView(
        button.dataset.view
      );


    }
  );


});




// Кнопки переходов внутри сайта


document
  .querySelectorAll("[data-view-link]")
  .forEach((button) => {


    button.addEventListener(
      "click",
      () => {


        showView(
          button.dataset.viewLink
        );


      }
    );


  });




// ================================
// МОБИЛЬНОЕ МЕНЮ
// ================================


const menuToggle =
  document.getElementById("menuToggle");




if (menuToggle) {


  menuToggle.addEventListener(
    "click",
    () => {


      sidebar.classList.toggle("open");


    }
  );


}




// ================================
// МОДАЛЬНОЕ ОКНО
// ================================


function openModal() {


  modal.classList.remove("hidden");


}




function closeModal() {


  modal.classList.add("hidden");


}




// Все кнопки новой заявки


document
  .querySelectorAll(
    '[data-action="new-request"]'
  )
  .forEach((button) => {


    button.addEventListener(
      "click",
      openModal
    );


  });




// Закрытие окна


document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach((element) => {


    element.addEventListener(
      "click",
      closeModal
    );


  });




// ================================
// УВЕДОМЛЕНИЯ
// ================================


function toast(message) {


  toastEl.textContent =
    message;




  toastEl.classList.add(
    "show"
  );




  clearTimeout(
    window.__toastTimer
  );




  window.__toastTimer =
    setTimeout(
      () => {


        toastEl.classList.remove(
          "show"
        );


      },
      2300
    );


}




// ================================
// СОЗДАНИЕ ЗАЯВКИ
// ================================


const saveRequest =
  document.getElementById(
    "saveRequest"
  );




if (saveRequest) {


  saveRequest.addEventListener(
    "click",
    () => {


      closeModal();




      showView(
        "requests"
      );




      toast(
        "Заявка ЗП-2026-0151 создана"
      );


    }
  );


}




// ================================
// ДОБАВЛЕНИЕ ОРГАНИЗАЦИИ
// ================================


document
  .querySelectorAll(
    '[data-action="fake-add"]'
  )
  .forEach((button) => {


    button.addEventListener(
      "click",
      () => {


        toast(
          "В полной версии здесь откроется карточка новой организации"
        );


      }
    );


  });




// ================================
// ПОИСК ЗАЯВОК
// ================================


const search =
  document.getElementById(
    "requestSearch"
  );


const statusFilter =
  document.getElementById(
    "statusFilter"
  );




function filterRequests() {


  const searchText =
    (
      search?.value || ""
    )
      .toLowerCase();




  const status =
    (
      statusFilter?.value || ""
    )
      .toLowerCase();




  document
    .querySelectorAll(
      ".request-card"
    )
    .forEach((card) => {


      const text =
        card
          .dataset
          .search
          .toLowerCase();




      const matchesSearch =
        !searchText ||
        text.includes(
          searchText
        );




      const matchesStatus =
        !status ||
        text.includes(
          status
        );




      card.style.display =
        matchesSearch &&
        matchesStatus
          ? ""
          : "none";


    });


}




if (search) {


  search.addEventListener(
    "input",
    filterRequests
  );


}




if (statusFilter) {


  statusFilter.addEventListener(
    "change",
    filterRequests
  );


}




// ================================
// ПРОВЕРКА ДОКУМЕНТОВ
// ================================


const approveDocs =
  document.getElementById(
    "approveDocs"
  );




if (approveDocs) {


  approveDocs.addEventListener(
    "click",
    () => {


      const heightDoc =
        document.getElementById(
          "heightDoc"
        );




      // Если обязательный документ
      // не подтверждён


      if (!heightDoc.checked) {


        toast(
          "Нельзя подтвердить: осталось обязательное замечание"
        );


        return;


      }




      const problem =
        document.getElementById(
          "docProblem"
        );




      problem.innerHTML = `


        <strong>
          Замечаний нет
        </strong>


        <span>
          Все обязательные документы подтверждены.
        </span>


      `;




      problem.style.background =
        "var(--green-bg)";




      problem.style.color =
        "var(--green)";




      toast(
        "Проверка документов завершена"
      );


    }
  );


}




// ================================
// ЗАВЕРШЕНИЕ ИНСТРУКТАЖА
// ================================


const completeBriefing =
  document.getElementById(
    "completeBriefing"
  );




if (completeBriefing) {


  completeBriefing.addEventListener(
    "click",
    () => {


      const workers =
        [
          ...document.querySelectorAll(
            ".brief-check"
          )
        ];




      const allCompleted =
        workers.every(
          (checkbox) =>
            checkbox.checked
        );




      if (!allCompleted) {


        toast(
          "Не все работники отмечены как прошедшие инструктаж"
        );


        return;


      }




      // После инструктажа
      // переходим к допуску


      showView(
        "permits"
      );




      toast(
        "Инструктаж завершён. Допуск сформирован"
      );


    }
  );


}




// ================================
// ПЕЧАТЬ ДОПУСКА
// ================================


const printPermit =
  document.getElementById(
    "printPermit"
  );




if (printPermit) {


  printPermit.addEventListener(
    "click",
    () => {


      window.print();


    }
  );


}




// ================================
// ПРИОСТАНОВКА ДОПУСКА
// ================================


const pausePermit =
  document.getElementById(
    "pausePermit"
  );




if (pausePermit) {


  pausePermit.addEventListener(
    "click",
    (event) => {


      const status =
        document.querySelector(
          "#permits .status"
        );




      const paused =
        status
          .textContent
          .includes(
            "Приостановлен"
          );




      // Приостановить


      if (!paused) {


        status.textContent =
          "Приостановлен";




        status.className =
          "status danger";




        event.target.textContent =
          "Возобновить";




        toast(
          "Допуск приостановлен"
        );


      }


      // Возобновить


      else {


        status.textContent =
          "Действует";




        status.className =
          "status success";




        event.target.textContent =
          "Приостановить";




        toast(
          "Допуск возобновлён"
        );


      }


    }
  );


}
