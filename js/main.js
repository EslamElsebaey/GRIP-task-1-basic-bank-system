
// when document is ready 

$(document).ready(function(){
  //  wow fire function
  new WOW().init();
  // ******************************************************************************
  // selecting variables
  let tbody = document.getElementById("myBody");
  let senderEmail = document.getElementById("senderEmail");
  let recieverEmail = document.getElementById("recieverEmail");
  let sendMoneyFrom = document.getElementById("sendMoneyFrom");
  let mymodal = document.querySelector(".mymodal");
  let transferBtn = document.getElementById("transferBtn");
  let modalBox = document.getElementById("modalBox");

  // ******************************************************************************
  // create array of objects for the customers
  let customers = [
    {
      id: 1,
      userName: "Michael Golan",
      email: "michaelgolan50@gmail.com",
      amount: 60000,
    },
    {
      id: 2,
      userName: "Sam Halpert",
      email: "samhelpert@gmail.com",
      amount: 85000,
    },
    {
      id: 3,
      userName: "Kapor Sharma",
      email: "kaporsharma11@gmail.com",
      amount: 40000,
    },
    {
      id: 4,
      userName: "Johny white",
      email: "johny-white@gmail.com",
      amount: 50000,
    },
    {
      id: 5,
      userName: "Fernand tomi",
      email: "fernandtomas@gmail.com",
      amount: 19000,
    },
    {
      id: 6,
      userName: "Kathrine niva",
      email: "Kathrineniva9@gmail.com",
      amount: 10000,
    },
    {
      id: 7,
      userName: "Sara smith",
      email: "Sarasmith@gmail.com",
      amount: 15000,
    },
    {
      id: 8,
      userName: "Prem sharka",
      email: "permsharka@gmail.com",
      amount: 8000,
    },
    {
      id: 9,
      userName: "Dane Stiwart",
      email: "danestiwarte22@gmail.com",
      amount: 20000,
    },
    {
      id: 10,
      userName: "Kara Steven",
      email: "karasteven@gmail.com",
      amount: 18000,
    },
  ];

  // ******************************************************************************

  //  display customers in table

  function displayCustomers() {
    let trs = "";
    for (let i = 0; i < customers.length; i++) {
      trs += `
  <tr>
     <td>${customers[i].id}</td>
    <td>${customers[i].userName}</td>
    <td>${customers[i].email}</td>
    <td class="fw-bold"> ${customers[i].amount} </td>
    </tr>`;
    }
    tbody.innerHTML = trs;
  }

  displayCustomers();

  // ******************************************************************************

  //  fill select tag with options to choose from
  let senderOptions = "";
  for (let i = 0; i < customers.length; i++) {
    senderOptions += `<option value="${customers[i].email}">${customers[i].email}</option>`;
  }
  senderEmail.innerHTML += senderOptions;

  let recieverOptions = "";
  for (let i = 0; i < customers.length; i++) {
    recieverOptions += `<option value="${customers[i].email}">${customers[i].email}</option>`;
  }
  recieverEmail.innerHTML += recieverOptions;

  // ******************************************************************************

  //  show modal
  $("#transferBtn").click(function () {
    $(".mymodal").css("display", "flex");
    $("#modalBox").slideDown(600);
    doTransferBtn.disabled = true;
  });

  // ******************************************************************************

  //  put the name of the sender in the title of modal

  senderEmail.addEventListener("change", function () {
    sendMoneyFrom.innerHTML = `Send Money From ${senderEmail.value.slice(
      0,
      senderEmail.value.indexOf("@")
    )} `;
  });

  // ******************************************************************************

  // close modal

  $(".closeBtn").click(function () {
    $("#modalBox").slideUp(600, function () {
      $(".mymodal").css("display", "none");
    });
    amount.value = "";
    senderEmail.value = "";
    recieverEmail.value = "";
    sendMoneyFrom.innerHTML = "Send Money From";
  });

  // ******************************************************************************

  // git the amount of money entered in the input

  let amount = document.getElementById("amount");
  let finalAmount;

  amount.addEventListener("keyup", function () {
    finalAmount = parseInt(amount.value);
    if (validateInput() == true) {
      doTransferBtn.disabled = false;
    } else {
      doTransferBtn.disabled = true;
    }
  });

  // ******************************************************************************

  // transfer money function

  function sendMoney() {
    for (let i = 0; i < customers.length; i++) {
      if (senderEmail.value == customers[i].email) {
        customers[i].amount = customers[i].amount - finalAmount;
      }
      if (recieverEmail.value == customers[i].email) {
        customers[i].amount = customers[i].amount + finalAmount;
      }
    }
    amount.value = "";
    senderEmail.value = "";
    recieverEmail.value = "";
  }

  // ******************************************************************************

  // fire (transfer money) function with click on the transfer button

  let doTransferBtn = document.getElementById("doTransferBtn");
  $("#doTransferBtn").click(function () {
    if (validateInput() === true) {
      if (senderEmail.value !== recieverEmail.value) {
        if (amount.value >= 1000) {
          $(".mymodal").css("display", "none");
          $("#modalBox").css("display", "none");
          sendMoney();
          displayCustomers();
          sendMoneyFrom.innerHTML = "Send Money From";
        } else {
          alert("The Minimum sum is $1000");
          recieverEmail.value = "";
          senderEmail.value = "";
          amount.value = "";
          sendMoneyFrom.innerHTML = "Send Money From";
        }
      } else {
        alert("Sender and Reciever shouldn't be one person");
        recieverEmail.value = "";
        senderEmail.value = "";
        amount.value = "";
        sendMoneyFrom.innerHTML = "Send Money From";
      }
    }
  });

  // ******************************************************************************

  // validation of inputs before transfering the money

  function validateInput() {
    let senderEmail = document.getElementById("senderEmail").value;
    let recieverEmail = document.getElementById("recieverEmail").value;
    let amount = document.getElementById("amount").value;
    if (senderEmail == "" || recieverEmail == "" || amount == "") {
      return false;
    } else {
      return true;
    }
  }
})

