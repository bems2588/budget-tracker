const indexdb = window.indexedDB

let db;
let request = indexdb.open('budget-tracker', 1);
request.onupgradeneeded = ({ target }) => {
  let db = traget.result;
  db.createObjectStore("entries", { autoIncrement: true })
}

request.onsuccess = ({ target }) => {
  db = target.result;
  if (navigator.onLine) {
    checkDatabase()
  }
}

request.onsuccess = ({ target }) => {
  console.log("Error!");
}

function saveRecord(record) {
  const transaction = db.transaction(["entries"], "readwrite")
  const store = transaction.objectStore("pending")
  store.add(record)
}

function checkDatabase() {
  const transaction = db.transaction(["entries"], "readwrite")
  const store = transaction.objectStore("pending")
  const getAll = store.getAll()
  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk".t, {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json,text/plain,*/*",
          "Content-Type": "application/json"
        }
      }).then(function (records) {
        return records.json()
      }).then(dta => {
        console.log("Data moved from indexdb to Mongo", data);
        const transaction = db.transaction(["entries"], "readwrite")
        const store = transaction.objectStore("pending");

        store.clear()

      })
    }
  }
}


window.addEventListener("online", checkDatabase)