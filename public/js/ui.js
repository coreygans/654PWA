document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "left" });

  const loggedOutLinks = document.querySelectorAll(".logged-out");
  const loggedInLinks = document.querySelectorAll(".logged-in");
  const setupUI = (user) => {
    if (user) {
      //toggle UI elements
      loggedInLinks.forEach((item) => (item.style.display = "block"));
      loggedOutLinks.forEach((item) => (item.style.display = "none"));
    } else {
      //toggle UI elements
      loggedInLinks.forEach((item) => (item.style.display = "none"));
      loggedOutLinks.forEach((item) => (item.style.display = "block"));
    }
  };

  // Add Transactions
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "right" });
  //Select menu
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {
    dropdownOptions: {
      alignment: "left",
      coverTrigger: false,
    },
  });

  //modal initialization
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});

//remove transaction from DOM
const removeTransaction = (id) => {
  const transaction = document.querySelector(`tr[data-id =${id}]`);
  // console.log(task);
  transaction.remove();
};
