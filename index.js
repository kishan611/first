function Check_the_dob(dob) {
  var age = new Date().getFullYear() - new Date(dob.value).getFullYear();
  if (age < 18 || age > 55) {
    dob.setCustomValidity("The age should be between 18 and 55");
    dob.reportValidity();
  } else {
    dob.setCustomValidity("");
  }
}

function check_the_email(email) {
  if (email.value.includes("@") && email.value.includes(".")) {
    email.setCustomValidity("");
  } else {
    email.setCustomValidity("Invalid Email!");
    email.reportValidity();
  }
}

function check_the_name(name_of_the_user) {
  if (name_of_the_user.value.length < 3) {
    name_of_the_user.setCustomValidity(
      "Name should be atleast threee characters!"
    );
    name_of_the_user.reportValidity();
  } else {
    name_of_the_user.setCustomValidity("");
  }
}

function check_the_tc(tc) {
  if (!tc.checked) {
    tc.setCustomValidity("Accept terms and conditions!");
    tc.reportValidity();
  } else {
    tc.setCustomValidity("");
  }
}

dob = document.getElementById("dob");
var password = document.getElementById("password");
var tc = document.getElementById("tc");
var email = document.getElementById("email");
var name_of_the_user = document.getElementById("name");

email.addEventListener("input", () => check_the_email(email));
dob.addEventListener("input", () => Check_the_dob(dob));
name_of_the_user.addEventListener("input", () =>
  check_the_name(name_of_the_user)
);
tc.addEventListener("input", () => check_the_tc(tc));

var get_form = document.getElementById("form");

var user_entries = [];

enter_to_the_table = () => {
  var object_list = localStorage.getItem("user_entries");
  if (!object_list) {
    user_entries = [];
  } else {
    user_entries = JSON.parse(object_list);
  }
  return user_entries;
};
user_entries = enter_to_the_table();

create_list_of_object = () => {
  var check = true;
  if (!tc.checked) {
    check = false;
  }
  var object_list = {
    dob: dob.value,
    password: password.value,
    email: email.value,
    checked: check,
    name: name_of_the_user.value,
  };
  return object_list;
};

show_the_table = () => {
  var table = document.getElementById("user-table");
  var objet_of_entries = user_entries;
  var word = `\n<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>`;
  
  objet_of_entries.forEach(entry =>{
    word += `\n<tr>
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.password}</td>
                    <td>${entry.dob}</td>
                    <td>${entry.checked}</td>
                </tr>`;
  })
  table.innerHTML = word;
};

get_form.addEventListener("submit", (e) => {
  e.preventDefault();
  var agree_the_condition = tc.checked;
  if (agree_the_condition) {
    var object_list = create_list_of_object();
    user_entries.push(object_list);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));
  }
  show_the_table();
});

window.onload = (event) => {
  show_the_table();
};
