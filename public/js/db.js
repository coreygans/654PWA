// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPU9BzYR8FbMYQH-xWlkhW2uaFHhM5uRc",
  authDomain: "finance-tracker-12069.firebaseapp.com",
  projectId: "finance-tracker-12069",
  storageBucket: "finance-tracker-12069.appspot.com",
  messagingSenderId: "717459811296",
  appId: "1:717459811296:web:b405fe2e9d4f030fd05985",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// async function getTransactions(db) {
//   const transactionsCol = collection(db, "transactions");
//   const transactionsSnapshot = await getDocs(transactionsCol);
//   console.log(transactionsSnapshot);
//   const transactionsList = transactionsSnapshot.docs.map((doc) => doc.data());
//   return transactionsList;
// }

const transactionsList = document.querySelector("#transactions-table");

function renderTransactions(dc) {
  let tr = document.createElement("tr");
  let name = document.createElement("td");
  let category = document.createElement("td");
  let date = document.createElement("td");
  let description = document.createElement("td");
  let amount = document.createElement("td");
  let edit = document.createElement("td");
  let del = document.createElement("td");

  tr.setAttribute("data-id", dc.id);
  name.textContent = dc.data().name;
  category.textContent = dc.data().category;
  date.textContent = dc.data().date;
  description.textContent = dc.data().description;
  amount.textContent = "$" + dc.data().amount;
  edit.innerHTML = `<i data-id="${dc.id}" class="material-icons edit-transaction modal-trigger" data-target="edit-modal">edit</i>`;
  del.innerHTML =
    '<i class="material-icons transaction-delete">delete_outline</i>';

  tr.setAttribute("data-id", dc.id);
  tr.appendChild(name);
  tr.appendChild(category);
  tr.appendChild(date);
  tr.appendChild(description);
  tr.appendChild(amount);
  tr.appendChild(edit);
  tr.appendChild(del);

  transactionsList.appendChild(tr);

  edit.addEventListener("click", async (e) => {
    e.stopPropagation();
    const editId = e.target.parentElement.parentElement.getAttribute("data-id");
    const transactionRef = doc(db, "transactions", editId);
    const docSnap = await getDoc(transactionRef);
    const editTransactionForm = document.querySelector(".edit-transaction");
    // docSnap.then((doc) => {
    if (docSnap.exists()) {
      // Populate the form fields
      document.querySelector("#editName").value = docSnap.data().name;
      document.querySelector("#editDescription").value =
        docSnap.data().description;
      document.querySelector("#editAmount").value = docSnap.data().amount;

      //open modal
      const editModal = document.getElementById("edit-modal");
      const instance = M.Modal.init(editModal, { dismissible: true });
      instance.open();

      const editSubmit = document.querySelector(".editSubmit");

      editSubmit.addEventListener("click", async (e) => {
        e.stopPropagation();
        const updateTransaction = doc(db, "transactions", editId);
        await updateDoc(updateTransaction, {
          name: document.querySelector("#editName").value,
          description: document.querySelector("#editDescription").value,
          amount: document.querySelector("#editAmount").value,
        });
        instance.close();
      });

    }
    //});
  });

  del.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.parentElement.getAttribute("data-id");
    deleteDoc(doc(db, "transactions", id));
  });
}

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.log("Persistence failed");
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log("Persistence is not valid");
    }
});


const transactions = getDocs(collection(db, "transactions")).then(
  (snapshot) => {
    snapshot.forEach((dc) => {
      renderTransactions(dc);
    });
  }
);




const addTransaction = document.querySelector("#addTransaction");

addTransaction.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = addDoc(collection(db, "transactions"), {
    name: addTransaction.name.value,
    category: addTransaction.category.value,
    date: addTransaction.date.value,
    description: addTransaction.description.value,
    amount: addTransaction.amount.value,
  });
  addTransaction.reset();
});

// const updateTransaction = doc(db, "transactions", "qaAfOHk1moIbtY8DIYnd");
// updateDoc(updateTransaction, {
//   name: "DeLorean payment"
// })

const unsub = onSnapshot(collection(db, "transactions"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
      renderTransactions(change.doc.data(), change.doc.id);
    }
    // if (change.type === "removed") {
    //   //do something
    //   removeTransaction(change.doc.id);
    // }
  });
});
