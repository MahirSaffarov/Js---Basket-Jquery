let inputs = $(".signup input")
let btnSign = $(".signup button");
let tbody = $(".info tbody")

let students = [];
if (JSON.parse(localStorage.getItem("students")) != null) {
    students = JSON.parse(localStorage.getItem("students"))
}
$(document).ready(function () {
    btnSign.click(function (e) {
        e.preventDefault()
        $(".info").css("visibility", "visible")
        let students = JSON.parse(localStorage.getItem("students")) || [];
        let obj = {}

        inputs.each(function (i) {

            if ($(inputs[i]).attr('class') == "name") {
                if ($(inputs[i]).val() == "") {
                    $(inputs[i]).next().css("visibility", "visible")
                }
                else {
                    obj.name = $(inputs[i]).val()
                    $(inputs[i]).next().css("visibility", "hidden")
                }
            }
            if ($(inputs[i]).attr('class') == "surname") {

                if ($(inputs[i]).val() == "") {
                    $(inputs[i]).next().css("visibility", "visible")
                }
                else {
                    obj.surname = $(inputs[i]).val()
                    $(inputs[i]).next().css("visibility", "hidden")
                }
            }
            if ($(inputs[i]).attr('class') == "age") {

                if ($(inputs[i]).val() == "") {
                    $(inputs[i]).next().css("visibility", "visible")
                }
                else {
                    obj.age = $(inputs[i]).val()
                    $(inputs[i]).next().css("visibility", "hidden")
                }
            }


        })
        if (obj.name != undefined && obj.surname != undefined && obj.age != undefined) {
            students.push({
                name: obj.name,
                surname: obj.surname,
                age: obj.age,
                id: Math.floor(Math.random() * 100)
            })
            localStorage.setItem("students", JSON.stringify(students));
            setTable()
        }
    });
    setTable()

    $(document).on("click", ".del", function () {
        let id = $(this).parent().parent().attr("data-id");
        let students = JSON.parse(localStorage.getItem("students"));
        let result = students.filter(m => m.id != id);
        localStorage.setItem("students", JSON.stringify(result));
        $(this).parent().parent().remove();

        setTable()
    });
    $(document).on("click", ".burgerIcon", function () {
        $(".table").toggle(1000)
        $(this).fadeOut("slow");
        $(".minusIcon").fadeIn("slow");
    })

    $(document).on("click", ".minusIcon", function () {
        $(".table").toggle(1000);
        $(this).fadeOut("slow");
        $(".burgerIcon").fadeIn("slow");
    })

    $(document).on("click", ".update", function () {
        let id = $(this).parent().parent().attr("data-id");

        $(".sign-up").css("visibility", "hidden");
        $(".modal").css("visibility", "visible");
        $(document).on("click", ".modal .up-date", function () {

            let students = JSON.parse(localStorage.getItem("students"))
            let student = students.find(m => m.id == id)

            if ($(".modal .name").val() != "") {
                student.name = $(".modal .name").val()
            }
            if ($(".modal .surname").val() != "") {
                student.surname = $(".modal .surname").val()

            }
            if ($(".modal .age").val() != "") {
                student.age = $(".modal .age").val()

            }
            localStorage.setItem("students", JSON.stringify(students));
            $(".sign-up").css("visibility", "visible");
            $(".modal").css("visibility", "hidden");

            setTable();
            $(document).off("click", ".modal .up-date");
        })
    })
    $(document).on("click", ".modal .cancel", function () {
        $(".sign-up").css("visibility", "visible");
        $(".modal").css("visibility", "hidden");


    })
});
function setTable() {
    let students = JSON.parse(localStorage.getItem("students"))
    tbody.html("");
    $(students).each(function (index, value) {
        let name = value.name;
        let surname = value.surname;
        let age = value.age;
        let id = value.id
        tbody.append(`<tr data-id="${id}">
        <td>${name}</td>
        <td>${surname}</td>
        <td>${age}</td>
        <td><i class="fa-regular fa-trash-can del"></i></td>
        <td><i class="fa-solid fa-wrench update"></i></td></tr>`);
    })
}
$(document).on("click", " .fa-caret-right", function () {
    if ($(this).closest(".modal").next()[0] != undefined) {
        $(this).closest(".modal").css("display", "none")
        $(this).closest(".modal").next().css("display", "flex")
    }
})
$(document).on("click", " .fa-caret-left", function () {
    if ($(this).closest(".modal").prev()[0] != undefined) {
        $(this).closest(".modal").css("display", "none")
        $(this).closest(".modal").prev().css("display", "flex")
    }
})
