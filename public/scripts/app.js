// Client facing scripts here

const createElement = function (questionNumber) {
  return `
        <div class= "question question-${questionNumber}">

        <label for="question">Question #${1 + questionNumber}</label>
        <input type="text" name="question${questionNumber}[]" />
        <br />
        <label for="question">Option A</label>
        <input type="text" name="choices${questionNumber}[]" />
        <br />
        <label for="question">Option B</label>
        <input type="text" name="choices${questionNumber}[]" />
        <br />
        <label for="question">Option C</label>
        <input type="text" name="choices${questionNumber}[]" />
        <br />
        <label for="question">Option D</label>
        <input type="text" name="choices${questionNumber}[]" />
        <br />
        <label for="options">Choose the correct answer:</label>
        <select name="answer_index${questionNumber}[]" id="correct-ans">
          <option value="0">Option A</option>
          <option value="1">Option B</option>
          <option value="2">Option C</option>
          <option value="3">Option D</option>
        </select>
<button class="deletequestion">Remove Question</button>
      </div>
      `;
};

$(document).ready(function () {
  const deletequestion = ".deletequestion";
  $(".addquestion").on("click", function () {
    const questionNumber = $(".question").length;

    $("#myform").append(createElement(questionNumber));

    $(".deletequestion").on("click", function (e) {
      e.preventDefault();

      e.target.parentElement.remove();
      $(".question").each((i, element) => {
        console.log(element, i);
        element.setAttribute("class", `question question-${i}`);
        element.firstElementChild.innerText = `Question #${1 + i}`;
        element.children[1].name = `question${i}[]`;
        element.children[4].name = `choices${i}[]`;
        element.children[7].name = `choices${i}[]`;
        element.children[10].name = `choices${i}[]`;
        element.children[13].name = `choices${i}[]`;
        element.children[16].name = `choices${i}[]`;
      });
      return false;
    });
  });

  $(".privorpub").hidden();
});
