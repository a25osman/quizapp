// Client facing scripts here
$(document).ready(function () {
  let counter = 0;
  $(".addquestion").on("click", function () {
    const questionNumber = $(".question").length;

    counter++;

    $("#myform").append(`
        <div class="mainquestion${counter}">

        <label for="question">Question #${1 + questionNumber}</label>
        <input type="text" name="question${questionNumber}[]" />
        <br />
        <label for="question">Option A</label>
        <input type="text" name="answer${questionNumber}[]" />
        <br />
        <label for="question">Option B</label>
        <input type="text" name="answer${questionNumber}[]" />
        <br />
        <label for="question">Option C</label>
        <input type="text" name="answer${questionNumber}[]" />
        <br />
        <label for="question">Option D</label>
        <input type="text" name="answer${questionNumber}[]" />
        <br />
        <label for="options">Choose the correct answer:</label>
        <select name="options${questionNumber}[]" id="correct-ans">
          <option value="0">Option A</option>
          <option value="1">Option B</option>
          <option value="2">Option C</option>
          <option value="3">Option D</option>
        </select>
      </div>`);

    $(".deletequestion").on("click", function () {
      $(`.mainquestion${counter}`).remove();
    });
  });
});
