let imageInput = document.getElementById("image");
let fullNameInput = document.getElementById("fullName");
let phoneNumberInput = document.getElementById("phone");
let emailAddressInput = document.getElementById("emailAddress");
let addressInput = document.getElementById("address");
let groupInput = document.getElementById("group");
let notesInput = document.getElementById("notes");
let favoriteInput = document.getElementById("favorite");
let emergencyInput = document.getElementById("emergency");
let infoFav = document.querySelector(".mycard .collectedfavorite");
let infoEmr = document.querySelector(".mycard .collectedEmergency");
let countUsers = document.getElementById("total");
let favoriteUsers = document.getElementById("favoriteUsers");
let emergencyUsers = document.getElementById("emergencyUsers");
let contacts = document.getElementById("contacts");
let btnSave = document.getElementById("savaContact");
let btnUpdate = document.getElementById("updateContact");
let currentIndex = 0;
let searchInput = document.getElementById("search");
infoFav.innerHTML = `<span class="noFavorite">No favorites yet</span>`;
infoEmr.innerHTML = `<span class="noEmergency">No emergency contacts</span>`;
countUsers.innerHTML = "0";
favoriteUsers.innerHTML = "0";
emergencyUsers.innerHTML = "0";
let userList = [];

if (localStorage.getItem("userContainer")) {
  userList = JSON.parse(localStorage.getItem("userContainer"));
  displayUser();
}

