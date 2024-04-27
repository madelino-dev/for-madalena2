const problems = [
    { statement: "The boy drank three fifths of the milk.", fraction: 3/5 },
    { statement: "The girl ate two thirds of the pizza.", fraction: 2/3 },
    { statement: "The dog chewed one fourth of the toys.", fraction: 1/4 },
    { statement: "The bird ate seven eighths of the seeds.", fraction: 7/8 },
    { statement: "The cat played with one half of the yarn balls.", fraction: 1/2 },
    { statement: "The squirrel collected four fifths of the acorns.", fraction: 4/5 },
    { statement: "The rabbit ate five sixths of the carrots.", fraction: 5/6 },
    { statement: "The fish swam through three fourths of the hoops.", fraction: 3/4 },
    { statement: "The bear ate nine tenths of the honey.", fraction: 9/10 },
    { statement: "The monkey climbed two fifths of the trees.", fraction: 2/5 },
    { statement: "The turtle walked through one third of the tunnels.", fraction: 1/3 },
    { statement: "The kangaroo jumped over three fourths of the hurdles.", fraction: 3/4 },
    { statement: "The elephant drank four fifths of the water.", fraction: 4/5 },
    { statement: "The penguin slid down seven eighths of the slides.", fraction: 7/8 },
    { statement: "The zebra ran across six sevenths of the plains.", fraction: 6/7 },
    { statement: "The lion roared for five sixths of the night.", fraction: 5/6 },
    { statement: "The giraffe ate from two thirds of the trees.", fraction: 2/3 },
    { statement: "The hippo splashed in three fourths of the mud pools.", fraction: 3/4 },
    { statement: "The rhino charged at one half of the targets.", fraction: 1/2 },
    { statement: "The ant carried four fifths of the crumbs.", fraction: 4/5 },
    { statement: "The boy drank one fifth of the milk.", fraction: 1/5 },
    { statement: "The girl ate two sevenths of the pizza.", fraction: 2/7 },
    { statement: "The dog chewed one third of the toys.", fraction: 1/3 },
    { statement: "The bird ate three eighths of the seeds.", fraction: 3/8 },
    { statement: "The cat played with one half of the yarn balls.", fraction: 1/2 },
    { statement: "The squirrel collected two ninths of the acorns.", fraction: 2/9 },
    { statement: "The rabbit ate four sevenths of the carrots.", fraction: 4/7 },
    { statement: "The fish swam through one sixth of the hoops.", fraction: 1/6 },
    { statement: "The bear ate five eighths of the honey.", fraction: 5/8 },
    { statement: "The monkey climbed three tenths of the trees.", fraction: 3/10 },
    { statement: "The turtle walked through two fifths of the tunnels.", fraction: 2/5 },
    { statement: "The kangaroo jumped over one fourth of the hurdles.", fraction: 1/4 },
    { statement: "The elephant drank three sevenths of the water.", fraction: 3/7 },
    { statement: "The penguin slid down one eighth of the slides.", fraction: 1/8 },
    { statement: "The zebra ran across three ninths of the plains.", fraction: 1/3 }, // 3/9 simplifies to 1/3
    { statement: "The lion roared for two sixths of the night.", fraction: 1/3 }, // 2/6 simplifies to 1/3
    { statement: "The giraffe ate from four ninths of the trees.", fraction: 4/9 },
    { statement: "The hippo splashed in five tenths of the mud pools.", fraction: 1/2 }, // 5/10 simplifies to 1/2
    { statement: "The rhino charged at three eighths of the targets.", fraction: 3/8 },
    { statement: "The ant carried one ninth of the crumbs.", fraction: 1/9 }
];

// Randomly select a problem

const randomProblem = problems[Math.floor(Math.random() * problems.length)];
document.getElementById('problemStatement').textContent = randomProblem.statement;


function drawCircle() {
    const circleContainer = document.getElementById('circleContainer');
    circleContainer.innerHTML = ''; // Clear previous slices

    const totalSlices = parseInt(document.getElementById('slices').value);

    if (isNaN(totalSlices) || totalSlices <= 0) {
        alert('Please enter a valid integer greater than 0.');
        return;
    }

    const angle = 360 / totalSlices;
    const radius = 100; // Half of the SVG container's size

    for (let i = 0; i < totalSlices; i++) {
        const startAngle = angle * i;
        const endAngle = angle * (i + 1);

        const x1 = 105 + radius * Math.sin(startAngle * (Math.PI / 180));
        const y1 = 105 - radius * Math.cos(startAngle * (Math.PI / 180));

        const x2 = 105 + radius * Math.sin(endAngle * (Math.PI / 180));
        const y2 = 105 - radius * Math.cos(endAngle * (Math.PI / 180));

        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

        const pathData = `
            M 105 105
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
        `;

        const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
        slice.setAttribute('d', pathData);
        slice.setAttribute('fill', 'white');
        slice.setAttribute('stroke', 'black');
        slice.addEventListener('click', toggleSliceColor);
        circleContainer.appendChild(slice);
    }

    circleContainer.style.display = 'block'; // Display the SVG container

    // Show the "Check Answer" button after drawing the circle
    document.getElementById('checkButton').style.display = 'block';

    // Show the "Try another" button after drawing the circle
    document.getElementById('tryAnotherButton').style.display = 'block';	
}

function toggleSliceColor(event) {
    const slice = event.target;
    if (slice.getAttribute('fill') === 'white') {
        slice.setAttribute('fill', 'lightblue');
    } else {
        slice.setAttribute('fill', 'white');
    }
}

function checkAnswer() {
    const slices = document.querySelectorAll('#circleContainer path');
    const coloredSlices = document.querySelectorAll('#circleContainer path[fill="lightblue"]');

    const totalSlices = slices.length;
    const totalColored = coloredSlices.length;

    // Check if the colored slices match the fraction of the selected problem
    if (totalColored / totalSlices === randomProblem.fraction) {
        alert('Correct!');
    } else {
        alert('Try again.');
    }
}

function loadNewProblem() {
    location.reload();  // This will reload the current page
}
