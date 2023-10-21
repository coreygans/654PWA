document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "left" });
  // var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, { edge: 'left', draggable: false });

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

  //delete menu modal
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);

});