function addUser() {
  if (
    validation(fullNameInput, "msgName") &&
    validation(phoneNumberInput, "msgPhone")
  ) {
    if (isPhoneExcit(phoneNumberInput.value)) {
      Swal.fire({
        title: "Duplicate Phone Number",
        text: "A contact with this phone number already exists",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
    let user = {
      img: imageInput.files[0]
        ? `./images/${imageInput.files[0].name}`
        : `./images/avatar.jpeg`,
      name: fullNameInput.value.trim(),
      phone: phoneNumberInput.value.trim(),
      email: emailAddressInput.value.trim(),
      address: addressInput.value.trim(),
      group: groupInput.value,
      notes: notesInput.value.trim(),
      fav: favoriteInput.checked,
      emergency: emergencyInput.checked,
    };
    userList.push(user);

    localStorage.setItem("userContainer", JSON.stringify(userList));
    let modalElement = document.getElementById("exampleModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    modalElement.addEventListener(
      "hidden.bs.modal",
      function () {
        Swal.fire({
          title: "Added!",
          text: "Contact has been added successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      { once: true },
    );

    displayUser();
    clearForm();
  }
}

function clearForm() {
  imageInput.value = null;
  fullNameInput.value = null;
  phoneNumberInput.value = null;
  emailAddressInput.value = null;
  addressInput.value = null;
  groupInput.value = "";
  notesInput.value = null;
  favoriteInput.checked = false;
  emergencyInput.checked = false;
}

function favAndEmrHtml(i) {
  return `<div
                  class="info d-flex align-items-center justify-content-between"
                >
                  <div class="d-flex align-items-center gap-2">
                    
                       <img class="image" src="${userList[i].img}" alt="${userList[i].name}">
                    <div class="infoText">
                      <h5>${userList[i].name}</h5>
                      <span>${userList[i].phone}</span>
                    </div>
                  </div>
                  <button>
                    <a href="tel:${userList[i].phone}"><i class="fa-solid fa-phone"></i></a>
                  </button>
                  </div>`;
}

function displayUser() {
  let collect = "";
  let collectedFav = "";
  let collectedEmr = "";
  let TotalOfUsers = 0;
  let totalOfFav = 0;
  let totalOfEmr = 0;

  for (let i = 0; i < userList.length; i++) {
    TotalOfUsers++;

    if (userList[i].fav) {
      totalOfFav++;
      collectedFav += favAndEmrHtml(i);
    }

    if (userList[i].emergency) {
      totalOfEmr++;
      collectedEmr += favAndEmrHtml(i);
    }
    let groupOption = "";
    switch (userList[i].group) {
      case "Family":
        groupOption = `<span class="badge family">${userList[i].group}</span>`;
        break;
      case "Friends":
        groupOption = `<span class="badge friends">${userList[i].group}</span>`;
        break;
      case "School":
        groupOption = `<span class="badge school">${userList[i].group}</span>`;
        break;
      case "Work":
        groupOption = `<span class="badge work">${userList[i].group}</span>`;
        break;
      case "Other":
        groupOption = `<span class="badge other">${userList[i].group}</span>`;
        break;
    }
    collect += ` <div class="col-12 col-lg-6">
                  <div class="inner">
                    <div class="CardInfo">
                      <div
                        class="cardHeader d-flex align-items-center gap-3 px-3"
                      >
                        <div class="iconName">
                           <img  src="${userList[i].img}" alt="${userList[i].name}">
                          
                          <span class=" ${userList[i].fav ? `icon iconStarHeader` : `d-none`}" 
                            ><i class="fa-solid fa-star"></i
                          ></span>
                          <span  class="${userList[i].emergency ? `icon iconHeartHeader` : `d-none`} "  
                            ><i class="fa-solid fa-heart-pulse"></i
                          ></span>
                        </div>
                        <div class="info">
                          <h3>${userList[i].name}</h3>
                          <div class="phone d-flex align-items-center gap-2">
                            <span class="icon iconPhone iconHeaderCard"
                              ><i class="fa-solid fa-phone"></i
                            ></span>
                            <span class="phoneNumber">${userList[i].phone}</span>
                          </div>
                        </div>
                      </div>
                      <div class="cardBody my-3 px-3">
                        <div class="emailUser d-flex align-items-center gap-2">
                          <span class="icon iconEnvelope iconHeaderCard"
                            ><i class="fa-solid fa-envelope"></i
                          ></span>
                          <span class="emailCard">${userList[i].email}</span>
                        </div>
                        <div
                          class="locationUser d-flex align-items-center gap-2"
                        >
                          <span class="icon iconLocation iconHeaderCard"
                            ><i class="fa-solid fa-location-dot"></i
                          ></span>
                          <span class="locationCard">${userList[i].address}</span>
                        </div>
                        <div
                          class="badgeUser mt-3 d-flex align-items-center gap-2 my-2"
                        >
                          
                          ${groupOption}
                       
                          <div 

                             class="${
                               userList[i].emergency
                                 ? `badge emergencyBadge d-flex align-items-center justify-content-center gap-1`
                                 : `d-none`
                             }"
                           
                          >
                            <i class="fa-solid fa-heart-pulse"></i>
                            <span> emergency</span>
                           
                            </div>
                        </div>

                      </div>
                      <div
                        class="cardFooter p-3 px-3 mt-4 pt-2 d-flex align-content-center justify-content-between"
                      >
                        <div class="d-flex align-items-center gap-2">
                          <button class="phoneFooter">
                            <a href="tel:${userList[i].phone}"> <i class="fa-solid fa-phone"></i></a>
                          </button>
                          <button class="envelopeFooter">
                            <a href="mailto:${userList[i].email}">
                              <i class="fa-solid fa-envelope"></i
                            ></a>
                          </button>
                        </div>
                        <div class="btnFooter d-flex align-items-center gap-2">
                          <button onclick="toggleFav(${i})" class=" icon iconStar">
                            ${userList[i].fav ? `<i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>` : `  <i class="fa-regular fa-star"></i>`}
                          
                          </button>
                          <button onclick="toggleEmr(${i})" class="icon iconHeart">
                          ${
                            userList[i].emergency
                              ? `<i class="fa-solid fa-heart-pulse" style="color: #ff1f57;"></i>`
                              : `  <i class="fa-regular fa-heart"></i>`
                          }
                          
                          </button>
                          <button onclick="setUpadateInfo(${i})" data-bs-toggle="modal"
              data-bs-target="#exampleModal" class="icon iconPen">
                            <i class="fa-solid fa-pen"></i>
                          </button>
                          <button onclick="deleteUser(${i})" class="icon iconTrash">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }

  document.getElementById("rowData").innerHTML = collect;

  if (collectedFav === "") {
    infoFav.innerHTML = `<span class="noFavorite">No favorites yet</span>`;
  } else {
    infoFav.innerHTML = collectedFav;
  }
  if (collectedEmr === "") {
    infoEmr.innerHTML = `<span class="noEmergency">No emergency contacts</span>`;
  } else {
    infoEmr.innerHTML = collectedEmr;
  }

  favoriteUsers.innerHTML = totalOfFav;
  emergencyUsers.innerHTML = totalOfEmr;
  countUsers.innerHTML = TotalOfUsers;
  contacts.innerHTML = TotalOfUsers;
}

function deleteUser(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C62222",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      userList.splice(index, 1);
      localStorage.setItem("userContainer", JSON.stringify(userList));
      displayUser();
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

function setUpadateInfo(index) {
  currentIndex = index;
  fullNameInput.value = userList[index].name;
  phoneNumberInput.value = userList[index].phone;
  emailAddressInput.value = userList[index].email;
  addressInput.value = userList[index].address;
  groupInput.value = userList[index].group;
  notesInput.value = userList[index].notes;
  favoriteInput.checked = userList[index].fav;
  emergencyInput.checked = userList[index].emergency;
  btnSave.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updataUser() {
  if (
    validation(fullNameInput, "msgName") &&
    validation(phoneNumberInput, "msgPhone")
  ) {
    let user = {
      img: imageInput.files[0]
        ? `./images/${imageInput.files[0].name}`
        : `./images/avatar.jpeg`,
      name: fullNameInput.value.trim(),
      phone: phoneNumberInput.value.trim(),
      email: emailAddressInput.value.trim(),
      address: addressInput.value.trim(),
      group: groupInput.value,
      notes: notesInput.value.trim(),
      fav: favoriteInput.checked,
      emergency: emergencyInput.checked,
    };
    userList.splice(currentIndex, 1, user);
    localStorage.setItem("userContainer", JSON.stringify(userList));
    let modalElement = document.getElementById("exampleModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    modalElement.addEventListener(
      "hidden.bs.modal",
      function () {
        Swal.fire({
          title: "Updated!",
          text: "Contact has been updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      { once: true },
    );
    displayUser();
    clearForm();
    btnSave.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
  }
}

function resetForm() {
  clearForm();
  btnSave.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}
function toggleFav(index) {
  userList[index].fav = !userList[index].fav;
  localStorage.setItem("userContainer", JSON.stringify(userList));
  displayUser();
}

function toggleEmr(index) {
  userList[index].emergency = !userList[index].emergency;
  localStorage.setItem("userContainer", JSON.stringify(userList));
  displayUser();
}

function searchUser() {
  let text = searchInput.value.trim();
  let collect = "";
  for (let i = 0; i < userList.length; i++) {
    let groupOption = userList[i].group;

    if (
      userList[i].name.toLowerCase().includes(text.toLowerCase()) ||
      userList[i].email.toLowerCase().includes(text.toLowerCase()) ||
      userList[i].phone.includes(text)
    ) {
      collect += ` <div class="col-12 col-lg-6">
                  <div class="inner">
                    <div class="CardInfo">
                      <div
                        class="cardHeader d-flex align-items-center gap-3 px-3"
                      >
                        <div class="iconName">
                           <img  src="${userList[i].img}" alt="${userList[i].name}">
                          
                          <span class=" ${userList[i].fav ? `icon iconStarHeader` : `d-none`}" 
                            ><i class="fa-solid fa-star"></i
                          ></span>
                          <span  class="${userList[i].emergency ? `icon iconHeartHeader` : `d-none`} "  
                            ><i class="fa-solid fa-heart-pulse"></i
                          ></span>
                        </div>
                        <div class="info">
                          <h3>${userList[i].name}</h3>
                          <div class="phone d-flex align-items-center gap-2">
                            <span class="icon iconPhone iconHeaderCard"
                              ><i class="fa-solid fa-phone"></i
                            ></span>
                            <span class="phoneNumber">${userList[i].phone}</span>
                          </div>
                        </div>
                      </div>
                      <div class="cardBody my-3 px-3">
                        <div class="emailUser d-flex align-items-center gap-2">
                          <span class="icon iconEnvelope iconHeaderCard"
                            ><i class="fa-solid fa-envelope"></i
                          ></span>
                          <span class="emailCard">${userList[i].email}</span>
                        </div>
                        <div
                          class="locationUser d-flex align-items-center gap-2"
                        >
                          <span class="icon iconLocation iconHeaderCard"
                            ><i class="fa-solid fa-location-dot"></i
                          ></span>
                          <span class="locationCard">${userList[i].address}</span>
                        </div>
                        <div
                          class="badgeUser mt-3 d-flex align-items-center gap-2 my-2"
                        >
                          <span class="badge ${groupOption}">${groupOption}</span>
                         
                       
                          <div 

                             class="${
                               userList[i].emergency
                                 ? `badge emergencyBadge d-flex align-items-center justify-content-center gap-1`
                                 : `d-none`
                             }"
                           
                          >
                            <i class="fa-solid fa-heart-pulse"></i>
                            <span> emergency</span>
                           
                            </div>
                        </div>

                      </div>
                      <div
                        class="cardFooter p-3 px-3 mt-4 pt-2 d-flex align-content-center justify-content-between"
                      >
                        <div class="d-flex align-items-center gap-2">
                          <button class="phoneFooter">
                            <a href="tel:${userList[i].phone}"> <i class="fa-solid fa-phone"></i></a>
                          </button>
                          <button class="envelopeFooter">
                            <a href="mailto:${userList[i].email}">
                              <i class="fa-solid fa-envelope"></i
                            ></a>
                          </button>
                        </div>
                        <div class="btnFooter d-flex align-items-center gap-2">
                          <button onclick="toggleFav(${i})" class=" icon iconStar">
                            ${userList[i].fav ? `<i class="fa-solid fa-star" style="color: rgb(255, 212, 59);"></i>` : `  <i class="fa-regular fa-star"></i>`}
                          
                          </button>
                          <button onclick="toggleEmr(${i})" class="icon iconHeart">
                          ${
                            userList[i].emergency
                              ? `<i class="fa-solid fa-heart-pulse" style="color: #ff1f57;"></i>`
                              : `  <i class="fa-regular fa-heart"></i>`
                          }
                          
                          </button>
                          <button onclick="setUpadateInfo(${i})" data-bs-toggle="modal"
              data-bs-target="#exampleModal" class="icon iconPen">
                            <i class="fa-solid fa-pen"></i>
                          </button>
                          <button onclick="deleteUser(${i})" class="icon iconTrash">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
    }
  }
  document.getElementById("rowData").innerHTML = collect;
}

function validation(element, msgId) {
  let text = element.value.trim();
  let msg = document.getElementById(msgId);
  let regex = {
    fullName: /^[A-Za-z]{2,}(?:\s+[A-Za-z]{2,})*$/,
    phone:
      /^(?:(?:010|011|012|015)[0-9]{8}|(?:\+20|0020)(?:10|11|12|15)[0-9]{8})$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    msg.classList.remove("d-none");
    return false;
  }
}

function isPhoneExcit(phoneNum) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].phone === phoneNum) {
      return true;
    }
  }
  return false;
}
